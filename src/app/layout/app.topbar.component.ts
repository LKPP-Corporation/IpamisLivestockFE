import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Personel } from '../config/external-services/lcsb/lcsb';
import { AuthenticationService } from '../core/authentication/authentication.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  personel = new BehaviorSubject<Personel>({});

  items!: MenuItem[];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(public layoutService: LayoutService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.getPersonel().pipe(takeUntil(this.destroy$)).subscribe((personel) => {
      this.personel.next(personel);
    });
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }
}
