import { AuthService } from './../../services/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  title: 'User Login';
  errors: string;
  constructor(private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }
  submit(loginData: UserCredentials) {
    console.log(loginData);
    this.authService.login(loginData.username, loginData.password)
      .subscribe(result => {
        console.log('result -> ' + result);
        if (result) {
          const returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
          console.log('Login is successfull');
          this.router.navigate([returnUrl || '/']);
        }
      }, error => {
        console.log(error);
        this.errors = 'Incorrect User Name or Password';
      });
  }
  hasError(f: FormControl): boolean {
    return f.touched && !f.valid;
  }
}
