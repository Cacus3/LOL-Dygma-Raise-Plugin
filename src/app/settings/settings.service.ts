import { Injectable } from '@angular/core';
import { ElectronService } from '../core/services';
import { Settings } from './settings.class';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  settings: Settings = new Settings();

  constructor(private readonly electronService: ElectronService) {
  }

  async init(){
    this.settings = await this.electronService.ipcRenderer.invoke('read', 'settings');
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
