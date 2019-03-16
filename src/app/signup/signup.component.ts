import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
  FormBuilder
} from "@angular/forms";
import { CustomerService } from "../customer.service";
import { customer } from "../classes/customer_class";
import { Router } from '@angular/router';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  Email_id: string;
  Password: string;
  Repassword: string;
  flag: boolean = false;
  i: number = 0;
  j: number = 0;
  k: number = 0;
  Name:string;
  customer_Email: string[] = [];
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private cust_ser: CustomerService,
    private _router:Router
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repassword: ["", [Validators.required, Validators.minLength(8)]],
      text:["",[Validators.required,Validators.minLength(3)]]
    });

    this.cust_ser.GetAllCustomer().subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < data.length; this.i++) {
        this.k = this.k + 1;
        this.customer_Email.push(data[this.i].Email_id);
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.flag=false;
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      if (this.Password == this.Repassword) {
        console.log(this.customer_Email);
        console.log(this.customer_Email.length);
        for (this.j = 0; this.j < this.customer_Email.length; this.j++) {
          if (this.Email_id == this.customer_Email[this.j]) {
            alert("Email id already exits");
            this.flag = true;
            break;
          }
        }
        if (!this.flag) {
          this.cust_ser
            .addCustomer(new customer(this.Email_id, this.Password,this.Name, 1))
            .subscribe((data: any) => {
              console.log(data);
              //alert("SUCCESS!! :-)");
              this._router.navigate(['login']);
              this.ngOnInit();
            });
        }
      } else {
        alert("Password must be same");
      }
    }
  }
}
