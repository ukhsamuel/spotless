import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './header-navigation/navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { TopbarComponent } from './header-navigation/topbar/topbar.component';
import { PageTitleComponent } from './header-navigation/page-title/page-title.component';
import { BreadcrumbsComponent } from './header-navigation/breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './header-navigation/search/search.component';
import {MaterialModule} from '../material/material.module';
import {RouterModule} from '@angular/router';
import { ComingSoonComponent } from './modals/coming-soon/coming-soon.component';


@NgModule({
  declarations: [
    NavigationComponent,
    FooterComponent,
    TopbarComponent,
    PageTitleComponent,
    BreadcrumbsComponent,
    SearchComponent,
    ComingSoonComponent
  ],
  exports: [
    NavigationComponent,
    PageTitleComponent,
    FooterComponent,
    TopbarComponent,
    BreadcrumbsComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule
  ]
})
export class SharedModule { }
