import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  cartCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartCount = this.cartService.getCount();
  }
}
