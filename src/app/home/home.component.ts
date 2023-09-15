import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../core/authentication/authentication.service';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { MenuService } from '../config/menu/menu.service';
import { MessageService } from 'primeng/api';
import { LCSBService } from '../config/external-services/lcsb/lcsb.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService]
})
export class HomeComponent implements OnInit {
  public isLoggedIn = false;
  blockedDocument: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private authService: AuthenticationService,
    private menuService: MenuService,
    private messageService: MessageService,
    private lcsb: LCSBService
  ) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      await this.authService.setUserProfile();

      forkJoin({
        personel: this.lcsb.personel(this.authService.userProfile!.email!),
        menu: this.menuService.menu(),
      })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log('res', res);
            this.authService.setPersonel(res.personel);
            this.authService.setMenu(res.menu as any[]);
            //console.log('this.authService.userProfile', this.authService.userProfile);
            let redirectURL =
              this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
              '/dashboard';
            if (redirectURL === '/') redirectURL = '/dashboard';
            //console.log('redirectURL', redirectURL);
            // Navigate to the redirect url
            this.blockedDocument = false;
            this.router.navigateByUrl(redirectURL);
          }, error: (err) => {
            console.log('err', err);
            this.blockedDocument = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error on backend service' });
          }
        });


    }
  }

  public login() {
    this.authService.login();
  }
}
