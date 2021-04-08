import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule, MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import {RouterModule} from '@angular/router';



@NgModule({
  imports: [
    RouterModule,
    MatSliderModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule
  ],
  exports: [
    MatSliderModule,
    MatButtonModule,
    MatGridListModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class MaterialModule { }
