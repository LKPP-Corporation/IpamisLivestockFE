import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(public layoutService: LayoutService, private authService: AuthenticationService) { }
  model = new BehaviorSubject<any>([]);
  ngOnInit() {
    this.authService.getMenu().pipe(takeUntil(this.destroy$)).subscribe((res) => {
      let menus = res as MenuItem[];
      this.deleteEmptyItems(menus);
      // menus.forEach((menu: any) => {
      //   if (menu.items.length === 0) {
      //     delete menu.items;
      //   }
      //   menu.items.forEach((item: any) => {
      //     if (item.items.length === 0) {
      //       delete item.items;
      //     }
      //   });
      // });
      console.log('menus', menus);
      this.model.next(menus);
    });
  }

  deleteEmptyItems(items: MenuItem[]): void {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.items?.length === 0) {
        delete item.items;
      } else {
        // Recursively delete empty items from the item's items array
        this.deleteEmptyItems(item.items!);
      }
    }
  }
}
