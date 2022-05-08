import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbModalModule, } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatDialogModule } from '@angular/material/dialog';
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
import { TypereqyestComponent } from './typereqyest/typereqyest.component';
import { AddtyperequestComponent } from './popup/addtyperequest/addtyperequest.component';
import { AddpieceComponent } from './addpiece/addpiece.component';
import { AddcatgtyperequestComponent } from './addcatgtyperequest/addcatgtyperequest.component';
import { TyperequestcatgComponent } from './typerequestcatg/typerequestcatg.component';
import { ViewtyperequestcatComponent } from './viewtyperequestcat/viewtyperequestcat.component';
import { RequestWaitingvalidationComponent } from './request-waitingvalidation/request-waitingvalidation.component';

import { NgChartsModule } from 'ng2-charts';
import { MyDoughnutChartComponent } from './my-doughnut-chart/my-doughnut-chart.component';
import { FinalValidationComponent } from './final-validation/final-validation.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';





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
    TypereqyestComponent,
    AddtyperequestComponent,
    AddpieceComponent,
    AddcatgtyperequestComponent,
    TyperequestcatgComponent,
    ViewtyperequestcatComponent,
    RequestWaitingvalidationComponent,
    MyDoughnutChartComponent,
    FinalValidationComponent,
    ChatRoomComponent,


  ],
  entryComponents: [AddroleComponent, ViewroleComponent, AddorganismeComponent],
  imports: [
    BrowserModule,
    NgChartsModule,

    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModalModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatTabsModule,
    MatSlideToggleModule,
    AvatarModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
