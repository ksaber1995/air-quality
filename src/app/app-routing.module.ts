import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/shared/components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login-guard';


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
