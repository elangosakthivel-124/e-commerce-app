import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private API_URL = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}
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
    getProductById(id: number) {
  return this.http.get<Product>(`${this.API_URL}/${id}`);
}
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
getCategories() {
  return this.http.get<string[]>(`${this.API_URL}/categories`);
}
