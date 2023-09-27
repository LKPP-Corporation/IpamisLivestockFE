import { Component, OnDestroy, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { Livestockstatus } from '../livestockstatus';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LivestockstatusService } from '../livestockstatus.service';
import { Buyerinfo } from '../../buyerinfo/buyerinfo';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'], providers: [DialogService]
})

export class FormComponent  implements OnDestroy, OnInit{

  unsubscribe$: Subject<void> = new Subject<void>();
  homelink = '/livestock/list';
  data: Livestockstatus = {
    id: '',
    regid:''
  };

  buyer: Buyerinfo = {
    code: '',
    companyname:''
  };

  selectedStatus:any;
  status:any;

  selectedBuyer:any;
  BuyerList:Buyerinfo[]=[];

  parameterTypeId!: string | null;

  constructor(
    private router: Router, private route: ActivatedRoute,
    private messageService: MessageService,
    private svc: LivestockstatusService,
    public dialogService: DialogService) {
    if (this.route.snapshot.paramMap.get('id') === 'undefined') {
      this.router.navigate([this.homelink]);
    } else {
      console.log(this.route.snapshot.paramMap.get('id'));
      let regid = this.route.snapshot.paramMap.get('id');
      if (regid === null || regid === 'null' || regid === 'undefined')
        this.parameterTypeId = null;
      else
        this.parameterTypeId = this.route.snapshot.paramMap.get('id');
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {

    this.getBuyer();

    this.status = [
      {name: 'Active', value: 'Active'},
      {name: 'Death', value:'Death'}

    ];


    if (this.parameterTypeId != null) {
      console.log(this.parameterTypeId);
      this.svc.getData(this.parameterTypeId).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: dt => {
          console.log(dt);
          this.data = dt as Livestockstatus;
        }, error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      });
    } else {
      this.data = {
        regid: ''
      };
    }
  }

  getBuyer(){
    this.svc.getBuyer().subscribe((data)=>{
      this.BuyerList=data.content;
      console.log( this.BuyerList + 'sireeee');
    });
  }


  save() {
    console.log(this.data);
    this.svc.save(this.data).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: dt => {
        console.log(dt);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
        this.router.navigate([this.homelink]);
      }, error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });
  }

  cancel() {
    this.router.navigate([this.homelink]);
  }
}
