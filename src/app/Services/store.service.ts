import { Injectable } from '@angular/core';
import {Store} from '../Models/Store.model';
import {Product} from '../Models/Product.model';
import {ItemProduct} from '../Models/item-product.model';
import {AuthentificationService} from './authentification.service';
import {Price} from '../Models/Price.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public currentCaddyName:string="Caddy1";
  public listCaddies:Array<{num:number,name:string}>=[{num:1,name:'Caddy1'}];
  public caddies:Map<string,Store>=new Map();
  public items:Map<number,ItemProduct>=new Map();
  constructor(private authService:AuthentificationService) {
    if(this.authService.Authenticated()) {
      this.loadCaddyFromLocalStorage();
    }
    else{
      this.caddies[this.currentCaddyName]=new Store(this.currentCaddyName);
    }
  }
      /*
  public addProductToCaddy(product: Product): void{
    let caddy=this.caddies[this.currentCaddyName];
    let productItem=this.items[product.id];
    if(productItem){
      productItem.quantity+= product.quantity;
    }else {
      productItem= new ItemProduct();
      productItem.price=product.price;
      productItem.quantity=product.quantity;
      productItem.product=product;
      this.items.set(product.id,productItem);
      console.log('kk'+this.items.set(product.id,productItem));
    }

  }         */

  public addProductToCaddy(id:number,name:string,price:number,quantity:number):void{
    let caddy=this.caddies[this.currentCaddyName];
    console.log(this.caddies[this.currentCaddyName]);
    let item=caddy.items[id];
    if(item===undefined) {
      let item=new ItemProduct();
      item.id=id;
      item.name=name;
      item.price=price;
      item.quantity=quantity;
      caddy.items[id]=item;
    }
    else{
      item.quantity+=quantity;
    }
  }
  public addProduct(product:Product){
   // this.addProductToCaddy(product.id,product.name,product.price.value,product.quantity);
    this.addProductToCaddy(product.id,product.name,product.quantity,product.price.value);
    this.saveCaddy();
  }
  getCurrentCaddy():Store{
    return this.caddies.get(this.currentCaddyName);
  }
  public returnItems(){
   let caddy=this.caddies[this.currentCaddyName];
   return caddy.items;
  }
  public getTotal(): number {
    let caddy=this.caddies[this.currentCaddyName];
    let total=0;
    let items: IterableIterator<ItemProduct> = caddy.items.values();
    for(let pi of items){
      total+= pi.price*pi.quantity;
    }
    return total;
  }

  removeProduct(id: number):void {
    console.log(this.caddies[this.currentCaddyName]);
    let caddy=this.caddies[this.currentCaddyName];
    delete caddy.items[id];
    this.saveCaddy();
    console.log('dazt aussi');
  }

  saveCaddy() {

    let caddy=this.caddies[this.currentCaddyName];
    //localStorage.setItem("yassine",JSON.stringify(this.items)) ;
    //console.log(localStorage.setItem("yassine",JSON.stringify(this.items)) );
    localStorage.setItem("myCaddy_"+this.authService.userAuthenticated.username + "_" + this.currentCaddyName,JSON.stringify(caddy));
    console.log('daztt');
    console.log(this.authService.userAuthenticated.username + "_" + this.currentCaddyName,JSON.stringify(caddy))
  }

  private loadCaddyFromLocalStorage() {
    let myCaddiesList=localStorage.getItem("ListCaddies_"+this.authService.userAuthenticated.username);
    this.listCaddies=myCaddiesList==undefined?[{num:1,name:'Caddy1'}]:JSON.parse(myCaddiesList);
    this.listCaddies.forEach(c=>{
      let cad=localStorage.getItem("myCaddy_"+this.authService.userAuthenticated.username+"_"+c.name);
      this.caddies[c.name]=cad==undefined?new Store(c.name):JSON.parse(cad);
       console.log('cc');
    })
  }

  getSize() {

      let caddy=this.caddies[this.currentCaddyName];
      return Object.keys(caddy.items).length;

  }
}
