import {Component, Input} from "@angular/core";
import {Product} from "../../model/item.model";
import {CartService} from "../../app/service/cart.service";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(public cardService: CartService) {
  }

  total=0
  pay(){
    this.total = this.cardService.addCartList.reduce((acc, item) => acc + parseInt(item.cost )* item.stock, 0);
  }
}
