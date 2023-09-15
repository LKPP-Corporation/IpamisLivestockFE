import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { Personel } from 'src/app/config/external-services/lcsb/lcsb';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public userProfile: KeycloakProfile | null = null;
  private menu$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  private personel$ = new BehaviorSubject<Personel>({});
  constructor(private readonly keycloak: KeycloakService) { }

  isLoggedIn(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
  }

  async setUserProfile() {
    this.userProfile = await this.keycloak.loadUserProfile();
  }

  setPersonel(personel: Personel) {
    this.personel$.next(personel);
    localStorage.setItem('personel', JSON.stringify(personel));
  }

  getPersonel(): Observable<Personel> {
    //console.log('b4', this.personel$.value);
    if (Object.keys(this.personel$.value).length === 0 && this.personel$.value.constructor === Object) {
      const personel = localStorage.getItem('personel');
      if (personel) {
        this.personel$.next(JSON.parse(personel));
      }
    }
    //console.log('Af', this.personel$.value);
    return this.personel$.asObservable();
  }

  logout() {
    localStorage.clear();
    this.keycloak.logout();
  }

  public login() {
    this.keycloak.login();
  }

  setMenu(menu: MenuItem[]): Observable<MenuItem[]> {
    this.menu$.next(menu);
    localStorage.setItem('menu', JSON.stringify(menu));
    return this.menu$.asObservable();
  }

  getMenu(): Observable<MenuItem[]> {
    //console.log('b4', this.menu$.value);
    if (this.menu$.value === null || this.menu$.value.length === 0) {
      const menu = localStorage.getItem('menu');
      if (menu) {
        this.menu$.next(JSON.parse(menu));
      }
    }
    console.log(this.menu$.value);
    return this.menu$.asObservable();
  }
}
