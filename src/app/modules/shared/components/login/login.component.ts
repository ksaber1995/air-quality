import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../../services/auth.service';
import { SwaggerService } from '../../../../services/swagger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private swagger: SwaggerService,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
    translate.use('ar');
  }
  noMatch;
  ngOnInit(): void {}
  loginForm = new FormGroup({
    email: new FormControl('manager@test.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('Aa654321', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });

  login() {
    this.noMatch = false;
    
    const body = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
    };

    const returnUrl = this.route.snapshot.queryParamMap.get('return_url') || '';

    this.auth.login(body.email, body.password).subscribe((res) => {
      if (res.session?.accessToken) {
        localStorage.setItem('token', res.session.accessToken);
        localStorage.setItem('refreshToken', res.session.refreshToken || '');
        this.router.navigateByUrl(returnUrl);
      }else{
        this.noMatch = true;
      }
    }, err=>{
      this.noMatch = true;
    });

  }
}
