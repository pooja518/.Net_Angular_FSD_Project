import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from './models/cart.model'; // Adjust the import path as needed

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7163/api/Project'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Fetch cart items by user ID
  getCartByUserId(userId: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/cart${userId}`);
  }

  // Add an item to the cart
  addToCart(productId: number, userId: number, quantity: number): Observable<any> {
    const params = new HttpParams()
      .set('ProductId', productId.toString())
      .set('userId', userId.toString())
      .set('Quantity', quantity.toString());
    return this.http.post<any>(`${this.apiUrl}/addproduct`, null, { params });
  }

  // Remove an item from the cart
  removeFromCart(productId: number, userId: number, cartId: number): Observable<any> {
    const params = new HttpParams()
      .set('ProductId', productId.toString())
      .set('userId', userId.toString())
      .set('cartId', cartId.toString());
    return this.http.delete<any>(`${this.apiUrl}/removeproduct`, { params });
  }
}
