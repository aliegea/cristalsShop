import { Component, OnInit } from '@angular/core';
import { faTrashAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  faTrashAlt = faTrashAlt;
  faShoppingCart = faShoppingCart;
  constructor() {}

  ngOnInit(): void {}
}
