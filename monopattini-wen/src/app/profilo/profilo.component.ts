import { Component, OnInit } from '@angular/core';
import { Profilo } from './profilo.model';
import { NoleggioInfo } from './noleggioInfo.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'app-profilo',
  templateUrl: './profilo.component.html',
  styleUrls: ['./profilo.component.css']
})
export class ProfiloComponent implements OnInit {
  user:string;
  data: Object;
  o: Observable<Object>;
  obs: Observable<Profilo[]>;
  wen: Array<Profilo> = new Array();
  visible: boolean = true;
  err: String = "";
  ok: String = "";
  id:string;
  constructor(public http: HttpClient,private router: Router) {
    this.user = localStorage.getItem('username');
    this.id = localStorage.getItem('idUser');
    this.onProfilo();
   }

  ngOnInit() {
  }

  onProfilo() {
      let dati: Profilo = new Profilo();
      dati.id = this.id;
      console.log(dati);
      this.wen.push(dati);
      this.Profilo(dati);
  }

  Profilo(dati: Profilo): void {
    this.http.get<Object>('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/info/' + dati.id)
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
  }

}
