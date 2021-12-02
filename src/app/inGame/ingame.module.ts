import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InGameRoutingModule } from './ingame-routing.module';
import { InGameComponent } from './ingame.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [InGameComponent],
  imports: [
    CommonModule,
    SharedModule,
    InGameRoutingModule,
  ],
  providers: []
})
export class InGameModule {}
