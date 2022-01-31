import { Component, OnInit } from '@angular/core';
import { LolGCAService } from '../services/lolGCA/lolGCA.service';
import { Settings } from './settings.class';
import { SettingsService } from './settings.service';
import { Timer } from './subSettings/Timer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();
  constructor(
    private readonly settingService: SettingsService,
    private readonly lolGCAService: LolGCAService
  ) {}

  async ngOnInit() {
    await this.settingService.init();
    this.settings = this.settingService.settings;
    this.lolGCAService.init();
  }

  toggle(e){
    e.stopPropagation();
  }

  save(){
    this.settingService.save(this.settings);
  }

  addNewTimer(type: string){
    this.settingService.settings[type].timers.push(new Timer([],'all',250,15));
  }

  removeTimer(type: string){
    this.settingService.settings[type].timers.pop();
  }

}
