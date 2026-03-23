import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems: Product[] = [];

  constructor() {
    this.loadCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  private loadCart() {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartItems = JSON.parse(data);
    }
  }

  addToCart(product: Product) {
    const existing = this.cartItems.find(p => p.id === product.id);

    if (existing) {
      existing.quantity! += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.saveCart();
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  increaseQty(id: number) {
    const item = this.cartItems.find(p => p.id === id);
    if (item) {
      item.quantity! += 1;
      this.saveCart();
    }
  }

  decreaseQty(id: number) {
    const item = this.cartItems.find(p => p.id === id);
    if (item && item.quantity! > 1) {
      item.quantity! -= 1;
      this.saveCart();
    }
  }

  removeFromCart(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }

  getCount(): number {
    return this.cartItems.reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );
  }
}
