import {CartState} from "./cart.state";
import {createReducer, on} from "@ngrx/store";
import * as CartAction from './cart.action';
export const initialState: CartState = {
  cart: {
    createdAt: new Date().toString(),
    id: '1',
    productList: [],
    total: 0,

  }
};
export const cartReducer = createReducer(
  initialState,
  on(CartAction.addProduct, (state, action) => {
    console.log(action.product);
    //make product list unique
    let productList = [...state.cart.productList];
    let product = action.product;
    let isProductExist = false;
    productList.forEach((p) => {
      if (p.id === product.id) {
        isProductExist = true;
      }
    });
    if (!isProductExist) {
      productList.push({ ...product, stock: 1 });
    }
    return {
      ...state,
      cart: {
        ...state.cart,
        productList: productList,
        total: productList.reduce((total, product) => {
          return total + product.cost * product.stock;
        }, 0),
        createdAt: Date.now().toString(),
      },
    };
  }),
  on(CartAction.updateProduct, (state, action) => {
    let productList = [...state.cart.productList];
    let product = action.product;
    productList = productList.map((p) => {
      if (p.id === product.id) {
        return {
          ...p,
          stock: product.stock,
        };
      } else {
        return p;
      }
    });
    let total = 0;
    productList.forEach((product) => {
      total += product.cost * product.stock;
    });
    let newState = {
      ...state,
      cart: {
        ...state.cart,
        productList: productList,
        total: total,
        createdAt: Date.now().toString(),
      },
    };
    return newState;
  }),  on(CartAction.removeProduct, (state, action) => {
    let productList = [...state.cart.productList];
    productList = productList.filter((product) => {
      let temp = product.id;
      return temp.toString() === action.id;
    });
    return {
      ...state,
      cart: {
        ...state.cart,
        productList: productList,
        total: productList.reduce((total, product) => {
          return total + product.cost * product.stock;
        }, 0),
        createdAt: Date.now().toString(),
      },
    };
  }),
  on(CartAction.clearCart, (state) => {
    return {
      ...state,
      cart: {
        ...state.cart,
        productList: [],
        total: 0,
        createdAt: Date.now().toString(),
      },
    };
  })
);
