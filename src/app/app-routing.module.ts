import { NotFoundComponent } from './not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuadroAtividadesComponent } from './quadro-atividades/quadro-atividades.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
  },

  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  },

  {
    path: 'atividades',
    pathMatch: 'full',
    component: QuadroAtividadesComponent
  },

  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
