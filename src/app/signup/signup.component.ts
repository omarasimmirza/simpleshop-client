import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ShopService } from '../shop.service';
import { User } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  @ViewChild('password') inputPass!: { nativeElement: { value: string; }; };
  @ViewChild('confirmPassword') inputConfirmPass!: { nativeElement: { value: string; }; };
  public userData = new User();

  constructor(private router: Router, private shop: ShopService) { }

  home(): void {
    this.router.navigate(['home/' + false + '/' + 0]);
  }

  save(signupForm: NgForm): void {
    if (signupForm.value.confirmPassword != signupForm.value.password) {
      alert('Your passwords do not match! Please try again');
      this.inputPass.nativeElement.value = '';
      this.inputConfirmPass.nativeElement.value = '';
    }
    else {
      this.userData.city = signupForm.value.city;
      this.userData.email = signupForm.value.email;
      this.userData.first_name = signupForm.value.firstName;
      this.userData.last_name = signupForm.value.lastName;
      this.userData.password = signupForm.value.password;
      this.userData.state = signupForm.value.state;
      this.userData.id = 0;
      this.userData.street_address = signupForm.value.streetAddress;
      this.userData.username = signupForm.value.username;
      this.userData.zipcode = +signupForm.value.zipcode;
      this.shop.createUser(this.userData).subscribe(
        (response) => {
          console.log('it worked! ' + response);
          alert('Account created! Now please go ahead and login');
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
      this.router.navigate(['login'])
    }
  }
}
