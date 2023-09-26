import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LivestockService } from '../livestock.service';
import { Livestock } from '../livestock';
import { EnterpriseInfo } from '../enterpriseInfo';
import { SpeciesInfo } from '../speciesInfo';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'], providers: [DialogService]
})
export class FormComponent implements OnInit {

  EnterpriseList: EnterpriseInfo[] = [];
  selectedEnterprise:any;
  selectedSex:any;
  sex:any;

  selectedBreed:any;
  BreedList:SpeciesInfo[]=[];

  constructor(private service:LivestockService){}

  ngOnInit(): void {
    this.getEnt();
    this.getBreed();

    this.sex = [
      {name: 'M', value: 'Male'},
      {name: 'F', value:'Female'}


    ];

  }

  getBreed(){
    this.service.getBreed().subscribe((data)=>{
      this.BreedList=data;
    });
  }

  getEnt(){
    this.service.getEnterpriseList().subscribe((data)=>{
      this.EnterpriseList=data.content;
      //console.log(this.EnterpriseList.content);
    });
  }

  ref!: DynamicDialogRef;
  unsubscribe$: Subject<void> = new Subject<void>();
  homelink = '/livestock/list';
  data: Livestock = {
    name: '',
    remark: '',
    price: 0,
    quantity: 0,
  };

  parameterTypeId!: number | null;
  router: any;


//   DROPDOWN_LIST: enterpriseInfo[] = [];


// CodeNextBtn() {
//           this.LivestockService.getList(0,this.pageSize).subscribe(
//             (templateResponse) =>{
//               this.productData=         //binding database values to productData
//   templateResponse.productData;
//               this.totalRecords=templateResponse.totalRecords;
//               this.referenceShowProgressBar

//               // if templateResponse.productData return type is templateData
//               this.DROPDOWN_LIST = templateResponse.productData;

//             },
//              (error) => {
//               console.error(error);
//               this.referenceShowProgressBar = false;
//             }

//           );

// }



  // constructor(
  //   private router: Router, private route: ActivatedRoute,
  //   private messageService: MessageService,
  //   private lvc: LivestockService,
  //   public dialogService: DialogService) {
  //   if (this.route.snapshot.paramMap.get('id') === 'undefined') {
  //     this.router.navigate([this.homelink]);
  //   } else {
  //     console.log(this.route.snapshot.paramMap.get('id'));
  //     let id = this.route.snapshot.paramMap.get('id');
  //     if (id === null || id === 'null' || id === 'undefined')
  //       this.parameterTypeId = null;
  //     else
  //       this.parameterTypeId = Number(this.route.snapshot.paramMap.get('id'));
  //   }
  // }

  // ngOnDestroy(): void {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }
  // ngOnInit(): void {
  //   if (this.parameterTypeId != null) {
  //     console.log(this.parameterTypeId);
  //     this.lvc.getData(this.parameterTypeId).pipe(takeUntil(this.unsubscribe$)).subscribe({
  //       next: dt => {
  //         this.data = dt as Livestock;
  //       }, error: err => {
  //         this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
  //       }
  //     });
  //   } else {
  //     this.data = {
  //       name: '',
  //       remark: '',
  //       price: 0,
  //       quantity: 0,
  //     };
  //   }
  // }

  // save() {
  //   console.log(this.data);
  //   this.lvc.save(this.data).pipe(takeUntil(this.unsubscribe$)).subscribe({
  //     next: dt => {
  //       console.log(dt);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
  //       this.router.navigate([this.homelink]);
  //     }, error: err => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
  //     }
  //   });
  // }

  // cancel() {
  //   this.router.navigate([this.homelink]);
  // }

  save() {
  //   console.log(this.data);
  //   this.lvc.save(this.data).pipe(takeUntil(this.unsubscribe$)).subscribe({
  //     next: dt => {
  //       console.log(dt);
  //       this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
  //       this.router.navigate([this.homelink]);
  //     }, error: err => {
  //       this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
  //     }
  //   });
 }
  // unsubscribe$(unsubscribe$: any): any {
  //   throw new Error('Method not implemented.');
  // }

  cancel() {
    this.router.navigate([this.homelink]);
  }

}
