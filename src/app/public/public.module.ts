import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public-routing.module';
import {SharedModule} from '../_shared/shared.module';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from '../material/material.module';
import { BookComponent } from './book/book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent, 
    LoginComponent, BookComponent
  ],
  imports: [
    RouterModule.forChild(PublicRoutes),
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class PublicModule { }
