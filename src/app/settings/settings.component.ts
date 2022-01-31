import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  currentLang;
  constructor(
    private readonly settingsService: SettingsService,
    private readonly lolGCAService: LolGCAService,
    private translate: TranslateService,
  ) {

  }

  async ngOnInit() {
    await this.settingsService.init();
    this.settings = this.settingsService.settings;
    this.lolGCAService.init();
    this.translate.addLangs(['gb', 'pl']);
    this.translate.setDefaultLang(this.settings.lang || 'gb');
    this.translate.use(this.settings.lang || 'gb');
    this.currentLang = this.translate.currentLang;
  }

  getLangs(){
    return this.translate.getLangs();
  }

  useLang(lang){
    this.translate.use(lang);
  }

  toggle(e){
    e.stopPropagation();
  }

  save(){
    this.settingsService.save(this.settings);
  }

  addNewTimer(type: string){
    this.settingsService.settings[type].timers.push(new Timer([],'all',250,15));
  }

  removeTimer(type: string){
    this.settingsService.settings[type].timers.pop();
  }

}
