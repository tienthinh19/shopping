import { Component } from '@angular/core';
import {CartService} from "../../app/service/cart.service";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
constructor(public cardService:CartService) {
}
}
