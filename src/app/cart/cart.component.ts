import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../cart';
import { ShopService } from '../shop.service';
import { Product } from '../product';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public signedIn!: boolean;
  public userId!: number;
  public item: Cart[] = new Array();
  public products: Product[] = new Array();
  public total = 0;
  public incItem = new Cart(); //increment the quantity by 1

  constructor(private today: DatePipe, private router: Router, private a_router: ActivatedRoute, private shop: ShopService) { }

  ngOnInit(): void {
    this.signedIn = JSON.parse(this.a_router.snapshot.params.signedIn);
    this.userId = JSON.parse(this.a_router.snapshot.params.userId);
    console.log(this.userId);
    this.shop.getCartList(this.userId).subscribe(
      (response: Cart[]) => {
        this.item = response;
        console.log(this.item)
        for (let elements of this.item) {
          console.log(elements.date);
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

  details(productid: number): void {
    this.router.navigate(['details/' + this.signedIn + '/' + this.userId + '/' + productid]);
  }

  login(): void {
    this.router.navigate(['login']);
  }

  cart(): void {
      this.router.navigate(['cart/' + this.signedIn + '/' + this.userId]);
  }

  logout(): void {
    this.signedIn = false;
    this.userId = 0;
    this.router.navigate(['login']);
  }

  home(): void {
    this.router.navigate(['home/' + this.signedIn + '/' + this.userId]);
  }

  deleteItem(id: number): void {
    this.shop.deleteByItem(id, this.userId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  addToCart(id: number, prod: number): void {
    let date = new Date();
    this.incItem.date = this.today.transform(date, 'yyyy-MM-dd');
    this.incItem.id = 0;
    this.incItem.total = prod;
    this.incItem.product_id = id;
    this.incItem.user_id = this.userId;
    this.incItem.quantity = 1;
    this.shop.createCart(this.incItem).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  remove(id: number): void {
    this.shop.deleteByProduct(id, this.userId).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  removeAll(): void {
    this.shop.deleteByCart(this.userId).subscribe(
      (response) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    window.location.reload();
  }

  checkout(): void {
    this.router.navigate(['checkout/' + this.signedIn + '/' + this.userId]);
  }
}
