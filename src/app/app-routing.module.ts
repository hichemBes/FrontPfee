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





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'allusers', component: UsersComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'organisme', component: OrganismeComponent },
  { path: 'allrequest', component: RequestComponent },
  { path: 'functionofuser', component: FunctionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],










  exports: [RouterModule,]
})
export class AppRoutingModule { }
