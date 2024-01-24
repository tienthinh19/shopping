import {Component, Input} from "@angular/core";


import {Product} from "../../model/item.model";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  @Input() cartList: Product[] = [];

  constructor() {
  }

  total=0
  pay(){
    this.total = this.cartList.reduce((acc, item) => acc + parseInt(item.cost )* item.stock, 0);
  }
}
