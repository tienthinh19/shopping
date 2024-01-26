import {ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {TuiDialogModule} from "@taiga-ui/core";
import {Product} from "../../../model/item.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";


@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    TuiCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    TuiInputModule,
    TuiDialogModule
  ],
  templateUrl: './admin-product.component.html',
  styleUrl: './admin-product.component.scss'
})
export class AdminProductComponent {
  constructor(public router:Router,public cardServices:CartService) {

  }
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
  itemForm= new FormGroup({
    // id : Math.floor(Math.random() * 1000),
    name : new FormControl(''),
    describtion : new FormControl(''),
    cost : new FormControl(''),
    inventory: new FormControl(''),
    image: new FormControl(''),
  })
  addProduct() {
    let temp:Product= {
      id:0 ,
      image: this.itemForm.value.image || '',
      name: this.itemForm.value.name || '',
      cost: this.itemForm.value.cost || '',
      inventory: 10,
      describtion: this.itemForm.value.describtion || '',
      stock: 0,
    }


    // @ts-ignore
    this.cardServices.add(temp);
    this.itemForm.reset()
    this.open=false;
    console.log(temp);
  }

  open = false;

  showDialog(): void {
    this.open = true;
  }

}
