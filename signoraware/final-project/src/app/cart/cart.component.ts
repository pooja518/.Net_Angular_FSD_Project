import { Component, OnInit } from '@angular/core';
import { Cart } from '../models/cart.model'; // Adjust the import path as needed
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-cart',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  cartDummy: Cart[] = [];
  userId!: number | null;
  productItems: Product[] = [];

  constructor(private cartService: CartService, private authService: AuthService, private productService: ProductService) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    console.log("Userid:",this.userId)
    this.loadCartItems();
  }

  loadCartItems(): void {
    if (this.userId !== null) {
      this.cartDummy = [
        { id: 1,cartId: 101, productId: 1001, quantity: 2 },
        { id: 2, cartId: 102, productId: 1002, quantity: 1 },
        { id: 3, cartId: 103, productId: 1003, quantity: 5 }
    ];
    console.log("dummy cart :",this.cartDummy.values());
      this.cartService.getCartByUserId(this.userId).subscribe(items => {
        this.cartItems = items;
        // // console.log("items : ",items)
        // Object.keys(items).forEach((x)=> console.log(x))
        // items.forEach(x => console.log("productId_1:",x.ProductId))

        // //products fetching


        this.getProductById(this.cartItems);
        console.log(this.cartItems);
        console.log("items :"+items[0].productId)
        
        
      });
      // this.getProductById(this.cartItems);
      console.log(this.cartItems)
    }
    
  }
  getProductById(cartItems: Cart[]): void{ 
    // console.log(this.cartItems[0].ProductId);
    console.log(cartItems[0].productId,this.cartDummy[0].productId);

    this.cartItems.forEach(cartItem => {
      // console.log(cartItem)
      // const {id, cartId, ProductId, Quantity} = cartItem;
      // console.log(CartId);
    })
    for(let item of this.cartItems){
      this.productService.getProductById(item.productId).subscribe((data : Product)=> {
        console.log("Products data : "+data);
        this.productItems.push(data);
      })
    

    }
  }

  addItemToCart(productId: number, quantity: number): void {
    if (this.userId !== null) {
      this.cartService.addToCart(productId, this.userId, quantity).subscribe(response => {
        console.log(response.status);
        this.loadCartItems();
      });
    }
  }

  removeItemFromCart(productId: number, cartId: number): void {
    if (this.userId !== null) {
      this.cartService.removeFromCart(productId, this.userId, cartId).subscribe(response => {
        console.log(response.status);
        this.loadCartItems();
      });
    }
  }
}
