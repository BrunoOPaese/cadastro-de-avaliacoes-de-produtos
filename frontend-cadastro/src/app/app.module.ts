import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RatingsFormComponent } from './ratings-form/ratings-form.component';
import { RatingsListComponent } from './ratings-list/ratings-list.component';
import { ListTitleComponent } from './list-title/list-title.component';
import { FormTitleComponent } from './form-title/form-title.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutosFormComponent,
    ProdutosListComponent,
    HeaderComponent,
    MenuComponent,
    RatingsFormComponent,
    RatingsListComponent,
    ListTitleComponent,
    FormTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
