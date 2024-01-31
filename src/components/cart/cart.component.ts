import {Component, Input} from "@angular/core";
import {CartModel, Product} from "../../model/item.model";
import {CartService} from "../../app/service/cart.service";
import {SharedModule} from "../../shared/shared.module";
import * as CartActions from "../../ngrx/cart/cart.action";
import { Store } from '@ngrx/store';
import {CartState} from "../../ngrx/cart/cart.state";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  constructor(public cardService: CartService,private store: Store<{ cart: CartState }>) {
  }

  cart: CartModel = {
    createdAt: new Date().toString(),
    id: '1',
    productList: [],
    total: 0,

  };

  cart$ = this.store.select('cart', 'cart');
  total$ = this.store.select((state) => state.cart.cart.total);
  quantityFormList: FormControl[] = [];



  ngOnInit(): void {
    this.cart$.subscribe((cart) => {
      if (cart) {
        this.cart = {
          ...this.cart,
          productList: cart.productList,
          total: cart.total,
        };
        cart.productList.forEach((product) => {
          this.quantityFormList.push(new FormControl(product.stock));
        });
      }
    });
    this.quantityFormList.forEach((form, index) => {
      form.valueChanges.subscribe((value) => {
        this.updateQuantity(index, value);
      });
    });
  }

  count(quantity: number, price: number) {
    return Math.ceil(quantity * price);
  }

  countTotal() {
    let total = 0;
    this.cart.productList.forEach((product, index) => {
      total += this.count(product.stock, product.cost);
    });
    return total;
  }

  updateQuantity(index: number, stock: number) {
    this.store.dispatch(
      CartActions.updateProduct({
        product: {
          ...this.cart.productList[index],
          stock: stock,
        },
      })
    );
  }

  removeProduct(index: number) {
    this.store.dispatch(
      CartActions.removeProduct({ id: this.cart.productList[index].id.toString() })
    );
    

  // handleClick() {
  //   // Iterate through the items in the cart and delete them from Firestore
  //   for (const item of this.cardService.cart) {
  //     this.cardService.deleteItemInCart(item);
  //   }
  //
  //   alert(
  //     'Payment successful! \nYour bill is total ' +
  //     this.cardService.payment() +
  //     '.000 VNĐ'
  //   );
  //
  //   // Reset the local cart after deleting items from Firestore
  //   this.cardService.cart = [];
  // }
  //
  // protected readonly parseInt = parseInt;
}
clearCart() {
  this.store.dispatch(CartActions.clearCart());
}
}