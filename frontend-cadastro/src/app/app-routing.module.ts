import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { RatingsFormComponent } from './ratings-form/ratings-form.component';
import { RatingsListComponent } from './ratings-list/ratings-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    component: ProdutosListComponent
  },
  {
    path: 'products/novo',
    component: ProdutosFormComponent
  },
  {
    path: 'products/:id',
    component: ProdutosFormComponent
  },
  {
    path: 'products/:product_id/ratings',
    component: RatingsListComponent
  },
  {
    path: 'products/:product_id/ratings/:id',
    component: RatingsFormComponent
  },
  {
    path: 'products/:product_id/newrating',
    component: RatingsFormComponent
  },
  {
		path: '404',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: '/404'
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
