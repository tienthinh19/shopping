import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER } from "@taiga-ui/core";
import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavbarComponent} from "../components/navbar/navbar.component";
import {ProductlistComponent} from "../components/productlist/productlist.component";
import { Product } from '../model/item.model';
import {CartComponent} from "../components/cart/cart.component";
import {CartService} from "./service/cart.service";
import {AuthService} from "./service/auth/auth.service";
import {getAuth, onAuthStateChanged} from "@angular/fire/auth";
import {CouterComponent} from "../components/couter/couter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ProductlistComponent, CartComponent, TuiRootModule, TuiDialogModule, TuiAlertModule,
  CouterComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'shopping';
constructor(public cardServices:CartService, private authService: AuthService, private router: Router) {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      this.router.navigate(['home']).then();
      const uid = user.uid;
      console.log("Login Success")
      // ...
    } else {
      this.router.navigate(['login']).then()
      console.log("Sign Out")
    }
  });
}



}
