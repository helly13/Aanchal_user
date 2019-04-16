import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
MatListModule,
MatCardModule,
  MatRippleModule,
    MatFormFieldControl,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule
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
import { AngularPaginatorModule } from 'angular-paginator';

import { LoginComponent } from './login/login.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyaccComponent } from './myacc/myacc.component';
import { AddressComponent } from './address/address.component';
import { PastOrderComponent } from './past-order/past-order.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { Home1Component } from './home1/home1.component';
import { TmphellComponent } from './tmphell/tmphell.component';
import { NgImageSliderComponent } from "ng-image-slider";


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

    AddressComponent,
    PastOrderComponent,
    WishlistComponent,
    PastOrderComponent,
    CategoryComponent,
    ContactComponent,
    SearchComponent,
    Home1Component,
    TmphellComponent

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
    AngularPaginatorModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    SliderModule,
    SlideshowModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
  

   ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
