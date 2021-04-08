import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { PublicRoutes } from './public-routing.module';
import {SharedModule} from '../_shared/shared.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { ViewCartComponent } from './view-cart/view-cart.component';
import { ViewCategoryComponent } from './view-category/view-category.component';
import { LoginComponent } from './login/login.component';
import {MaterialModule} from '../material/material.module';



@NgModule({
  declarations: [HomeComponent, ViewProductComponent, ViewCartComponent, ViewCategoryComponent, LoginComponent],
  imports: [
    RouterModule.forChild(PublicRoutes),
    CommonModule,
    SharedModule,
    MaterialModule
  ]
})
export class PublicModule { }
