import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { GuastoComponent } from './guasto/guasto.component';

import { AgmCoreModule } from '@agm/core';
import { ProfiloComponent } from './profilo/profilo.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MapComponent,
    QrCodeComponent,
    GuastoComponent,
    ProfiloComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    CommonModule,
    FormsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCzUI8LYmnHPyFrtRT8Q8IEREZfOygUl-U'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
