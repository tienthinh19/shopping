import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductlistComponent} from "./productlist.component";
import {AboutComponent} from "../about/about.component";
//


const routes: Routes = [
  {
    path: '', component: ProductlistComponent,
    children: [


      {
        path: 'detail/:id', component: AboutComponent
      },

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProduclistRoutes {

}
