/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class LolGCAService {
	statusCode = 0;
	headers;
	gameData = new BehaviorSubject({});

	constructor(private http: HttpClient, private router: Router, private settingService: SettingsService) {
		this.headers =  new HttpHeaders();
		this.headers.set('Accept','application/json');
		this.headers.set('rejectUnauthorized','false');
	 }

	get isGameRunning(): boolean {
		return this.statusCode === 200;
	}

	async init() {
		this.getGameData();
	}

	async getGameData(){
		while(1){
			if(this.statusCode !== 200){
				await this.waitFor(5000);
			} else {
				await this.waitFor(1000);
			}
			// eslint-disable-next-line max-len
			this.http.get(`https://localhost:${this.settingService.settings.main.gamePort}/liveclientdata/allgamedata`, { observe: 'response', headers: this.headers }).subscribe({
				next: (response: any) => {
					this.statusCode = response.status;
					this.gameData.next(response.body);
					if(this.router.url !== '/ingame'){
						this.router.navigate(['/ingame']);
					}
				}, error: (err) => {
					this.statusCode = err.status;
					if(this.router.url === '/ingame'){
						this.router.navigate(['/settings']);
					}
				}
			});
		}
	}



	async waitFor(delay) {
		return new Promise((resolve) => setTimeout(resolve, delay));
	}
}
