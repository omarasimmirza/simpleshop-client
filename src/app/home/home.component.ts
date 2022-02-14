import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { Product } from '../product';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private shop: ShopService, private a_router: ActivatedRoute, private router: Router) {}

  public products: Product[] = new Array();
  public signedIn!: boolean;
  public userId!: number;

  ngOnInit(): void {
    this.signedIn = JSON.parse(this.a_router.snapshot.params.signedIn);
    this.userId = JSON.parse(this.a_router.snapshot.params.userId);
    console.log(this.userId);
    this.shop.getProducts().subscribe(
      (response: Product[]) => {
        this.products = response;
        console.log(this.products);
      },
      (error: HttpErrorResponse) => {
        alert('Error displaying products!');
        console.log(error);
      }
    );
  }

  details(productid: number): void {
    if (this.signedIn)
      this.router.navigate(['details/' + this.signedIn + '/' + this.userId + '/' + productid]);
    else
      alert('Please login first');
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

  search(event: Event, search: string): void {
    console.log(event);
    this.router.navigate(['search/' + this.signedIn + '/' + this.userId + '/' + search]);
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
