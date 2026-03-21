import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private products: Product[] = [
    {
      id: 1,
      name: 'Laptop',
      price: 50000,
      image: 'https://via.placeholder.com/150',
      description: 'High performance laptop'
    },
    {
      id: 2,
      name: 'Phone',
      price: 20000,
      image: 'https://via.placeholder.com/150',
      description: 'Latest smartphone'
    },
    {
      id: 3,
      name: 'Headphones',
      price: 2000,
      image: 'https://via.placeholder.com/150',
      description: 'Noise cancelling headphones'
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
