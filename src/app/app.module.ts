import { HttpService } from './_services/http.service';
import { AuthService } from './_services/auth.service';
// import { HttpService } from './_services/http.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, NavbarComponent],
  imports: [BrowserModule, NgbModule, FormsModule],
  providers: [AuthService, HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
