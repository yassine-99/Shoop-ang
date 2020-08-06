import { Component, OnInit } from '@angular/core';
import {CatalogService} from '../catalog.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {AuthentificationService} from '../Services/authentification.service';
import {Product} from '../Models/Product.model';
import {StoreService} from '../Services/store.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products;
   editPhoto: boolean;
   currentProduct: any;
   selectedFiles;
   progress: number;
   currentFileUpload: any;
   TimeStamp: number=0;
   title: string;

  constructor( public catService: CatalogService,
               private route: ActivatedRoute,
               private router: Router,
               public authService: AuthentificationService,
               public caddyService: StoreService) { }

  ngOnInit() {
    this.router.events.subscribe((val)=>{
      if (val instanceof NavigationEnd){
        let url = val.url;
        console.log(url);

        let p1=this.route.snapshot.params.p1;

        if(p1==15){
          this.title="Selection";
          this.getProducts("/products/selectProducts")
        }else if(p1==2) {

          let idcat = this.route.snapshot.params.p2;
          this.title="Produit de la categories  " + idcat;
          this.getProducts("/products/categories/" + idcat +"/products");
        }else if(p1==3) {
          this.title="Produits en promotion";

          this.getProducts("/products/ProductsPromo");
        }else if(p1==4) {
          this.title="Produits Disponible ";

          this.getProducts("/products/ProductsAvailable");
        }
      }
    });
    let p1=this.route.snapshot.params.p1;

    if(p1==15) {
      this.getProducts("/products/selectProducts")
    }

  }

  private getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data =>{
        this.products = data;
      },err =>{
          console.log(err);
    })
  }

  OnEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }
  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
         // this.getProducts("/products/selectProducts");
        this.TimeStamp=Date.now();
      }
    },err=>{
      alert("Probleme de chargement");
    })
    this.selectedFiles = undefined;
  }

  getTs() {
    return this.TimeStamp;
  }

  isAdmin() {
   return  this.authService.isAdmin();
  }

  onProductDetails(p: Product) {
    this.router.navigateByUrl("/product-detail/"+p.id);

  }

  onAddProductToCaddy(p:Product) {
    this.caddyService.addProduct(p);
  }
}
