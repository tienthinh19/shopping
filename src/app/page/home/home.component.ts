import { Component } from '@angular/core';
import {Product} from "../../../model/item.model";
import {ProductlistComponent} from "../../../components/productlist/productlist.component";
import {CartService} from "../../service/cart.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductlistComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public cardServices: CartService) {
  }
}
