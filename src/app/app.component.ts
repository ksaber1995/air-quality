import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalizationService } from './services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isLoading = true;
  constructor(private spinner: NgxSpinnerService, private localization: LocalizationService) {
    this.spinner.show();



    setTimeout(() => {
      this.spinner.hide();
      this.isLoading = false;

    }, 1000);
  }

  ngOnInit(){
    this.setLangs();
  }

  setLangs() {
    this.localization.getCurrentLanguage().subscribe(lang => {
      const title = document.getElementById('app-title');
      const body = document.getElementById('app-body');


      const html = document.getElementById('main-html');

      if (lang === 'ar') {
        title.innerText = 'نقي'
        body.className = 'rtl-body'
        html.setAttribute('dir', 'rtl')
        html.setAttribute('lang', 'ar')

      } else {
        title.innerText = 'NAQI'
        body.className = 'ltr-body'
        html.setAttribute('dir', 'ltr')
        html.setAttribute('lang', 'en')

      }
    })
  }

}
