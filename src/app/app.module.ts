import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbActiveModal, NgbModalModule, } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AvatarModule } from 'ngx-avatar';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { AddroleComponent } from './popup/addrole/addrole.component';
import { ViewroleComponent } from './popup/viewrole/viewrole.component';
import { CategoriesComponent } from './categories/categories.component';
import { RequestComponent } from './request/request.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { AddorganismeComponent } from './popup/addorganisme/addorganisme.component';
import { FunctionComponent } from './function/function.component';
import { AddfunctionComponent } from './popup/addfunction/addfunction.component';
import { FonctionofuserComponent } from './popup/fonctionofuser/fonctionofuser.component';
import { AdduserComponent } from './popup/adduser/adduser.component';
import { AddcategorieComponent } from './popup/addcategorie/addcategorie.component';
import { ViewcatfunctionComponent } from './popup/viewcatfunction/viewcatfunction.component';
import { AddcatfunctionComponent } from './popup/addcatfunction/addcatfunction.component';
import { AllrequestComponent } from './allrequest/allrequest.component';
import { RequestdetailsComponent } from './requestdetails/requestdetails.component';
import { AddrequestComponent } from './popup/addrequest/addrequest.component';





registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent,
    AddroleComponent,
    ViewroleComponent,
    CategoriesComponent,
    RequestComponent,
    OrganismeComponent,
    AddorganismeComponent,
    FunctionComponent,
    AddfunctionComponent,
    FonctionofuserComponent,
    AdduserComponent,
    AddcategorieComponent,
    ViewcatfunctionComponent,
    AddcatfunctionComponent,
    AllrequestComponent,
    RequestdetailsComponent,
    AddrequestComponent,


  ],
  entryComponents: [AddroleComponent, ViewroleComponent, AddorganismeComponent],
  imports: [
    BrowserModule,

    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModalModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    NgxPaginationModule,
    MatTabsModule,
    MatSlideToggleModule,
    AvatarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
