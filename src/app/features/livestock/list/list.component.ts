import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject, takeUntil } from 'rxjs';
import { LivestockService } from '../livestock.service';
import { Livestock } from '../livestock';
import { Livestockstatus } from '../../livestockstatus/livestockstatus';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CeLivestock } from '../CeLivestock';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  @ViewChild('dt')
  dt!: Table;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private lvc: LivestockService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  listData: Livestock[] = [];

  totalRecords: number = 0;

  loading: boolean = true;

  ref: DynamicDialogRef | undefined;

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  editData(s?: CeLivestock) {
    this.router.navigate(['livestock/form', { id: s != null ? s.id : null }]);
  }

  changeStatusData(s?: Livestockstatus) {
    //this.router.navigate(['/livestockstatus/form', { id: s != null ? s.id : null }]);
    this.router.navigate(['/livestockstatus/form', { id: s != null ? s.id : null }]);
  }

  deleteData(event: Event, s: Livestock) {
    console.log(s);
    console.log(event);
    this.confirmationService.confirm({
      //target: event.target || undefined,
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.lvc.delete(s.id!).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
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
    //console.log(event);
    let vv = event;
    if (event.sortField === undefined) {
      vv = { first: 0, rows: 10, sortField: 'id', sortOrder: 1, globalFilter: '' };
    }
    //console.log(vv);
    this.lvc.getList(vv).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.listData = res.content;
      this.totalRecords = res.totalElements;
      this.loading = false;
    });
  }
}
