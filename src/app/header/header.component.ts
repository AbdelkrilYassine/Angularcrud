import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isUserLoggedIn:boolean;

  constructor(private authenticationService:AuthenticationService,private router: Router) {
    this.authenticationService.userState.subscribe(result=>{
      this.isUserLoggedIn=result;
    });
   }

   logout(){
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
   }

  ngOnInit() {

  }

}
