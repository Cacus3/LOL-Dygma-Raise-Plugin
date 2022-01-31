import { Injectable } from '@angular/core';
import { ElectronService } from '../core/services';
import { LolGCAService } from '../services/lolGCA/lolGCA.service';
import { Settings } from './settings.class';
import { BaronSettings } from './subSettings/baronSettings';
import { DragonsSettings } from './subSettings/dragonsSettings';
import { HeraldSettings } from './subSettings/heraldSettings';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = new Settings();

  constructor(private readonly electronService: ElectronService) {
  }

  async init(){
    this.settings = await this.electronService.ipcRenderer.invoke('read', 'settings');
    if(this.settings.dragons === undefined){
      this.settings.dragons = new DragonsSettings();
    }
    if(this.settings.baron === undefined){
      this.settings.baron = new BaronSettings();
    }
    if(this.settings.herald === undefined){
      this.settings.herald = new HeraldSettings();
    }

  }

  isMainActive() {
    return this.settings.main.active;
  }

  setMainActive(v: boolean) {
    this.settings.main.active = v;
  }

  async save(data){
    this.settings=data;
    await this.electronService.ipcRenderer.invoke('save', 'settings', data);
  }
}
