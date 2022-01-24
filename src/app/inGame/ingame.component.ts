import { Component, OnInit } from '@angular/core';
import { time } from 'console';
import { ElectronService } from '../core/services';
import { Color } from '../services/ledService/color';
import { LedControllService } from '../services/ledService/ledControll.service';
import { LolGCAService } from '../services/lolGCA/lolGCA.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-ingame',
  templateUrl: './ingame.component.html',
  styleUrls: ['./ingame.component.scss'],
})
export class InGameComponent {
  gameData;
  constructor(
    private readonly ledControllService: LedControllService,
    private readonly lolGCAService: LolGCAService,
    private readonly settingsService: SettingsService
  ) {
    this.lolGCAService.gameData.subscribe((v) => this.subscribeMethod(v));
  }

  getDragonsData(): []{
    return this.gameData.events.Events.filter(v => v.EventName === 'DragonKill');
  }

  getBaronData(){
    return this.gameData.events.Events.filter(v => v.EventName === 'BaronKill');
  }

  getHeraldData(){
    return this.gameData.events.Events.filter(v => v.EventName === 'HeraldKill');
  }

  nextDragonTimer(){
    const dragons: any[] = this.getDragonsData();
    if( dragons.length === 0){
      return 300;
    }
    if( dragons.length >= 4){
      return dragons[dragons.length-1].EventTime +360;
    }
    return dragons[dragons.length-1].EventTime +300;
  }

  secondsToNextDragon(){
    return this.nextDragonTimer() - this.gameData.gameData.gameTime;
  }

  nextBaronTimer(){
    const barons: any[] = this.getBaronData();
    if( barons.length === 0){
      return 1200;
    }
    return barons[barons.length-1].EventTime + 360;
  }

  secondsToNextBaron(){
    return this.nextBaronTimer() - this.gameData.gameData.gameTime;
  }

  nextHeraldTimer(){
    const heralds: any[] = this.getHeraldData();
    if( heralds.length === 0){
      return 480;
    }
    if( heralds.length === 1){
      if( heralds[0].EventTime < 825 ){
        return heralds[heralds.length-1].EventTime + 360;
      } else {
        return -1;
      }
    }
    return -1;
  }

	async waitFor(delay) {
		return new Promise((resolve) => setTimeout(resolve, delay));
	}

  secondsToNextHerald(){
    return this.nextHeraldTimer() - this.gameData.gameData.gameTime;
  }

  subscribeMethod(gameData){
    this.gameData=gameData;
    this.blinkForDragons();
  }

  async blinkForDragons() {
    for(const timer of this.settingsService.settings.dragons.timers){
      if(this.secondsToNextDragon() < timer.time && this.secondsToNextDragon() > timer.time-1){
        this.ledControllService.blink({mapName:timer.mapName, colors:timer.colors, waitBeetweenTime: timer.waitBeetweenTime});
        break;
      }
    }
  }

}
