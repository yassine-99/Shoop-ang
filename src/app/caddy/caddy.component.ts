import { Component, OnInit } from '@angular/core';
import {StoreService} from '../Services/store.service';
import {Store} from '../Models/Store.model';
import {ItemProduct} from '../Models/item-product.model';

@Component({
  selector: 'app-caddy',
  templateUrl: './caddy.component.html',
  styleUrls: ['./caddy.component.css']
})
export class CaddyComponent implements OnInit {
  caddy:Store;




  constructor(public caddyService:StoreService) {
    console.log(this.caddy);
  }

  ngOnInit(): void {
  }

  onRemoveProductFromCaddy(p: ItemProduct) {
    this.caddyService.removeProduct(p.id);
  }


}
