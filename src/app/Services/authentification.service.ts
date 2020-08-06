import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  public isAuthenticated: boolean;
  public userAuthenticated;
  public token: string;
  private users=[
    {username:'admin' , password:'1234', roles:['ADMIN','USER']},
    {username:'user1' , password:'1234', roles:['USER']},
    {username:'user2' , password:'1234', roles:['USER']}
  ]


  constructor() {

  }

  login(username:string, password:string){
    let user;
    this.users.forEach(u=>{
      if(u.username == username && u.password == password){
        user=u;
        this.token= btoa(JSON.stringify({username: u.username,roles: u.roles})) ;
      }
    });
    if(user){
      this.isAuthenticated = true;
      this.userAuthenticated = user;
      localStorage.setItem("authenticatedUser",JSON.stringify(this.userAuthenticated));
    }else {
      this.isAuthenticated = false;
    }
  }
  Authenticated(){
    console.log(this.isAuthenticated);
    return this.isAuthenticated;
  }
  public isAdmin(){
    if(this.userAuthenticated){
      if (this.userAuthenticated.roles.indexOf('ADMIN') >-1 )

        return true;
    }
    return false;

  }
  public saveAuthentificatedUser(){
    if (this.userAuthenticated){
      localStorage.setItem('authToken', this.token);
    }
  }
  public LoadAuthenticatedUserFromLocalStorag(){
    let t = localStorage.getItem('authToken');
    if(t){

      let user = JSON.parse(atob(t));
      console.log(user);
      this.userAuthenticated = {username: user.username,roles: user.roles};
      console.log(this.userAuthenticated);
      this.isAuthenticated=true;
      this.token=t;
    }
  }

  public RemoveTokenFormLocalStorage(){
    localStorage.removeItem('authToken');
    this.isAuthenticated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
  }

}
