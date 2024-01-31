export interface Product{
  name:string,
  id:number,
  describtion:string,
  cost:number,
  inventory:number,
  image:string,
  stock:number,
}

export interface CartModel {
  id: string;
  // userId: string;
  total: number;
  createdAt: string;
  productList: Product[];
}

