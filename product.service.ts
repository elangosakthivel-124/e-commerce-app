private API = 'http://127.0.0.1:8000';

getProducts() {
  return this.http.get<Product[]>(`${this.API}/products`);
}

getProductById(id: number) {
  return this.http.get<Product>(`${this.API}/products/${id}`);
}
