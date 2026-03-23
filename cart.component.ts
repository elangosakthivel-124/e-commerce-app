import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getTotal();
  }

  increase(id: number) {
    this.cartService.increaseQty(id);
    this.refresh();
  }

  decrease(id: number) {
    this.cartService.decreaseQty(id);
    this.refresh();
  }

  remove(id: number) {
    this.cartService.removeFromCart(id);
    this.refresh();
  }

  clearCart() {
    this.cartService.clearCart();
    this.refresh();
  }
}
