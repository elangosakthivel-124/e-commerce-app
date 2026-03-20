import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent {
  products = [
    { name: 'Laptop', price: 50000 },
    { name: 'Phone', price: 20000 },
    { name: 'Headphones', price: 2000 }
  ];
}
