import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart';
import { ShopService } from '../shop.service';
import { Product } from '../product';
import { Email } from '../email';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public signedIn!: boolean;
  public userId!: number;
  public items: Cart[] = new Array();
  public products: Product[] = new Array();
  public total = 0;
  public send: Email[] = new Array();
  public data = new Email();

  constructor(private router: Router, private a_router: ActivatedRoute, private shop: ShopService) { }

  ngOnInit(): void {
    this.signedIn = JSON.parse(this.a_router.snapshot.params.signedIn);
    this.userId = JSON.parse(this.a_router.snapshot.params.userId);
    this.shop.getCartList(this.userId).subscribe(
      (response: Cart[]) => {
        this.items = response;
        for (let elements of this.items) {
          this.shop.getProductDetail(elements.product_id).subscribe(
            (response: Product) => {
              response.items = elements.quantity;
              this.products.push(response);
            },
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
        }
        this.shop.getTotal(this.userId).subscribe(
          (response) => {
            this.total = response;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
          }
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  logout(): void {
    this.signedIn = false;
    this.userId = 0;
    this.router.navigate(['login']);
  }

  home(): void {
    this.router.navigate(['home/' + this.signedIn + '/' + this.userId]);
  }

  cart(): void {
    this.router.navigate(['cart/' + this.signedIn + '/' + this.userId]);
  }

  email(checkout: NgForm): void {
    for (let product of this.products) {
      this.data.cardNum = checkout.value.cardNum;
      this.data.prodName = product.name;
      this.data.prodPrice = product.price
      this.data.total = this.total;
      this.data.prodQuantity = product.items;
      this.data.id = this.userId;
      this.send.push(this.data);
    }
    this.shop.sendEmail(this.send).subscribe(
      (response) => {
        alert('Check your email for confirmation!');
        this.home();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
