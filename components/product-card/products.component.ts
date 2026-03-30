import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCart();
  }

  loadProducts() {
    this.products = this.productService.getProducts();
  }

  loadCart() {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data;
    });
  }

  addToCart(product: Product) {
    this.cartService.add(product).subscribe(() => {
      this.loadCart();
    });
  }

  remove(id: number) {
    this.cartService.remove(id).subscribe(() => {
      this.loadCart();
    });
  }
}
