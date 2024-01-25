import { Injectable } from '@angular/core';
import {Product} from "../../model/item.model";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc
} from "@angular/fire/firestore";
import {DocumentData} from "@angular/fire/compat/firestore";
@Injectable({
  providedIn: 'root'
})
export class CartService {



  productList: DocumentData[] = [
   
  ]
  constructor(private firestore:Firestore) {
    // this.getAll().then();
    onSnapshot(collection(this.firestore, "product"), (collection) => {
      this.productList = [];
      collection.forEach((doc)=>{
        this.productList.push(doc.data() as any);
      })
    });
  }

  async add(item:Product) {
    try {
      let id = Math.floor(Math.random() * 1000).toString();
      const docRef = await setDoc(doc(this.firestore, "product",id),

        item
      ,);
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async update(item:DocumentData){
    console.log(item)

    await updateDoc(doc(this.firestore, 'product', item['id']), {
      item,

    })
return item;
  }

  async delete(item:DocumentData){
    let tempId = (item as any)['id'];
    // console.log(tempId);
    deleteDoc(doc(this.firestore, 'product', tempId));

     // await deleteDoc(doc(this.firestore, "product", item['id']));

  }




// addCartList: Product[] = [];
  // addToCart(itemCart: Product) {
  //   let index = this.addCartList.findIndex(item => item.id === itemCart.id);
  //   if (index !== -1) {
  //     this.addCartList[index].stock++;
  //     return;
  //   }
  //   itemCart.stock = 1;
  //   this.addCartList.push(itemCart);
  // }
  //
  // addItem(newItem: Product) {
  //   this.productList.push(newItem);
  // }
  //
  // delete(value: number) {
  //   const index = this.productList.findIndex(item => item.id === value);
  //   if (index !== -1) {
  //     this.productList.splice(index, 1);
  //   }
  // }
  // detailProduct:Product[] = []
  // getDetail(item:Product){
  //   let index= this.detailProduct.findIndex(detail => detail.id === item.id);
  //   this.productList.push(item)
  //   console.log(item)
  // }

}
