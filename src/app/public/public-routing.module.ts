import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { BookComponent } from './book/book.component';



export const PublicRoutes: Routes = [
	{
	  path: '',
	  component: HomeComponent
	},
	{
	  path: 'login',
	  component: LoginComponent
	},
	{
		path: '',
		children: [
			{
				path: 'home',
				component: HomeComponent,
				data: {
					title: 'Home'
				}
			},
			{
				path: 'book',
				component: BookComponent,
				data: {
					title: 'Book'
				}
			},
			{
			  path: '',
			  redirectTo: 'home',
			  pathMatch: 'full'
			}
		]
	}
];
