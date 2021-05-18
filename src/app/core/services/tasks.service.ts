import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Category, Product, Brand} from '../../_shared/interfaces';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TasksService {
    baseUrl = environment.apiUrl + environment.basePath;


  public productSource = new BehaviorSubject<Product>(null);
  productDetails$ = this.productSource.asObservable();



  products: Product[] = []

  brands: Brand[] =  []

  categories: Category[] =  [];

  constructor(
    private http: HttpClient
  ) { }


  //=======================UPDATE PRODUCT DETAILS========================================

  updateProductDetails(productDetails: Product){
    this.productSource.next(productDetails);
  }

  getTasks$(){
    return this.DOGET('/tasks');
  }

  getPairedWorker$(){
    return this.DOGET('/workers/get-paired-worker');
  }


  getNewProducts$(){
    return this.DOGET('/product?orderBy=new');
  }
  
  doOrders$(data){
    return this.DOPOST('/orders', data);
  }

  DOGET(url:string){
    return this.http.get(this.baseUrl + url); 
  }

  DOPOST(url:string,payload){
    return this.http.post<any>(this.baseUrl + url, payload)
  }

}
