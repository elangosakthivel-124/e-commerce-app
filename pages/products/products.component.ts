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

  loadProducts(): void {
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

  loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: () => {
        // optional error handling
      }
    });
  }

  applyFilters(): void {
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
