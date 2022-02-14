import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { timer } from 'rxjs';
import { ShopService } from '../shop.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Cart } from '../cart';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  public product = new Product();
  public images!: string[];
  public imgUrl!: string;
  public i = 0;
  public item = new Cart();
  public signedIn!: boolean;
  public userId!: number;

  constructor(
    private shop: ShopService,
    private router: Router,
    private a_router: ActivatedRoute,
    private today: DatePipe
  ) {}

  ngOnInit(): void {
    let p_id = this.a_router.snapshot.params.productid;
    this.signedIn = this.a_router.snapshot.params.signedIn;
    this.userId = JSON.parse(this.a_router.snapshot.params.userId);
    console.log(p_id);
    console.log(this.signedIn);
    this.shop.getProductDetail(p_id).subscribe((response: Product) => {
      console.log(response);
      this.product = response;
      console.log(this.product.id);
      this.images = [];
      this.shop.getImg(this.product.id).subscribe(
        (response: string[]) => {
          console.log(this.images + 'hey');
          this.images = response;
          this.imgUrl = this.images[0];
        },
        (error: HttpErrorResponse) => {
          alert('Oops, something went wrong!');
          console.log(error);
        }
      );
    });
  }

  prev(): void {
    if (this.i <= 0) {
      this.i = this.images.length;
    }
    this.i--;
    this.imgUrl = this.images[this.i];
  }

  next(): void {
    if (this.i >= this.images.length - 1) {
      this.i = -1;
    }
    this.i++;
    this.imgUrl = this.images[this.i];
  }

  search(event: Event, search: string): void {
    console.log(event);
    this.router.navigate(['search/' + this.signedIn + '/' + this.userId + '/' + search]);
  }

  addToCart(): void {
    let date = new Date();
    this.item.date = this.today.transform(date, 'yyyy-MM-dd');
    this.item.product_id = this.product.id;
    this.item.id = 0;
    this.item.total = this.product.price;
    this.item.quantity = 1;
    this.item.user_id = this.userId;
    this.shop.createCart(this.item).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        alert('Something went wrong!');
        console.log(error);
      }
    );
    window.alert('Added to cart');
    console.log('created cart: ' + this.item.date + ' ' + this.item.total + ' ' + this.item.user_id);
  }

  cart(): void {
    this.router.navigate(['cart/' + this.signedIn + '/' + this.userId]);
  }

  home(): void {
    this.router.navigate(['home/' + this.signedIn + '/' + this.userId]);
  }

  logout(): void {
    this.signedIn = false;
    this.userId = 0;
    this.router.navigate(['login']);
  }

  toggleSearch(): void {
    var x = document.getElementById("input");
    if (x!.style.display == "none") {
      x!.style.display = "flex";
      x!.style.width = "20rem";
    }
    else {
      x!.style.width = "0px";
      timer(200).subscribe(c => {
        x!.style.display = "none";
      })
    }
  }
}
