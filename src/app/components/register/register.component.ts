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
        console.log('registration');
        // if (user) {
        //   localStorage.setItem('token', user.token);
        //   this.router.navigate(['/home']);
        // }
      },
      (error) => {
        console.log(error.error);
      },
      () => {
        this.login();
      }
    );
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('logged successfully');
      },
      (error) => {
        console.log('logged error.' + error.error);
        this.register();
        if (this.loggedIn) this.router.navigate(['/home']);
      },
      () => {
        if (this.loggedIn) this.router.navigate(['/home']);
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
