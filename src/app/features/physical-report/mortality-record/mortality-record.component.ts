import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Livestock } from '../../livestock/livestock';
import { Subject, takeUntil } from 'rxjs';
import { PhysicalReportService } from '../physical-report.service';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Livestockstatus } from '../../livestockstatus/livestockstatus';

@Component({
  selector: 'app-mortality-record',
  templateUrl: './mortality-record.component.html',
  styleUrls: ['./mortality-record.component.scss']
})
export class MortalityRecordComponent {
  @ViewChild('dt')
  dt!: Table;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private svc: PhysicalReportService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  //listData: any;
  listData: Livestock[] = [];

  totalRecords: number = 0;

  loading: boolean = true;
  //svc: any;


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  reloadList(event: LazyLoadEvent) {
    this.loading = true;
    //console.log(event);
    let vv = event;
    if (event.sortField === undefined) {
      vv = { first: 0, rows: 10, sortField: 'id', sortOrder: 1, globalFilter: '' };
    }
    //console.log(vv);
    this.svc.getListMortality(vv).pipe(takeUntil(this.unsubscribe$)).subscribe((res: any) => {
      this.listData = res.content;
      this.totalRecords = res.totalElements;
      this.loading = false;
    });
  }

  deathDate(lvs:Livestockstatus[]){
    const element = lvs.find(v=>v.status==='Death');
    if (element!==undefined)
    return element.transdate;
  else return '-';
  }
}

