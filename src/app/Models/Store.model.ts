import {ItemProduct} from './item-product.model';
import {Client} from './client.model';

export class Store{
  constructor(name:string){
    this.name=name;
  }
  public name:string;
   public items:Map<any,ItemProduct>= new Map();
  public client:Client;


}
