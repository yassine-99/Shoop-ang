import {Component, OnInit} from '@angular/core';
import {CatalogService} from './catalog.service';
import {Router} from '@angular/router';
import {AuthentificationService} from './Services/authentification.service';
import {StoreService} from './Services/store.service';

@Component({

  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public categories;
  public currentCategorie;

  constructor(private catalogService: CatalogService,
              private router: Router,
              private authService: AuthentificationService,
              public caddyService: StoreService) {

  }

  ngOnInit() {
    this.authService.LoadAuthenticatedUserFromLocalStorag();
    this.getCategories();

  }

  private getCategories() {
      this.catalogService.getResource("/categories")
        .subscribe(data=>{
          this.categories = data;
        },err=>{
          console.log(err);
        })
  }

  getProductsByCat(c) {
    this.currentCategorie=c;
      this.router.navigateByUrl("/products/2/"+ c.id);
  }

  activeProduct() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/15/0')
  }

  onProductsPromo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/3/0')
  }

  onProductDispo() {
    this.currentCategorie=undefined;
    this.router.navigateByUrl('/products/4/0')
  }

  Onlogin() {
    this.authService.RemoveTokenFormLocalStorage();
    this.router.navigateByUrl('/login');
  }
}
