import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Authenticate } from '../authenticate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Authenticate = new Authenticate();

  public signedIn = false;
  public userId!: number;

  constructor(
    private shop: ShopService,
    private router: Router,
  ) {}

  ngOnInit() {}

  loginCheck(signinForm: NgForm): void {
    this.user = signinForm.value;
    this.shop.login(this.user).subscribe(
      (response) => {
        console.log(response);
        signinForm.reset();
        this.shop.getUserId(this.user.username).subscribe(
          (response: number) => {
            this.userId = response;
            this.signedIn = true;
            this.router.navigate(['home/' + this.signedIn + '/' + this.userId]);
          },
          (error: HttpErrorResponse) => {
            alert('Something went wrong oops!');
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        alert('Username or password entered is not correct!');
        console.log(error);
        signinForm.reset();
      }
    );
  }

  signup() {
    this.router.navigate(['signup/' + this.signedIn + '/' + 0]);
  }
}
