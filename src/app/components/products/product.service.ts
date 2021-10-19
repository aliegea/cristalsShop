import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Subject } from "rxjs";
import { Product } from "../../Models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  subject = new Subject();
  url: string = "http://192.168.64.4";
  endPoint: string = "/cristalShop/api/products.php";
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(`${this.url}${this.endPoint}`);
  }

  sendProduct(product: Product) {
    this.subject.next(product); //Triggering an event
  }

  getProduct() {
    return this.subject.asObservable();
  }
}
