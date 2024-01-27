import { Routes } from '@angular/router';
import {CartComponent} from "../components/cart/cart.component";
import {HomeComponent} from "./page/home/home.component";
import {AboutComponent} from "../components/about/about.component";
import {AdminProductComponent} from "./page/admin-product/admin-product.component";
import {LoginComponent} from "../components/login/login.component";

export const routes: Routes = [
  {path: 'login', loadChildren: () => import('../components/login/login.routes').then(mod => mod.LoginRoutingModule)},
  {
    path: 'home', loadChildren: () => import('../app/page/home/home.routes').then(mod => mod.HomeRoutingModule )
  }

];
