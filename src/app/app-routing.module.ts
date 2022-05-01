import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { CategoriesComponent } from './categories/categories.component';
import { RequestComponent } from './request/request.component';
import { OrganismeComponent } from './organisme/organisme.component';
import { FunctionComponent } from './function/function.component';
import { AllrequestComponent } from './allrequest/allrequest.component';
import { RequestdetailsComponent } from './requestdetails/requestdetails.component';
import { TypereqyestComponent } from './typereqyest/typereqyest.component';
import { RequestWaitingvalidationComponent } from './request-waitingvalidation/request-waitingvalidation.component';






const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'allusers', component: UsersComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'organisme', component: OrganismeComponent },
  { path: 'allrequest', component: AllrequestComponent },
  { path: 'request', component: RequestComponent },
  { path: 'request/details/:detail', component: RequestdetailsComponent },
  { path: 'functionofuser', component: FunctionComponent },
  { path: 'typerequest', component: TypereqyestComponent },
  { path: 'waitingvalidation', component: RequestWaitingvalidationComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],














  exports: [RouterModule,]
})
export class AppRoutingModule { }
