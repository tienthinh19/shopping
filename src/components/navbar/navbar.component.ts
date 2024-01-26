import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {Product} from "../../model/item.model";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../app/service/cart.service";


export interface menuItem{
  name:string;
  classIcon:string;
  active:boolean;
router: string
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'

})

export class NavbarComponent {
  menuItems:menuItem[] = [
    {
      name: "HOME",classIcon:"fa-solid fa-house",active:true,router: ''
    },
    {name: "NEWS",classIcon:"fa-regular fa-newspaper", active: false, router:''},
    {
      name:"CONTACT",classIcon:"fa-solid fa-phone",active:false,router:''
    },
    {
      name:"ABOUT",classIcon:"fa-solid fa-info",active: false,router:''
    },
    {
      name:"CART",classIcon:"fa-solid fa-cart-shopping",active: false,router:'/card'
    },
    {
      name:"ADMIN-PRODUCT",classIcon:"fa-solid fa-user-tie",active: false,router:'/admin_product'
    }
  ]
  selectItem (Itemseletc : menuItem){
    for (let  i = 0 ; i < this.menuItems.length; i++ ){
      this.menuItems[i].active = false;
    }
    Itemseletc.active=true;
  }


  @Input() cartList: Product[] = [];
  @Output() newItemEvent = new EventEmitter<Product>();


constructor(public router:Router,public cardServices:CartService) {

}

}
