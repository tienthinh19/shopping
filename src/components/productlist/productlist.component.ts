import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../model/item.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators, ɵValue} from "@angular/forms";

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent  {
  @Input() productlist: Product[] = [];
  constructor() {

  }
  @Output() newItemEvent = new EventEmitter<number>();

  delete(value: number | undefined){

    this.newItemEvent.emit(value);

  }
  itemForm= new FormGroup({
    id: new FormControl(0),
    name : new FormControl('' ),
    describtion : new FormControl('' ),
    cost : new FormControl('' ),
    inventory: new FormControl(0),
    image: new FormControl('' ),
    stock: new FormControl(0  ),
  })
  //@Output() newItemEvent = new EventEmitter<Product>();

  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  openDialog(item: Product) {
    selectedItem: item;
    this.itemForm.patchValue(
      {
        id: item.id,
        name: item.name.toString(),
        describtion: item.describtion,
        cost: item.cost,
        inventory: item.inventory,
        image: item.image,
        stock: item.stock,

      }
    );
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }



  addProduct() {
    let temp: {
      id: number;
      name: string;
      describtion: string;
      cost: string;
      inventory: number;
      image: string;
      stock: number;

    }
    temp = {
      id: this.itemForm.value.id ?? 0,
      name: this.itemForm.value.name ?? '',
      describtion: this.itemForm.value.describtion ?? '',
      cost: this.itemForm.value.cost ?? '',
      inventory: this.itemForm.value.inventory ?? 0,
      image: this.itemForm.value.image ?? '',
      stock: this.itemForm.value.stock ?? 0,
    }
    this.dialog.nativeElement.close();

    // @ts-ignore
    this.newItemEvent.emit(temp);
    console.log(temp);
  }

  @Output() productadd = new EventEmitter<Product>();

  addProducttoCart(product: Product) {
    console.log(product);
    product.inventory--;
    this.productadd.emit(product);
  }

  updateProduct() {
    let temp: Product = {
      id: this.itemForm.value.id ?? 0,
      name: this.itemForm.value.name ?? '',
      cost: this.itemForm.value.cost ?? '',
      describtion: this.itemForm.value.describtion ?? '',
      inventory: this.itemForm.value.inventory ?? 0,
      image: this.itemForm.value.image ?? '',
      stock: this.itemForm.value.stock ?? 0,
    }
    const index = this.productlist.findIndex(item => item.id === temp.id);
    if (index !== -1) {
      this.productlist[index] = temp;
    }
    this.dialog.nativeElement.close();
  }
}
