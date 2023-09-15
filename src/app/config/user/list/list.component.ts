import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../user';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('dt')
  dt!: Table;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private svc: UserService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router) { }

  listData: User[] = [];

  totalRecords: number = 0;

  loading: boolean = true;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  editData(s?: User) {
    this.router.navigate(['user/form', { id: s != null ? s.id : null }]);
  }

  deleteData(event: Event, s: User) {
    console.log(s);
    console.log(event);
    this.confirmationService.confirm({
      //target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.svc.delete(s.id!).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.reloadList({ first: 0, rows: 10, sortField: 'id', sortOrder: 1, globalFilter: '' });
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Deleted' });
        });
      },
      reject: () => {
        this.messageService.add({ severity: 'error', summary: 'Cancelled', detail: 'Cancelled' });
      }
    });
  }

  reloadList(event: LazyLoadEvent) {
    this.loading = true;
    //console.log('reloadList', event);
    let vv = event;
    if (event.sortField === undefined) {
      vv = { first: 0, rows: 10, sortField: 'id', sortOrder: 1, globalFilter: '' };
    }
    console.log(vv);
    this.svc.getList(vv).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.listData = res.content;
      this.totalRecords = res.totalElements;
      console.log('res', res);
      this.loading = false;
    });
  }
}
