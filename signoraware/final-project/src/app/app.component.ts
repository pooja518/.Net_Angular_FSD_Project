import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { HomeComponent } from "./home/home.component";
import { LoginPopupComponent } from './login-popup/login-popup.component';
import { ProductsComponent } from "./products/products.component";
import { provideHttpClient } from '@angular/common/http';
import { CartComponent } from "./cart/cart.component";
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, AdminComponent, HomeComponent, LoginPopupComponent, ProductsComponent, CartComponent, AboutUsComponent, ContactUsComponent],
  providers : [UserService, AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  loggedInUser: string | null = null;

  constructor(private router: Router) {}
  
}
