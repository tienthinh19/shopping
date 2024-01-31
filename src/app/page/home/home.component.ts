import { Component } from '@angular/core';
import {Product} from "../../../model/item.model";
import {ProductlistComponent} from "../../../components/productlist/productlist.component";
import {CartService} from "../../service/cart.service";
import {FooterComponent} from "../../../components/footer/footer.component";
import {NavbarComponent} from "../../../components/navbar/navbar.component";
import {RouterOutlet} from "@angular/router";
import {AboutComponent} from "../../../components/about/about.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProductlistComponent,
    FooterComponent,
    NavbarComponent,
    RouterOutlet,
    AboutComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public cardServices: CartService) {
  }
}
