import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import * as CounteAction from "../../ngrx/couter/counter.actions";
import { SharedModule } from '../../shared/shared.module';
@Component({
  selector: 'app-couter',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './couter.component.html',
  styleUrl: './couter.component.scss'
})
export class CouterComponent {
  count$!: Observable<number>;
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }

  increment() {
    this.store.dispatch(CounteAction.increment());
  }

  decrement() {
    this.store.dispatch(CounteAction.decrement());
  }

  reset() {
    this.store.dispatch(CounteAction.reset());
  }
}
