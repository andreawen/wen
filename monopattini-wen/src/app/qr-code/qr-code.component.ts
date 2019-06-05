import { Component, OnInit, Input } from '@angular/core';
import { Noleggio } from './noleggio.model';
import { Guasto } from './guasto.model';
import {FormsModule} from '@angular/forms';
import { Monopattino } from '../map/monopattino.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { log } from 'util';

interface Alert {
  type: string;
  message: string;
}

const ALERTS: Alert[] = [{
    type: 'success',
    message: 'Segnalazione effettuata correttamente',
  }
];

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {
  inizio: boolean = true;
  fine: boolean = false;
  data: Object;
  o: Observable<Object>;
  nole: Observable<Noleggio[]>;
  noleGio: Array<Noleggio> = new Array();
  gua: Observable<Guasto[]>;
  guaSto: Array<Guasto> = new Array();
  user:string;
  userId:string;
  bottone:string;
  dataInizio: string;
  oraInizio:string;
  oraGuasto:string;
  dataGuasto:string;
  a:any;
  inizioNol=[];
  problema=[];
  @Input() id:string;
  @Input() stato:string;
  text: string ;
  mono: Observable<Monopattino[]>;
  monoPa: Monopattino[] = [];
  stato2:string;
  aa:boolean=true;
  bb:boolean=false;
  alert:boolean=false;
  alert2:boolean=false;
  guasto2:string="";
  alerts: Alert[];
  err:string;
  e:boolean=false;
  f:boolean=false;
  time: number = 0;
  interval;

  selected: string="";

  options = [
    { name: "Difetto del monopattino", value: 1 },
    { name: "Problemi con il noleggio", value: 2 },
    { name: "Altro", value: 3 }
  ]

  constructor(public http: HttpClient) {
      this.user = localStorage.getItem('username');
      this.userId = localStorage.getItem('idUser');
      this.reset();


  }
  ngOnInit() {

  }

  reset() {
    this.alerts = Array.from(ALERTS);
  }

  closeA(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  open() {
     this.aa=false
     this.bb=true
     this.alert=false
  }
  close() {
     this.bb=false
     this.aa=true
     this.selected="";
     this.e=false;
  }

  changeStato():void{
      if(this.stato="disponibile"){
        this.stato = 'non disponibile';
      }
  }

  changeStato2():void{
     if(this.stato="non disponibile"){
        this.stato = 'disponibile';
      }

  }

  inizioNoleggio(): void {

    if(this.stato !== "non disponibile"){
    /*this.f=true;
    this.time=0;
    this.interval = setInterval(() => {
      if(this.time > 0) {
        this.time++;
      } else {
        this.time = 1;
      }
    },1000)*/


     this.inizio = false;
     this.fine = true;
     var fecha = new Date();
     console.log("Inizio noleggio: ", fecha.toLocaleString());
     var x= fecha.toLocaleString().split(",");
     var date=x[0];
     var time=x[1];
     this.inizioNol.push(date,time);
     console.log(this.inizioNol)
     //localStorage.setItem('data', date);
     //localStorage.setItem('ora', time);
     console.log(this.stato)
     this.invioStato();
     this.changeStato();
    }else if(this.stato == "non disponibile"){
      this.e=true;
      this.err="Questo monopattino al momento non è disponibile"}

  }


  fineNoleggio(): void {

    console.log(this.time)

    /*clearInterval(this.interval);
     this.f=false;*/

     this.fine = false;
     this.inizio = true;
     var fecha = new Date();
     console.log("Fine noleggio: ", fecha.toLocaleString());
     var y= fecha.toLocaleString().split(",");
     var date2=y[0];
     var time2=y[1];


     this.oraInizio= this.inizioNol[1];
     this.dataInizio= this.inizioNol[0];


     this.user = localStorage.getItem('username');
     //this.oraInizio = localStorage.getItem('ora');
     //this.dataInizio = localStorage.getItem('data');

     let dati: Noleggio = new Noleggio();
     dati.username = this.user;
     dati.idUser = this.userId;
     dati.idMono = this.id;
     dati.dataInizio = this.dataInizio;
     dati.oraInizio = this.oraInizio;


     dati.dataFine = date2;
     dati.oraFine = time2;

     console.log(dati);
     this.noleGio.push(dati);
     console.log(this.noleGio);
     this.Noleggio(dati);
     this.invioStato2();
     this.changeStato2();
     }

     segnala(): void {
     if(this.selected !== ""){
     var fecha = new Date();
     console.log("Data segnalazione: ", fecha.toLocaleString());
     var y= fecha.toLocaleString().split(",");
     var date2=y[0];
     var time2=y[1];
     this.problema.push(date2,time2);
     this.oraGuasto= this.problema[1];
     this.dataGuasto= this.problema[0];

     this.guasto2 += this.selected;

     let dati: Guasto = new Guasto();
     dati.idMono = this.id;
     dati.idUser = this.userId;
     dati.problema = this.guasto2;
     dati.oraSegnalazione = this.oraGuasto;
     dati.dataSegnalazione = this.dataGuasto;
     console.log(dati);

     this.guaSto.push(dati);
     console.log(this.guaSto);
     this.Guasto(dati);
     this.close()
     this.alert=true;
     this.alert2=false;
     }else if(this.selected == ""){this.alert2=true;}
   }

   Guasto(dati: Guasto): void {
     this.http.post('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/guasto', {MonoId:dati.idMono, Problema:dati.problema, UserId:dati.idUser, DataSegn:dati.dataSegnalazione, OraSegn:dati.oraSegnalazione})
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
   }

   Noleggio(dati: Noleggio): void {
        console.log(dati.username);

     this.http.post('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/noleggio', {User:dati.username,dataIn:dati.dataInizio, oraIn:dati.oraInizio, dataFi:dati.dataFine, oraFi:dati.oraFine, UserId:dati.idUser, MonoId:dati.idMono})
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
   }

  invioStato():void{
     if(this.stato="disponibile"){this.stato2="non disponibile"}
     let dati: Noleggio = new Noleggio();
     dati.stato=this.stato2;
     dati.idMono = this.id;
     this.noleGio.push(dati);
     console.log(this.noleGio);
     this.Stato(dati);
  }
  invioStato2():void{
     if(this.stato="non disponibile"){this.stato2="disponibile"}
     let dati: Noleggio = new Noleggio();
     dati.stato=this.stato2;
     dati.idMono = this.id;
     this.noleGio.push(dati);
     console.log(this.noleGio);
     this.Stato(dati);

  }

  Stato(dati: Noleggio): void {
     this.http.post('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/stato', {Stato:dati.stato, MonoId:dati.idMono})
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
      });
   }
}
