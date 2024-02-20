import {ChangeDetectorRef, Component, ElementRef, inject, ViewChild} from '@angular/core';
import {TuiCheckboxModule, TuiInputModule} from "@taiga-ui/kit";
import {FormControl, FormGroup, ReactiveFormsModule, ɵValue} from "@angular/forms";
import {TuiDialogModule} from "@taiga-ui/core";
import {Product} from "../../../model/item.model";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {CartService} from "../../service/cart.service";
import {TuiButtonModule} from '@taiga-ui/core';
import {DocumentData} from "@angular/fire/compat/firestore";
import {SharedModule} from "../../../shared/shared.module";

@Component({
  selector: 'app-admin-product',
  standalone: true,
  imports: [
    TuiCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
  SharedModule
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
    cost : new FormControl(0),
    inventory: new FormControl(''),
    image: new FormControl(''),
  })
  addProduct() {
    let temp:Product= {
      id:0 ,
      image: this.itemForm.value.image || '',
      name: this.itemForm.value.name || '',
      cost:  this.itemForm.value.cost || 0,
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
  openEdit = false;

  showEditDialog(item:DocumentData): void {
    this.itemUpdateForm.patchValue(item);
    this.openEdit = true;
  }

  itemUpdateForm= new FormGroup({
    id: new FormControl(0),
    name : new FormControl('' ),
    describtion : new FormControl('' ),
    cost : new FormControl(0 ),
    inventory: new FormControl(0),
    image: new FormControl('' ),
    stock: new FormControl(0  ),
  })
  //@Output() newItemEvent = new EventEmitter<Product>();

  @ViewChild('updateDialog', { static: true })
  updatedialog!: ElementRef<HTMLDialogElement>;
  updatecdr = inject(ChangeDetectorRef);

  openDialogUpdate(item: DocumentData) {
    selectedItem: item;
    this.itemUpdateForm.patchValue(
     item
    );
    this.dialog.nativeElement.showModal();
    this.updatecdr.detectChanges();
  }
  closeDialogUpdate() {
    this.dialog.nativeElement.close();
    this.updatecdr.detectChanges();
  }

  updateProduct() {
    let temp : Product={
      id:this.itemUpdateForm.value.id || 0 ,
      image: this.itemUpdateForm.value.image || '',
      name: this.itemUpdateForm.value.name || '',
      cost:  this.itemUpdateForm.value.cost || 0,
      inventory:this.itemUpdateForm.value.inventory || 0 ,
      describtion: this.itemUpdateForm.value.describtion || '',
      stock: this.itemUpdateForm.value.stock || 0 ,
    };
    console.log(temp);
    this.cardServices.update(temp).then();
    this.itemUpdateForm.reset();
    this.openEdit = false;
  }
  delete(item: DocumentData){
    console.log(item)
    this.cardServices.delete(item).then();
  }
}
