import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [
  {
      path: '',
      redirectTo: 'stations',
      pathMatch: 'full'
  },
  {
      path: 'stations',
      loadChildren: () => import('./modules/stations/stations.module').then(m => m.StationsModule)
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
