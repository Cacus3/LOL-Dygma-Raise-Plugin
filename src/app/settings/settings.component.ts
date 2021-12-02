import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LedControllService } from '../services/ledService/ledControll.service';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private readonly settingService: SettingsService,
    private readonly ledControllService: LedControllService
  ) {
    this.formGroup = this.formBuilder.group({
      port: [this.settingService.settings.main.port],
      dragonsActive: [this.settingService.settings.dragons.active],
    });
  }

  toggle(e){
    e.stopPropagation();
  }
}
