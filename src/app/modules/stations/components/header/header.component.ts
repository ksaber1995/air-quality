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
  
  constructor(private localization: LocalizationService, private auth: AuthService){}

  homeClick(){

  }

  overviewClick(){

  }
  
  logout(){
    this.auth.logOut();
  }

  setLang(lang){
    this.localization.setLang(lang)
  }
}
