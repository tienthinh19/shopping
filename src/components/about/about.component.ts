import { Component } from '@angular/core';
import {CartService} from "../../app/service/cart.service";
import {ActivatedRoute} from "@angular/router";
import {FooterComponent} from "../footer/footer.component";
import {SharedModule} from "../../shared/shared.module";


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FooterComponent,
 SharedModule
  ],
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
