import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  constructor(private _router:Router,private _actroute:ActivatedRoute) { }
email_id:string;
  ngOnInit() {

    this._actroute.params.subscribe(
      (x: Params) => {
        this.email_id = x['id'];
      }
    );
    console.log(this.email_id);

  }

}
