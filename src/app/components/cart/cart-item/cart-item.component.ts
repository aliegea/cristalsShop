import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { CartService } from "../cart.service";
import { CartItem } from "src/app/Models/cart-item";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.css"],
})
export class CartItemComponent implements OnInit {
  @Input() cartItem!: CartItem;
  @Output() UpdateQuantity = new EventEmitter<number>();
  @Output() removeAction = new EventEmitter<CartItem>();

  constructor(private CartService: CartService) {}
  faTrashAlt = faTrashAlt;
  ngOnInit(): void {}

  sendItemQuantity(value: number) {
    this.UpdateQuantity.emit(value);
  }

  sendItemToRemove(value: CartItem) {
    this.removeAction.emit(value);
  }
}
