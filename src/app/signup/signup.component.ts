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
import { customer } from '../classes/customer_class';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  Email_id: string;
  Password: string;
  Repassword: string;
  flag:number=0;
  i:number=0;
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private cust_ser: CustomerService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
      repassword: ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } else {
      if (this.Password == this.Repassword) {
        this.cust_ser.GetAllCustomer().subscribe((data: any) => {
          console.log(data);
          console.log(data.length);
          for (this.i = 0; this.i < data.length; this.i++) {
            console.log(data[this.i].Email_id);
            if (this.Email_id == data[this.i].Email_id) {
              console.log("match");
              console.log(this.i);
              this.flag=1;
              break;
            }
          }
        });
        console.log(this.flag);
        if (this.flag==1) {
          console.log("in");
        alert('SUCCESS nthi!! :-)')

        }
        else
        {
          this.cust_ser.addCustomer(new customer(this.Email_id,this.Password,1)).subscribe(
            (data:any)=>{
                console.log(data);
                alert('SUCCESS!! :-)')
            }
          )
          //alert('SUCCESS!! :-)')

        }
    }

      else {
        alert("Password not same :-)");
      }
    }
  }
}
