import { Component } from '@angular/core';
import {Product} from "../../../model/item.model";
import {ProductlistComponent} from "../../../components/productlist/productlist.component";
import {CartService} from "../../service/cart.service";
import {FooterComponent} from "../../../components/footer/footer.component";
import {NavbarComponent} from "../../../components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductlistComponent,
    FooterComponent,
    NavbarComponent,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public cardServices: CartService) {
  }
}
