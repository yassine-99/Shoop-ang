import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CaddyComponent} from './caddy/caddy.component';


const routes: Routes = [
  {path: 'products/:p1/:p2', component: ProductsComponent },
  {path: '', redirectTo: 'products/15/0', pathMatch: 'full' },
  {path: 'login', component: LoginComponent },
  {path: 'product-detail/:id', component: ProductDetailComponent },
  {path: 'Caddies', component: CaddyComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
