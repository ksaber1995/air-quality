import { Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, map, of } from "rxjs";

export enum Lang {
  ar = 'ar',
  en = 'en'
}

@Injectable({
  providedIn: 'root'
})
export class LocalizationService implements OnInit {
  lang$ = new BehaviorSubject(this.cookieService.get('lang') as Lang || Lang.en)

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService, private cookieService: CookieService) {
    this.initLang();
    this.lang$.subscribe(res=>{
      if( res === Lang.ar || res === Lang.en){
        this.translate.use(res)
      }
    })
 
  }

  ngOnInit(): void {

  }

  initLang() {
    const lang = this.cookieService.get('lang') as Lang
    if(!lang) this.cookieService.set('lang', Lang.en)
    this.lang$.next(lang)
  }



  getCurrentLanguage(): Observable<Lang> {
    return this.lang$.asObservable();
  }

  setLang(lang){
    this.cookieService.set('lang', lang)
    this.lang$.next(lang)
  }



}

