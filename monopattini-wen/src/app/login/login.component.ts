import { Component, OnInit } from '@angular/core';
import { Login } from './login.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  data: Object;
  o: Observable<Object>;
  obs: Observable<Login[]>;
  wen: Array<Login> = new Array();
  visible: boolean = true;
  err: String = "";
  ok: String = "";
  constructor(public http: HttpClient,private router: Router) { }

  ngOnInit() {
  }
  onClick(username: string, password: string): boolean {
    if(username !== "" && password !==""){
      let dati: Login = new Login();
      dati.username = username;
      dati.password = password;
      console.log(this.wen.length);
      console.log(dati);
      this.wen.push(dati);
      this.Accedi(dati);
      return false;
    }else if(username == "" && password ==""){
        this.err ="Inserisci username e password"
    }
  }
    Accedi(dati: Login): void {
    this.http.get<Object>('https://3000-d0e6a422-af39-482f-85ec-554b1e6334c0.ws-eu0.gitpod.io/login/' + dati.username + '/' + dati.password)
      .subscribe(data => {

        var a: any;
        a = data;
        console.log(a.result);

        this.data = data;
        if (a.result != "Errore") {
          this.router.navigate(['/home']);
        }else{
          this.err ="Username o password errati"
        }
        console.log(this.data);
        var id=a.result._id;
        var username=a.result.username;
        console.log(id);
        console.log(username);
        localStorage.setItem('username', username);
        localStorage.setItem('idUser', id);
      });
  }
}
