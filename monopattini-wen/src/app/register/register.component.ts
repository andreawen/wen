import { Component, OnInit } from '@angular/core';
import { Registrazione } from './registrazione.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  data: Object;
  o: Observable<Object>;
  obs: Observable<Registrazione[]>;
  wen: Array<Registrazione> = new Array();
  visible: boolean = true;
  err: String = "";
  ok: String = "";
  constructor(public http: HttpClient,private router: Router) {}

  ngOnInit() {
  }

  private onVedi(): void { this.router.navigate(['/login']); }

  onClick(username: string, password: string): boolean {
    if(username !== "" && password !==""){
      let dati: Registrazione = new Registrazione();
      dati.username = username;
      dati.password = password;
      console.log(this.wen.length);
      console.log(dati);
      this.wen.push(dati);
      this.Registrati(dati);
      return false;
    }else if(username == "" && password ==""){
        this.err ="Inserisci username e password"
    }
  }
    Registrati(dati: Registrazione): void {
    this.http.post('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/registrazione', { login: dati.username, pass: dati.password })
      .subscribe(data => {
        this.data = data;
        console.log(this.data);
        this.ok = "Ora effettua l'accesso con il tuo Account";
      });
  }

}
