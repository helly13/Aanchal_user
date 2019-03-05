import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
MatListModule,
MatCardModule,
  MatRippleModule,
    MatFormFieldControl,
    MatIconModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SliderModule } from 'angular-image-slider';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyaccComponent } from './myacc/myacc.component';
import { AddressComponent } from './address/address.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    SignupComponent,
    ProductDetailsComponent,
    CartComponent,
    CheckoutComponent,
   HeaderComponent,
    FooterComponent,
    ProductDetailsComponent,

    LoginComponent,

    MyaccountComponent,

    MyaccComponent,

    AddressComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SliderModule,
    SlideshowModule

   ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
