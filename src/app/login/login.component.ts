import { Component, OnInit } from '@angular/core';
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


export class login_customer {
  constructor(public Email_id: string, public Password: string) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email_id: string;
  Password: string;
  email_id1:string;
  flag: boolean = false;
  i: number = 0;
  j: number = 0;
  k: number = 0;

  customer_Email: string[] = [];
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cust_ser: CustomerService,
    private _router:Router

  ) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],

    });


  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit()
  {
    this.submitted = true;
    if(this.registerForm.invalid)
    {
      return;
    }
    else
    {
      this.cust_ser.log_in_customer(new login_customer(this.Email_id,this.Password)).subscribe(
        (data:any)=>
        {
          console.log(data);
          if(data.length==1)
          {
               this.email_id1=data[0].Email_id;
              localStorage.setItem('email_id',this.email_id1);
              alert('Success');
              this._router.navigate(['']);


          }
          else
          {
            alert('Email_id or Password Incorrect');
          }

        }
      )

      console.log(this.Email_id);
      console.log(this.Password);
    }
  }
}
