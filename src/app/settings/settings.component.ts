import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private readonly settingService: SettingsService,
    private readonly electronService: ElectronService) {


    this.formGroup = this.formBuilder.group({
      mainActive: [this.settingService.settings.main.active],
      port: [this.settingService.settings.main.port],
      dragonsActive: [this.settingService.settings.dragons.active],
    });
  }

  test(){
    if(this.electronService.isElectron){
      this.electronService.ipcRenderer.invoke('getLedsGroupedByColor','all').then((v) => {
      console.log(v);
      });
    }
  }
}
