import { Component } from '@angular/core';
import {CartService} from "../../app/service/cart.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
constructor(public cardService:CartService,private activeRouter:ActivatedRoute) {
  let id=this.activeRouter.snapshot.params['id'];
  this.producte=this.cardService.getItemById(id);
  console.log(this.producte)
}
producte:any;

}
