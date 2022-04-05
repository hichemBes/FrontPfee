import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TableFilterPipe } from './pipes/pipes.component';
import { registerLocaleData } from '@angular/common';
import  localeFr  from '@angular/common/locales/fr';
registerLocaleData(localeFr,'fr');

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    GeneralLayoutComponent,
    TableFilterPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule, 
  
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    GeneralLayoutComponent,
    TableFilterPipe
  ], 
  providers:[{provide:LOCALE_ID,useValue:'fr-FR'},DatePipe]
})
export class SharedModule { }
