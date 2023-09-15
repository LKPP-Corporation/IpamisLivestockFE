import { Component } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { AuthenticationService } from './core/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'primesakai-korok';

  constructor(private keycloakService: KeycloakService, private router: Router, private authSvc: AuthenticationService) {
    this.keycloakService.keycloakEvents$.subscribe({
      next(event) {
        if (event.type == KeycloakEventType.OnTokenExpired) {
          keycloakService.updateToken(20);
        }
        else if (event.type == KeycloakEventType.OnAuthRefreshError) {
          authSvc.logout();
          router.navigate(['/home']);
        }
      }
    });
  }
}
