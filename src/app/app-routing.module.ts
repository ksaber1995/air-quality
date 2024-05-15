import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login-guard';
import { AuthenticatorComponent } from './modules/shared/components/login/authenticator/authenticator.component';
import { SetAuthenticatorComponent } from './modules/shared/components/login/set-authenticator/set-authenticator.component';
import { QrAuthenticatorComponent } from './modules/shared/components/login/qr-authenticator/qr-authenticator.component';
import { CodeAuthenticatorComponent } from './modules/shared/components/login/code-authenticator/code-authenticator.component';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],

  },


  {path: 'authenticator' , component: AuthenticatorComponent},
  {path: 'set-authenticator', component: SetAuthenticatorComponent},
  {path: 'qr-authenticator', component: QrAuthenticatorComponent},
  {path: 'code-authenticator', component: CodeAuthenticatorComponent},

  {
    path: '',
    canActivate: [AuthGuard],

    loadChildren: () => import('./modules/stations/stations.module').then(m => m.StationsModule)
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
