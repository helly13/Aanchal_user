import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';

const routes: Routes = [

  {path:"",component:HomeComponent},
  {path:"product_details/:id",component:ProductDetailsComponent},
  {path:"cart",component:CartComponent},
  {path:"onsignup",component:SignupComponent},
  {path:"checkout",component:CheckoutComponent},
  {path:"login",component:LoginComponent},
  {path:"header",component:HeaderComponent},
  {path:"app",component:AppComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routing=RouterModule.forRoot(routes);
