import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from '../product';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public signedIn!: boolean;
  public userId!: number;
  public search!: string;
  public products: Product[] = new Array();

  constructor(private router: Router, private a_router: ActivatedRoute, private shop: ShopService) { }

  ngOnInit(): void {
    this.signedIn = JSON.parse(this.a_router.snapshot.params.signedIn);
    this.userId = JSON.parse(this.a_router.snapshot.params.userId);
    console.log(this.userId);
    this.search = this.a_router.snapshot.params.search;
    this.shop.search(this.search).subscribe(
      (response: Product[]) => {
        this.products = response;
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

  details(productid: number): void {
    this.router.navigate(['details/' + this.signedIn + '/' + this.userId + '/' + productid]);
  }

  searchForProd(event: Event, searchWord: string): void {
    console.log(event);
    this.shop.search(searchWord).subscribe(
      (response: Product[]) => {
        this.products = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
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
