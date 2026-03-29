import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
  cartItems: any[] = [];

ngOnInit() {
  this.loadCart();
}

loadCart() {
  this.cartService.getCart().subscribe(data => {
    this.cartItems = data;
  });
}

remove(id: number) {
  this.cartService.remove(id).subscribe(() => {
    this.loadCart();
  });
}
}
