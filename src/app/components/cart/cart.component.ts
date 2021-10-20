import { Component, OnInit, Input, Output } from "@angular/core";
import { faTrashAlt, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { ProductService } from "../products/product.service";
import { CartService } from "./cart.service";
import { Router } from "@angular/router";
import { CartItem } from "src/app/Models/cart-item";
import { Product } from "src/app/Models/product";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faShoppingCart = faShoppingCart;
  public cartItems: any = [];
  public cartTotal: number = 0;
  sesionCartName = "crystalShop";
  constructor(
    private CartService: CartService,
    private route: Router,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.ProductService.getProduct().subscribe((product: any) => {
      this.itemToCart(product);
    });
    this.loadCartItems();
    this.CartService.saveSessionStorage(this.cartItems);
  }
  itemToCart(product: Product) {
    let productExists = false;

    for (let i in this.cartItems) {
      if (this.cartItems[i].id === product.id) {
        this.cartItems[i].qty++;

        productExists = true;

        break;
      }
    }

    if (!productExists) {
      let newcartItem: CartItem = new CartItem();
      newcartItem.id = product.id;
      newcartItem.name = product.name;
      newcartItem.qty = 1;
      newcartItem.price = product.price;

      newcartItem.total = this.getItemTotal(newcartItem.price, newcartItem.qty);

      this.cartItems.push(newcartItem);
    }

    this.cartTotal = 0;

    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.price;
    });

    this.CartService.saveSessionStorage(this.cartItems);
  }

  getItemTotal(qty: number, price: number) {
    return qty * price;
  }
  loadCartItems() {
    this.cartItems = this.cart;

    this.getCarTotal(this.cartItems);
  }
  get cart() {
    return JSON.parse(this.CartService.getSessionCart(this.cartItems) || "[]");
  }

  getCarTotal(cart: any) {
    cart.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.price;
    });
  }
  upDateQty(qty: number) {
    this.cartTotal = 0;

    for (let item of this.cartItems) {
      if (item.qty != qty) {
        break;
      } else {
        item.qty = qty;
      }
    }

    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.price;
    });

    this.CartService.saveSessionStorage(this.cartItems);
  }
  removeItem(itemToRemove: any) {
    for (let i = 0; i < this.cartItems.length; i++) {
      if (this.cartItems[i] == itemToRemove) {
        this.cartItems.splice(i, 1);
        console.log(itemToRemove);
      }
    }
    this.cartTotal = 0;

    this.cartItems.forEach((item: CartItem) => {
      this.cartTotal += item.qty * item.price;
    });
    this.CartService.saveSessionStorage(this.cartItems);
  }
}
