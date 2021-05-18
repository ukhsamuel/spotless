import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Category, Product, Brand} from '../../_shared/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

    storageObjName = {
      // saved device id
      cartItems: 'cartItems',
      wishlistItems: 'wishlistItems',
    };


  public productSource = new BehaviorSubject<Product>(null);
  productDetails$ = this.productSource.asObservable();

 
  constructor(
    private _snackBar: MatSnackBar,
  ) { }


  openSnackBar(str) {
    this._snackBar.open(str,'close');
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


  //=======================UPDATE PRODUCT DETAILS========================================

  updateProductDetails(productDetails: Product){
    this.productSource.next(productDetails);
  }

    
  // Set to localstorage
  localStorageSetItem(key: string, val: any) {
    // console.log(key)
    val = JSON.stringify(val)
    localStorage.setItem(key, val);
  }

  // Get from localstorage
  localStorageGetItem(key: string) {
    const res = localStorage.getItem(key);
    return res;
  }

  localStorageDeleteItem(key: string) {
    console.log(key);
    localStorage.removeItem(key);
  }


}
