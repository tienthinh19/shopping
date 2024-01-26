import { Routes } from '@angular/router';
import {CartComponent} from "../components/cart/cart.component";
import {HomeComponent} from "./page/home/home.component";
import {AboutComponent} from "../components/about/about.component";
import {AdminProductComponent} from "./page/admin-product/admin-product.component";

export const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'card',component: CartComponent
  },
  {
    path:'card/:id',component:AboutComponent
  },
  {
    path:'admin_product',component: AdminProductComponent
  }

];
