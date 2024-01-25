import { Routes } from '@angular/router';
import {CartComponent} from "../components/cart/cart.component";
import {HomeComponent} from "./page/home/home.component";
import {AboutComponent} from "../components/about/about.component";

export const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'card',component: CartComponent
  },
  {
    path:'about',component:AboutComponent
  }
];
