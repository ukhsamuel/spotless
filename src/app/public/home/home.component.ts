import { Component, OnInit } from '@angular/core';
import { ProductService, CartService, WishlistService } from '../../core/services/';
import { ComingSoonComponent} from '../../_shared/modals/coming-soon/coming-soon.component';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    public dialog: MatDialog
  ) { 
    // this.cartService.checkForProductInCart(1);

  }

  ngOnInit(): void {
  }

  openComingSoonComponent() {
    const dialogRef = this.dialog.open(ComingSoonComponent);
  }

  // open book page with selected service type
  gotoService(type){
    this.router.navigate(['/book'], { queryParams: { type } });
  }

  
  
}
