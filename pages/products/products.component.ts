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
}import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }
  import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {

  product!: Product;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load product';
        this.loading = false;
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product);
    alert('Added to cart!');
  }
}
<div *ngIf="loading">Loading product...</div>
<div *ngIf="error">{{ error }}</div>

<div *ngIf="!loading && !error" class="details">
  <img [src]="product.image" alt="{{ product.title }}">

  <div>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <h3>₹{{ product.price }}</h3>

    <button (click)="addToCart()">Add to Cart</button>
  </div>
</div>
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];

  categories: string[] = [];

  searchText = '';
  selectedCategory = '';
  sortOrder = '';

  loading = true;
  error = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    });
  }

  applyFilters() {
    let result = [...this.products];

    // 🔍 Search
    if (this.searchText) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // 📂 Category
    if (this.selectedCategory) {
      result = result.filter(p =>
        p.category === this.selectedCategory
      );
    }

    // 🔽 Sorting
    if (this.sortOrder === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortOrder === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    this.filteredProducts = result;
  }
}
}
