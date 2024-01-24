import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {Product} from "../../model/item.model";

export interface menuItem{
  name:string;
  classIcon:string;
  active:boolean;

}
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'

})

export class NavbarComponent {
  menuItems = [
    {
      name: "HOME",classIcon:"fa-solid fa-house",active:true
    },
    {name: "NEWS",classIcon:"fa-regular fa-newspaper", active: false},
    {
      name:"CONTACT",classIcon:"fa-solid fa-phone",active:false
    },
    {
      name:"ABOUT",classIcon:"fa-solid fa-info",active: false
    },
    {
      name:"CART",classIcon:"fa-solid fa-cart-shopping",active: false
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
  // @Input() cartList: Product[] = [];
  // total=0
  // pay(){
  //   this.total = this.cartList.reduce((acc, item) => acc + parseInt(item.cost )* item.stock, 0);
  // }

  // @ViewChild('appDialog2', { static: true })
  // dialog1!: ElementRef<HTMLDialogElement> ;
  // // class="dialog1"
  // cdr1 = inject(ChangeDetectorRef);
  // openDialog1() {
  //   this.dialog1.nativeElement.showModal();
  //   this.cdr1.detectChanges();
  // }
  // closeDialog1() {
  //   this.dialog1.nativeElement.close();
  //   this.cdr1.detectChanges();
  // }
  // selectItem (Itemseletc : menuItem
  // ){
  //   for (let  i = 0 ; i < this.menuItems.length; i++ ){
  //     this.menuItems[i].active = false;
  //   }
  //   Itemseletc.active=true;
  // }
}
