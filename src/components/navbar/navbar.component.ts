import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {Product} from "../../model/item.model";
import {RouterLink} from "@angular/router";

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
    }
  ]
  selectItem (Itemseletc : menuItem){
    for (let  i = 0 ; i < this.menuItems.length; i++ ){
      this.menuItems[i].active = false;
    }
    Itemseletc.active=true;
  }
  itemForm= new FormGroup({

    name : new FormControl(''),
    describtion : new FormControl(''),
    cost : new FormControl(''),
    inventory: new FormControl(''),
    image: new FormControl(''),
  })

  @Input() cartList: Product[] = [];
  @Output() newItemEvent = new EventEmitter<Product>();

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }

  addProduct() {
    let temp: {
      image?: ɵValue<FormControl<string | null>>;
      cost?: ɵValue<FormControl<string | null>>;
      name?: ɵValue<FormControl<string | null>>;
      id: number;
      inventory?: ɵValue<FormControl<string | null>>;
      describtion?: ɵValue<FormControl<string | null>>
    }={
      id:Math.floor(Math.random()*1000),
      ...this.itemForm.value
    }

    this.dialog.nativeElement.close();

    // @ts-ignore
    this.newItemEvent.emit(temp);
    console.log(temp);
  }

}
