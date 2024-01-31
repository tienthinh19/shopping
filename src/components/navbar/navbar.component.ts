import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {Product} from "../../model/item.model";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../app/service/cart.service";
import {AuthService} from "../../app/service/auth/auth.service";
import {SharedModule} from "../../shared/shared.module";
import {Auth, authState, User} from "@angular/fire/auth";
import {Subscription} from "rxjs";


export interface menuItem{
  name:string;
  classIcon:string;
  active:boolean;
router: string
}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink,SharedModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'

})

export class NavbarComponent {
  open = false;

  onClick(): void {
      this.open = !this.open;
  }

  onObscured(obscured: boolean): void {
      if (obscured) {
          this.open = false;
      }
  }

  onActiveZone(active: boolean): void {
      this.open = active && this.open;
  }
  menuItems:menuItem[] = [
    {
      name: "HOME",classIcon:"fa-solid fa-house",active:true,router: 'productlist'
    },

    {
      name:"ABOUT",classIcon:"fa-solid fa-info",active: false,router:'about'
    },
    {
      name:"CART",classIcon:"fa-solid fa-cart-shopping",active: false,router:'cart'
    },
    {
      name:"ADMIN-PRODUCT",classIcon:"fa-solid fa-user-tie",active: false,router:'admin'
    },
    // {
    //   name:"LOGOUT",classIcon:"fa-solid fa-arrow-right-from-bracket",active: false,router:''
    // }
  ]
  selectItem (Itemseletc : menuItem){
    for (let  i = 0 ; i < this.menuItems.length; i++ ){
      this.menuItems[i].active = false;
    }
    Itemseletc.active=true;
  }


  @Input() cartList: Product[] = [];
  @Output() newItemEvent = new EventEmitter<Product>();

user!: User;
dispose!: Subscription;

constructor(public router:Router,public cardServices:CartService, private auth: Auth) {
  if(this.auth){
    this.dispose = authState(this.auth).subscribe(
      (user:any) => {
        this.user = user;
        console.log(user)
      }
    )
  }

}

signOut(){
  this.auth.signOut();
}

}
