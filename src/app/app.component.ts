import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { IdentityServerService } from './core/services/identity-server.service';
import { authPasswordFlowConfig } from './shared/config/auth-config';
import { filter } from 'rxjs/operators';
import { UserauthService } from 'src/app/core/services/userauth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '';

  constructor(private router: Router) {
  }

  ngOnInit() {




  }

}