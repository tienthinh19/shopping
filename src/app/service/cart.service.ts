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
import * as path from "path";
@Injectable({
  providedIn: 'root'
})
export class CartService {



  productList:Product[] = [

  ]
  constructor(private firestore:Firestore) {
    // this.getAll().then();
    onSnapshot(collection(this.firestore, "product"), (collection) => {
      this.productList = [];
      collection.forEach((doc)=>{
        this.productList.push(doc.data() as Product);

      })
    });
  }

  async add(item:Product) {
    try {
      let id = Math.floor(Math.random() * 1000);
      const AddProduct= {
        id:id,
        cost:item['cost'],
        name:item['name'],
        describtion:item['describtion'],
        inventory:item['inventory'],
        image:item['image'],
        stock:item['stock']
      }
     const docinstance=collection(this.firestore,"product")
      await setDoc(doc(docinstance,id.toString()),AddProduct).then()




      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async update(item:Product){
    console.log(item)
    await setDoc(doc(this.firestore, 'product', item.id.toString()), item);



return item;
  }

  async delete(item:DocumentData){
    let tempId = (item as any)['id'];
    // console.log(tempId);
    deleteDoc(doc(this.firestore, 'product', tempId.toString()));

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
  getItemById(id: number ) {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const product = this.productList.find((item)=>item.id === id)
     console.log(product);
    // console.log(this.productList);
    return product ;

  }
  cart:Product[]=[];
  async addToCart(item: Product) {
    const docRef = doc(this.firestore, 'cart', item.id.toString());

    try {
      await setDoc(docRef, item);

      // Call the synchronous addToCart function after successful Firestore update
      this.addToLocalCart(item);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }

  addToLocalCart(product: Product) {
    if (product.inventory === 0) {
      alert('Out of stock');
      return;
    }

    let index = this.cart.findIndex((e) => e.id === product.id);

    if (index === -1) {
      product.stock = 1;
      product.inventory--;
      this.cart.push(product);
    } else {
      this.cart[index].stock++;
      product.inventory--;
    }

    alert('Add ' + product.name + ' to cart');
  }

  async deleteItemInCart(item: Product) {
    const docRef = doc(this.firestore, 'cart', item.id.toString());

    try {
      await deleteDoc(docRef);
      // alert(item.name + 'is deleted ' + ' from cart');
      // Call the synchronous delItemInCart function after successful Firestore deletion
      this.delItemInLocalCart(item.id);
    } catch (error) {
      console.error('Error deleting from cart:', error);
    }
  }

  delItemInLocalCart(id: number) {
    let index = this.cart.findIndex((e) => e.id === id);
    if (index !== -1) {
      this.cart.splice(index, 1);
    }
  }

  async getCartList() {
    onSnapshot(collection(this.firestore, 'cart'), (snapshot) => {
      this.cart = [];
      snapshot.forEach((doc) => {
        this.cart.push(doc.data() as Product);
        console.log(doc.id, '=>', doc.data());
        console.log(this.cart);
      });
    });
}
  decrease(product: Product) {
    let index = this.cart.findIndex((e) => e.id === product.id);
    if (index !== -1) {
      if (this.cart[index].inventory === 1) {
        this.cart.splice(index, 1);
        return;
      } else {
        this.cart[index].stock--;
        this.cart[index].inventory++;
        return;
      }
    }
  }

  //create function increase quantity if quantity == instock then quantity not increase
  increase(product: Product) {
    let index = this.cart.findIndex((e) => e.id === product.id);
    if (index !== -1) {
      this.cart[index].stock++;
      this.cart[index].inventory--;
    }
  }

  total = 0;
  //creat function payment to calculate all food quantity and price
  payment() {
    this.total = 0;
    this.cart.forEach((e) => {
      this.total += e.stock * parseInt(e.cost);
    });
    return this.total;
  }
}
