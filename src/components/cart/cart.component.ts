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
    // this.total = this.cardService.addCartList.reduce((acc, item) => acc + parseInt(item.cost )* item.stock, 0);
  }
  handleClick() {
    // Iterate through the items in the cart and delete them from Firestore
    for (const item of this.cardService.cart) {
      this.cardService.deleteItemInCart(item);
    }

    alert(
      'Payment successful! \nYour bill is total ' +
      this.cardService.payment() +
      ' VNĐ'
    );

    // Reset the local cart after deleting items from Firestore
    this.cardService.cart = [];
  }

  protected readonly parseInt = parseInt;
}
