import { Injectable } from '@angular/core';
import { Settings } from './settings.class';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: Settings = new Settings();
  constructor() { }

  isMainActive(){
    return this.settings.main.active;
  }

  setMainActive(v:boolean){
    this.settings.main.active=v;
  }
}
