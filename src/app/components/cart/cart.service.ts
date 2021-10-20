import { Injectable, EventEmitter } from "@angular/core";
import { ProductService } from "../products/product.service";

@Injectable({
  providedIn: "root",
})
export class CartService {
  sesionCartName: any = "crystalShop";
  constructor(public ProductService: ProductService) {}

  getSessionCart(cart: any[]) {
    if (sessionStorage.getItem(this.sesionCartName) == null) {
      this.saveSessionStorage(cart);
    }
    return sessionStorage.getItem(this.sesionCartName);
  }

  saveSessionStorage(cart: any) {
    sessionStorage.setItem(this.sesionCartName, JSON.stringify(cart));
  }
}
