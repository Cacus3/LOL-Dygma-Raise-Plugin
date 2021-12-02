import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InGameComponent } from './ingame.component';

const routes: Routes = [
  {
    path: 'ingame',
    component: InGameComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InGameRoutingModule {}
