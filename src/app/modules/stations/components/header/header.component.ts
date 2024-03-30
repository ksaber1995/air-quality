import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Lang, LocalizationService } from './../../../../services/localization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  lang$ = this.localization.getCurrentLanguage()
  user = this.auth.getUser();

  constructor(private localization: LocalizationService, private auth: AuthService, private router: Router){}

  homeClick(){
    
  }

  overviewClick(){

  }
  
  logout(){
    this.auth.logOut();
    this.router.navigate(['/login'])
  }

  setLang(lang){
    this.localization.setLang(lang)
  }
}
