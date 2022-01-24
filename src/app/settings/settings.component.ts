import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LedControllService } from '../services/ledService/ledControll.service';
import { Settings } from './settings.class';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settings: Settings = new Settings();
  constructor(
    private readonly settingService: SettingsService
  ) {}

  async ngOnInit() {
    await this.settingService.init();
    this.settings = this.settingService.settings;
  }

  toggle(e){
    e.stopPropagation();
  }

  save(){
    this.settingService.save(this.settings);
  }

}
