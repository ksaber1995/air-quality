import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NZ_I18N, en_US, NzI18nService } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/stations/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CookieService } from 'ngx-cookie-service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    
  

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
    // Routes,
    // CarouselModule

  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'zh-Hans' }, // Set locale globally for Angular 
    { provide: NZ_I18N, useValue: en_US }, // Set locale globally for NZ-Zorro
    CookieService
    // provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private nzI18nService: NzI18nService, private translate: TranslateService) {
    // Set the locale globally for NZ-Zorro
    this.nzI18nService.setLocale(en_US);
    translate.setDefaultLang('en');
    translate.use('en'); // Set default language
    
  }
}
