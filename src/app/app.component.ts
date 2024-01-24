import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {ProductlistComponent} from "../components/productlist/productlist.component";
import { Product } from '../model/item.model';
import {CartComponent} from "../components/cart/cart.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ProductlistComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopping';
  productList: Product[] = [
    {
      name: 'HarryPotter',
      id: 1,
      describtion: 'It is a fantastic book',
      cost: '10',
      inventory: 1,
      image: 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81ARhEb8KwL._SL1500_.jpg',
      stock: 0,
    },
    {
      name: 'Conan',
      id: 2,
      describtion: 'It is a fantastic book',
      cost: '10',
      inventory: 1,
      image: 'https://kenh14cdn.com/thumb_w/660/203336854389633024/2022/11/4/photo-6-16675562029442139900239.jpg',
      stock: 0,
    }

  ]
  addItem(newItem: Product) {
    this.productList.push(newItem);
    console.log(newItem)
  }
  delete(value: number) {
    console.log(value);
    const index = this.productList.findIndex(item => item.id === value);
    if (index !== -1) {
      this.productList.splice(index, 1);
    }
  }
  addCartList: Product[] = [];
  addToCart(itemCart: Product) {
    let index = this.addCartList.findIndex(item => item.id === itemCart.id);
    if (index !== -1) {
      this.addCartList[index].stock++;
      return;
    }
    itemCart.stock = 1;
    this.addCartList.push(itemCart);

    console.log("add to cart")
  }


}
