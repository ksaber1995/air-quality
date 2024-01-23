import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NZ_I18N, en_US, NzI18nService } from 'ng-zorro-antd/i18n';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/stations/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';

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
    // Routes,
    // CarouselModule

  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'zh-Hans' }, // Set locale globally for Angular 
    { provide: NZ_I18N, useValue: en_US }, // Set locale globally for NZ-Zorro

    // provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private nzI18nService: NzI18nService) {
    // Set the locale globally for NZ-Zorro
    this.nzI18nService.setLocale(en_US);
  }
}
