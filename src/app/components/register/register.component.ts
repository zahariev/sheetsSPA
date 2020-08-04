import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!!localStorage.getItem('token')) this.router.navigate(['/home']);
  }

  register() {
    this.authService.register(this.model).subscribe(
      (user: any) => {
        // console.log('registration');
        setTimeout(() => this.login(), 1000);
        // if (user) {
        //   localStorage.setItem('token', user.token);
        //   this.router.navigate(['/home']);
        // }
      },
      (error) => {
        console.log(error.error);
      }
    );
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('logged successfully');
        if (this.loggedIn) this.router.navigate(['/home']);
      },
      (error) => {
        console.log('logged error.' + error.error);
        this.register();
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  cancel() {}

  showPass() {}
}
