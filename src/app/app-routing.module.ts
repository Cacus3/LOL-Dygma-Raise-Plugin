import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { SettingsRoutingModule } from './settings/settings-routing.module';
import { InGameRoutingModule } from './inGame/ingame-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    SettingsRoutingModule,
    InGameRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
