
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import {HomeComponent} from "../../app/page/home/home.component";
import {CartComponent} from "../cart/cart.component";
import {AboutComponent} from "../about/about.component";
import {AdminProductComponent} from "../../app/page/admin-product/admin-product.component";

const routes : Routes = [
  {
    path: '',
    component: LoginComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
