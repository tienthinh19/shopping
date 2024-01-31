import { createReducer, on } from "@ngrx/store";
import { ProductState } from "./product.state";
import * as ProductAction from "../product/product.actions";
export const initialState: ProductState = {
    productList: []
    };
export const productReducer = createReducer(
    initialState,
    on(ProductAction.addProduct, (state, action) => {
        
        let newState = {
            ...state,
           
            };
            return newState;
    }),
    on(ProductAction.removeProduct, (state, action) => {
            
            let newState = {
                ...state,
            
                };
                return newState;
        }),
    on (ProductAction.updateProduct, (state, action) => {
        let newState = {
            ...state,
            
            };
            return newState;
    }
    ),
    on (ProductAction.getProduct, (state, action) => {
        let newState = {
            ...state,
            
            };
            return newState;
    }
    )
);