import { createAction, props } from '@ngrx/store';
import {Product} from "../../model/item.model";


export const addProduct = createAction(
  '[Cart Component] Add Product',
  props<{ product: Product }>()
);
export const removeProduct = createAction(
  '[Cart Component] Remove Product',
  props<{ id: string }>()
);
export const updateProduct = createAction(
  '[Cart Component] Update Product',
  props<{ product: Product }>()
);
export const clearCart = createAction('[Cart Component] Clear Cart');
