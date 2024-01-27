import { Component } from '@angular/core';
import {AuthService} from "../../app/service/auth/auth.service";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'

})
export class LoginComponent {

  constructor(private auth: AuthService) {
  }

  signWithGoogle(){
    this.auth.signWithGoogle();
  }
}
