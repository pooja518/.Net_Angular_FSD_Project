import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginPopupComponent } from '../login-popup/login-popup.component';
import { Product } from '../models/product.model';
import { ProductService } from '../product.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModule } from 'ng-bootstrap';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LoginPopupComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loggedInUser: string | null = null;

  constructor(private router: Router, private routerOutlet: RouterOutlet, private productService: ProductService) {}

  products:Product[] = [];
  showLoginPopup = false;

  ngOnInit(): void {
    this.loadProducts();
  }

  // Method to load products
  loadProducts(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  openLoginPopup() {
    this.router.navigate(['/login']);
  }

  closeLoginPopup() {
    this.router.navigate(['/']);
  }

  onLoginSuccess(username: string) {
    this.loggedInUser = username;
    this.closeLoginPopup();
  }
  




  

  
}
