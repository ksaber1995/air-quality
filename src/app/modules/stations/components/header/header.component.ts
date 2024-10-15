import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Lang, LocalizationService } from './../../../../services/localization.service';
import { Component } from '@angular/core';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordComponent } from '../../../shared/components/change-password/change-password.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  lang$ = this.localization.getCurrentLanguage()
  user$ = this.auth.getUser();

  constructor(private localization: LocalizationService, private auth: AuthService, private router: Router,private matDialog: MatDialog){}

  homeClick(){

  }

  overviewClick(){

  }
  changePassward(user){
    this.matDialog.open(ChangePasswordComponent,{
      width: '500px',
      data:user
    })
  }

  logout(){
    this.auth.logOut();
    this.router.navigate(['/login'])

    this.user$ = of(null)
  }

  setLang(lang){
    this.localization.setLang(lang)
  }
}
