import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  user=new User();
  errorMessage:String;

  constructor(private authenticationService:AuthenticationService,private router: Router) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(["/home"]);
    }
  }

  submitForm(f: NgForm){
    
    this.authenticationService.login(this.user).subscribe(result => {
      console.log("LOGIN "+result);
      
      if(result){
        this.router.navigate(["/home"]);
      }else{
        this.errorMessage="Authentication error occurred";
      } 
    }
    );
  }
}
