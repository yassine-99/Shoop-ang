import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../Services/authentification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthentificationService,
              private router: Router) { }

  ngOnInit(): void {
  }

  OnLogin(DataForm: any) {
    this.authService.login(DataForm.username,DataForm.password);
    if(this.authService.isAuthenticated){
      this.authService.saveAuthentificatedUser();
      this.router.navigateByUrl('');
    }
  }
}
