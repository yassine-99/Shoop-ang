import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogService} from '../catalog.service';
import {AuthentificationService} from '../Services/authentification.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
    currentProduct;
    currentFileUpload: any;
    selectedFiles;
    editPhoto: boolean;
    currentTime: number;
    progress: number;
    mode: number=0;


  constructor( private router: Router,
               private route: ActivatedRoute,
               public catalService: CatalogService,
               public authService: AuthentificationService) { }

  ngOnInit(): void {
    let id=this.route.snapshot.params.id;
    this.catalService.productResource(this.catalService.host+"/products/"+id)
      .subscribe(data=>{
        this.currentProduct=data;
      },err=>{
        console.log(err);
      });
  }

  onEditProduct() {
    this.mode=1;
  }

  onEditPhoto(p) {
    this.currentProduct=p;
    this.editPhoto=true;
  }

  onSelectedFile( event) {
    this.selectedFiles=event.target.files;
  }

  uploadPhoto() {
    this.progress = 0;
    this.currentFileUpload = this.selectedFiles.item(0)
    this.catalService.uploadPhotoProduct(this.currentFileUpload, this.currentProduct.id).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(100 * event.loaded / event.total);
      } else if (event instanceof HttpResponse) {
        //console.log(this.router.url);
        //this.getProducts(this.currentRequest);
        //this.refreshUpdatedProduct();
        this.currentTime=Date.now();
        this.editPhoto=false;
      }
    },err=>{
      alert("Problème de chargement");
    })



    this.selectedFiles = undefined
  }



  onUpdateProduct(data) {
    let url=this.currentProduct._links.self.href;
    this.catalService.patchResource(url,data)
      .subscribe(d=>{
        this.currentProduct=d;
        this.mode=0;
      },err=>{
        console.log(err);
      })
  }

  getTS() {
    return this.currentTime;
  }

  onAddProductToCaddy(currentProduct: any) {

  }
}
