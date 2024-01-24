import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {ProductlistComponent} from "../components/productlist/productlist.component";
import { Product } from '../model/item.model';
import {CartComponent} from "../components/cart/cart.component";
import {CartService} from "./service/cart.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ProductlistComponent, CartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'shopping';
constructor(public cardServices:CartService) {
}

}
