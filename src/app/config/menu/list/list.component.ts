import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('dt')
  dt!: Table;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private svc: MenuService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }

  //listData: MenuItem[] = [];
  listData$!: Observable<MenuItem[]>;
  totalRecords: number = 0;

  loading: boolean = true;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.listData$ = this.svc.menus().pipe(takeUntil(this.unsubscribe$));
    //throw new Error('Method not implemented.');
  }

  editData(s?: MenuItem) {
    this.router.navigate(['menu/form', { id: s != null ? s.id : null, tempMasterId: null }]);
  }

  deleteData(event: Event, s: MenuItem) {
    console.log(s);
    console.log(event);
    this.confirmationService.confirm({
      //target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.svc.delete(Number(s.id!)).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.listData$ = this.svc.menus().pipe(takeUntil(this.unsubscribe$));
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted' });
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: 'Cancelled' });
      }
    });
  }


}
