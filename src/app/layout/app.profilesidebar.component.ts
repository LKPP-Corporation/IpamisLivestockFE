import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { LayoutService } from './service/app.layout.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Personel } from '../config/external-services/lcsb/lcsb';

@Component({
  selector: 'app-profilemenu',
  templateUrl: './app.profilesidebar.component.html',
})
export class AppProfileSidebarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  personel = new BehaviorSubject<Personel>({});
  constructor(
    public layoutService: LayoutService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.getPersonel().pipe(takeUntil(this.destroy$)).subscribe((personel) => {
      this.personel.next(personel);
    });
  }
  get visible(): boolean {
    return this.layoutService.state.profileSidebarVisible;
  }

  set visible(_val: boolean) {
    this.layoutService.state.profileSidebarVisible = _val;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
}
