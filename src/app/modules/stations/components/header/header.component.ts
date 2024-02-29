import { Lang, LocalizationService } from './../../../../services/localization.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  lang$ = this.localization.getCurrentLanguage()

  constructor(private localization: LocalizationService){}

  homeClick(){

  }
  overviewClick(){

  }
  adminClick(){

  }

  setLang(lang){
    this.localization.setLang(lang)
  }
}
