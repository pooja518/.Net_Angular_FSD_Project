import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
[x: string]: any;
  



  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Method to load products
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  // Method to select a product
  selectProduct(product: Product): void {
    this.selectedProduct = product;
  }


  // increaseQuantity()

  // Method to add a new product
  addProduct(newProduct: Product): void {
    this.productService.createProduct(newProduct).subscribe(() => {
      this.loadProducts(); // Reload products after adding
    });
  }

  // Method to update an existing product
  updateProduct(updatedProduct: Product): void {
    this.productService.updateProduct(updatedProduct).subscribe(() => {
      this.loadProducts(); // Reload products after updating
    });
  }

  // Method to delete a product
  deleteProduct(productId: number): void {
    this.productService.deleteProductById(productId).subscribe(() => {
      this.loadProducts(); // Reload products after deleting
    });
  }

}
