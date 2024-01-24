import { Routes } from '@angular/router';
import {CartComponent} from "../components/cart/cart.component";
import {HomeComponent} from "./page/home/home.component";

export const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'card',component: CartComponent
  }
];
