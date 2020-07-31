import { AuthService } from '../../_services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        console.log('registration');
      },
      (error) => {
        console.log('not successfull');
      }
    );
  }

  login() {
    this.authService.login(this.model).subscribe(
      (next) => {
        console.log('logged successfully');
      },
      (error) => {
        console.log('logged error');
      }
    );
  }

  cancel() {}

  showPass() {}
}
