import {ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {Product} from "../../model/item.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators, ɵValue} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../app/service/cart.service";
import {DocumentData} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss'
})
export class ProductlistComponent  {
//   @Input() productlist: Product[] = [];
  constructor(public router:Router,public cardServices:CartService) {

  }

//
//   navigateAbout(item:Product){
//     this.router.navigate(['about']).then();
//     this.cardServices.getDetail(item);
//   }
//   @Output() newItemEvent = new EventEmitter<number>();
//
  delete(item: DocumentData){
    console.log(item)
     this.cardServices.delete(item).then();
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

  openDialog(item: DocumentData) {
    selectedItem: item;
    this.itemForm.patchValue(
      {
id:item['id'],
        name: item['name'],
        describtion: item['describtion'],
        cost: item['cost'],
        inventory: item['inventory'],
        image: item['image'],
        stock: item['stock'],
      }
    );
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }
//
//   addProduct() {
//     let temp: {
//       id: number;
//       name: string;
//       describtion: string;
//       cost: string;
//       inventory: number;
//       image: string;
//       stock: number;
//
//     }
//     temp = {
//       id: this.itemForm.value.id ?? 0,
//       name: this.itemForm.value.name ?? '',
//       describtion: this.itemForm.value.describtion ?? '',
//       cost: this.itemForm.value.cost ?? '',
//       inventory: this.itemForm.value.inventory ?? 0,
//       image: this.itemForm.value.image ?? '',
//       stock: this.itemForm.value.stock ?? 0,
//     }
//     this.dialog.nativeElement.close();
//
//     // @ts-ignore
//     this.newItemEvent.emit(temp);
//     console.log(temp);
//   }
//
//   @Output() productadd = new EventEmitter<Product>();
//
//   addProducttoCart(product: Product) {
//     product.inventory--;
//     this.productadd.emit(product);
//   }
//

   updateProduct() {

   let temp : Product={
     id:this.itemForm.value.id || 0 ,
     image: this.itemForm.value.image || '',
     name: this.itemForm.value.name || '',
     cost: this.itemForm.value.cost || '',

     inventory:this.itemForm.value.inventory || 0 ,
     describtion: this.itemForm.value.describtion || '',
     stock: this.itemForm.value.stock || 0 ,
   };
  const index=this.cardServices.productList.findIndex((item)=> item['id']===temp.id);
  if (index != -1){
    this.cardServices.productList[index]=temp;

  }
  this.updateItem(temp);
  this.closeDialog();
  }
updateItem(item:Product){
    this.cardServices.update(item);
}
getProductById(id:number){
    console.log(id);
    this.cardServices.getItemById(id)
}
 }
