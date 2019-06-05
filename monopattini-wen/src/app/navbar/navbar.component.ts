import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:string;
  constructor(public http: HttpClient,private router: Router) {
      this.user = localStorage.getItem('username');

  }

  ngOnInit() {}
    logout():void{
    this.user="";
    console.log("logout" + this.user)
    this.router.navigate(['/login']);
  }

}
