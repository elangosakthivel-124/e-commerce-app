import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private API = 'http://127.0.0.1:8000/cart';

  private cartItems: Product[] = [];
  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  // ================= LOCAL STORAGE =================

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCount();
  }

  private loadCart(): void {
    const data = localStorage.getItem('cart');
    if (data) {
      this.cartItems = JSON.parse(data);
      this.updateCount();
    }
  }

  private updateCount(): void {
    const count = this.cartItems.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );
    this.cartCountSubject.next(count);
  }

  // ================= CART LOGIC =================

  addToCart(product: Product): void {
    const existing = this.cartItems.find(p => p.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }

    this.saveCart();

    // 🔁 Optional API sync
    this.http.post(this.API, {
      product_id: product.id,
      quantity: 1
    }).subscribe();
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  increaseQty(id: number): void {
    const item = this.cartItems.find(p => p.id === id);
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
      this.saveCart();
    }
  }

  decreaseQty(id: number): void {
    const item = this.cartItems.find(p => p.id === id);
    if (item && (item.quantity || 1) > 1) {
      item.quantity!--;
      this.saveCart();
    }
  }

  removeFromCart(id: number): void {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.saveCart();

    // 🔁 Optional API sync
    this.http.delete(`${this.API}/${id}`).subscribe();
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  }

  // ================= API METHODS =================

  getCartFromAPI(): Observable<any[]> {
    return this.http.get<any[]>(this.API);
  }
}
