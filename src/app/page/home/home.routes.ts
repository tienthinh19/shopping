
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home.component";
import {CartComponent} from "../../../components/cart/cart.component";
import {AboutComponent} from "../../../components/about/about.component";
import {AdminProductComponent} from "../admin-product/admin-product.component";
import {ProductlistComponent} from "../../../components/productlist/productlist.component";


const routes: Routes = [
  {
    path: '',component:HomeComponent,
    children: [
      {
        path: 'productlist',
        component: ProductlistComponent
      },
      {
        path: 'admin',
        component: AdminProductComponent
      },
      {
        path:'cart',component: CartComponent
      },
      {
        path:'',
        redirectTo: 'productlist',
        pathMatch: "full"
      }
    ]
  },


  {
    path:'card/:id',component:AboutComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
