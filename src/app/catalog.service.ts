import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  public host: String="http://localhost:8081";
  constructor(private http: HttpClient) {

  }
  public getResource(url){
  return this.http.get(this.host+url);
  }
  public patchResource(url,data){
    return this.http.patch(url,data);
  }
  public productResource(url){
    return this.http.get(url);
  }

  uploadPhotoProduct(file: File,idProduct): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host + "/products/uploadPhoto/"+idProduct, formdata,{
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

}
