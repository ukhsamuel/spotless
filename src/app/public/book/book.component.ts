import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { TasksService, UtilitiesService } from '../../core/services';

const moment =  _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class BookComponent implements OnInit {
  colorToggle: any;
  serviceCharge = 50;
  showSummary = false;
  bookingForm: FormGroup;

  indoorServices  = []
  outsideServices  = []
  selectedService = [];
  bookingData = {
    bedrooms : '2',
    bathrooms: '1',
    outdoorHours:0,
    date: ''
  }
  bookingStage = 1;
  pairedWorker : any;
  durationInSeconds = 5;

  
  orderInformation = {
    comment: "",
    address: "",
    phone: "",
    email: "",
    bedrooms : '',
    bathrooms: '',
    taskIds : "",
    workerId : "",
    fee:0,
    outdoorHours:0,
    date: undefined
  }
  tomorrowDate = moment().add(1,'days');

  breakpoint: number;

  cols : number;
  taskCols : number;
  span1 : number;
  span2 : number;

  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 1,
    xs: 1
  }

  tasksGridByBreakpoint = {
    xl: 6,
    lg: 6,
    md: 3,
    sm: 2,
    xs: 2
  }
  submitted: boolean;

  constructor(
    private tasksService: TasksService,
    public utility: UtilitiesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private breakpointObserver: BreakpointObserver
    ) {
    this.orderInformation.date = this.tomorrowDate;
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = this.gridByBreakpoint.xs;
          this.taskCols = this.tasksGridByBreakpoint.xs;
          this.span1 = 1;
          this.span2 = 1;
        }
        if (result.breakpoints[Breakpoints.Small]) {
          this.cols = this.gridByBreakpoint.sm;
          this.taskCols = this.tasksGridByBreakpoint.sm;
          this.span1 = 1;
          this.span2 = 1;
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          this.cols = this.gridByBreakpoint.md;
          this.taskCols = this.tasksGridByBreakpoint.md;
          this.span1 = 2;
          this.span2 = 1;
        }
        if (result.breakpoints[Breakpoints.Large]) {
          this.cols = this.gridByBreakpoint.lg;
          this.taskCols = this.tasksGridByBreakpoint.lg;
          this.span1 = 2;
          this.span2 = 1;

        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          this.cols = this.gridByBreakpoint.xl;
          this.taskCols = this.tasksGridByBreakpoint.xl;
          this.span1 = 2;
          this.span2 = 1;
        }
      }
    });    
   }

  ngOnInit(): void {
    
    this.bookingForm = this.formBuilder.group({
      date: [this.tomorrowDate, Validators.required],
      phone: ['', Validators.required],
      bedrooms: ['2', Validators.required],
      bathrooms: ['1', Validators.required],
      outdoorHours: [0, Validators.required],
      address: ['', Validators.required],
      comment: [''],
      email: [null, [Validators.required, Validators.email]],
    });
    this.loadTasks()
  }
  
  loadTasks(){

    this.tasksService.getTasks$()
    .toPromise().then(
      (result: any) => {
        // this.products = result;
        this.indoorServices =  result.data.filter(function (el) {return el.type == '1' })
        this.outsideServices =  result.data.filter(function (el) {return el.type == '2' })
        console.log(this.indoorServices)

      })
  }

  getPairedWorker(){
    this.tasksService.getPairedWorker$()
    .toPromise().then(
      (result: any) => {
        this.bookingStage = 3;
        this.pairedWorker = result.data;
       console.log(result)

      })
  }

  chooseService(d){
    if(!this.isServiceChosen(d.id)){
      this.selectedService.push(d);
    }else{
      this.selectedService = this.selectedService.filter(function (el) {
            return el.id !== d.id
      })
    }
    // console.log(d)
    console.log(this.selectedService)
  }

  // public removeFromCart(productId){
  //   var newCartItems = this.cartItems.filter(function (el) {
  //     return el.productId !== productId
  //   })
  //   this.cartItems = newCartItems;
  //   this.updateCartDetails(this.cartItems);
    
  //   console.log(newCartItems)
  // }
  isServiceChosen(id){
    var index = this.selectedService.findIndex(x => x.id === id);
    return index > -1?true:false;
  }

  returnServiceHours(){
    let total = 0;
    // total = this.selectedService.reduce((a, b) => a.hours + b.hours, 0);
    total = this.selectedService.reduce(function(tot, arr) { 
      return tot + parseInt(arr.duration);
    },0)

    // console.log(this.selectedService)
    // calculate rooms cleaning time
    let roomTime = parseInt(this.bookingData.bathrooms) + parseInt(this.bookingData.bedrooms); 

    return total + this.bookingData.outdoorHours + roomTime;
  }

  calculateTotal(){
    let total = 0;
    let bedrooms = JSON.parse(this.bookingData.bedrooms);
    let bathrooms = JSON.parse(this.bookingData.bathrooms);
    total = ((20 * bedrooms) + (10 * bathrooms) + (10 * this.selectedService.length));
    return total + this.serviceCharge;
  }


  submitOrder(){
    this.submitted = true;

    // stop here if form is invalid
    console.log(this.bookingForm.invalid);
    if (this.bookingForm.invalid) {
      return;
    }

    this.orderInformation.fee = this.calculateTotal();
    this.orderInformation.bedrooms  = this.bookingForm.get('bedrooms').value;
    this.orderInformation.bathrooms  = this.bookingForm.get('bathrooms').value;
    this.orderInformation.address  = this.bookingForm.get('address').value;
    this.orderInformation.phone  = this.bookingForm.get('phone').value;
    this.orderInformation.email  = this.bookingForm.get('email').value;
    this.orderInformation.comment  = this.bookingForm.get('comment').value;
    this.orderInformation.outdoorHours  = this.bookingForm.get('outdoorHours').value;
    let idArray = this.selectedService.map(function(entry){return entry.id})
    this.orderInformation.taskIds = JSON.stringify(idArray)
    this.orderInformation.workerId = this.pairedWorker.id;


    let d = undefined;
    d = this.bookingForm.get('date');
    this.orderInformation.date  = moment(d).format('MM/DD/YYYY');;
    
    console.log(this.orderInformation)


    this.tasksService.doOrders$(this.orderInformation).subscribe((res) => {
        console.log('res: ', res);
        if(res.status){
          this.utility.openSnackBar(res.message)
          this.resetForm();
          this.router.navigate(['/']);
        }
    });
  }

  resetForm(){
    this.bookingForm.setValue({
      date: '',
      phone: '',
      bedrooms : '2',
      bathrooms: '1',
      outdoorHours: 0,
      address: '',
      comment: '',
      email: '',
    });

    this.orderInformation = {
      comment: "",
      address: "",
      phone: "",
      email: "",
      bedrooms : '2',
      bathrooms: '1',
      taskIds : "",
      workerId : "",
      fee:0,
      outdoorHours:0,
      date: undefined
    }

    this.bookingData = {
      bedrooms : '2',
      bathrooms: '1',
      outdoorHours:0,
      date: ''
    }
  }
}
