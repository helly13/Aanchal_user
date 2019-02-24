import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SlideshowModule} from 'ng-simple-slideshow';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
<<<<<<< HEAD
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

=======
import { SliderModule } from 'angular-image-slider';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
>>>>>>> 0383a64dcd1696b383efb8ba3f0004367ea773ab
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
<<<<<<< HEAD
    HeaderComponent,
    FooterComponent,

=======
    ProductDetailsComponent,
    CartComponent
>>>>>>> 0383a64dcd1696b383efb8ba3f0004367ea773ab
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
    BrowserAnimationsModule
=======
    BrowserAnimationsModule,
    SliderModule,
    SlideshowModule
>>>>>>> 0383a64dcd1696b383efb8ba3f0004367ea773ab
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
