import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import {Product} from "../../model/item.model";
import {FormControl, FormGroup, ReactiveFormsModule, Validators, ɵValue} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {CartService} from "../../app/service/cart.service";
import {DocumentData} from "@angular/fire/compat/firestore";
import {TuiAvatarModule, TuiBadgeModule} from "@taiga-ui/kit";
import {SharedModule} from "../../shared/shared.module";
import {Store} from "@ngrx/store";
import * as  CartAction from "../../ngrx/cart/cart.action"

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    TuiAvatarModule,
    SharedModule,
    TuiBadgeModule

  ],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductlistComponent  {
    productlist: Product[] = [];
  constructor(public router:Router,public cardServices:CartService,private store: Store) {
this.productlist=this.cardServices.productList;
  }
  readonly urls = [
    'https://avatars.githubusercontent.com/u/11832552',
    'https://avatars.githubusercontent.com/u/10106368',
    'https://avatars.githubusercontent.com/u/46284632',
  ];
 //  delete(item: DocumentData){
 //    console.log(item)
 //     this.cardServices.delete(item).then();
 // }
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

   updateProduct() {

   let temp : Product={
     id:this.itemForm.value.id || 0 ,
     image: this.itemForm.value.image || '',
     name: this.itemForm.value.name || '',
     cost:0,

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
    this.router.navigate(['home/detail',id])
}
  buy(product: DocumentData) {
    this.store.dispatch(
      CartAction.addProduct({ product: product as Product })
    );
  }

 }
