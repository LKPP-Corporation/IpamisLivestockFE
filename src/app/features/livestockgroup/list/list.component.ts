import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { Livestockgroup } from '../livestockgroup';
import { LivestockgroupService } from '../livestockgroup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  @ViewChild('dt')
  dt!: Table;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private svc: LivestockgroupService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  listData: Livestockgroup[] = [];

  totalRecords: number = 0;

  loading: boolean = true;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  editData(s?: Livestockgroup) {
    this.router.navigate(['livestockgroup/form', { id: s != null ? s.code : null }]);
  }

  deleteData(event: Event, s: Livestockgroup) {
    console.log(s);
    console.log(event);
    this.confirmationService.confirm({
      //target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.svc.delete(s.code!).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.reloadList({ first: 0, rows: 10, sortField: 'code', sortOrder: 1, globalFilter: '' });
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
    //console.log(event);
    let vv = event;
    if (event.sortField === undefined) {
      vv = { first: 0, rows: 10, sortField: 'id', sortOrder: 1, globalFilter: '' };
    }
    //console.log(vv);
    this.svc.getList(vv).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.listData = res.content;
      this.totalRecords = res.totalElements;
      this.loading = false;
    });
  }
}
