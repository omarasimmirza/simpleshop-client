import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: 'home/false/0', pathMatch: 'full' },
  { path: 'search/:signedIn/:userId/:search', component: SearchComponent },
  { path: 'details/:signedIn/:userId/:productid', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup/:signedIn/:userId', component: SignupComponent },
  { path: 'home/:signedIn/:userId', component: HomeComponent},
  { path: 'cart/:signedIn/:userId', component: CartComponent},
  { path: 'checkout/:signedIn/:userId', component: CheckoutComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
