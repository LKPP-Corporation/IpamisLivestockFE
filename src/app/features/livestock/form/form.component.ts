import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LivestockService } from '../livestock.service';
import { Livestock } from '../livestock';
import { EnterpriseInfo } from '../enterpriseInfo';
import { SpeciesInfo } from '../speciesInfo';
import { CeLivestock } from '../CeLivestock';



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
  selectedSire:any;
  selectedDam:any;
  selectedDob:string='';

  //selectedEntCode: string = '';
//selectedEntDescription: string = '';

  selectedBreed:any;
  BreedList:SpeciesInfo[]=[];

  SireList:CeLivestock[]=[];
  DamList:CeLivestock[]=[];
  
  constructor(private service:LivestockService,private router: Router, private route: ActivatedRoute, private lvc: LivestockService,private messageService: MessageService){}

  ngOnInit(): void {
    this.getEnt();
    this.getBreed();
    this.getSire();
    this.getDam();

    this.sex = [
      {name: 'M', value: 'Male'},
      {name: 'F', value:'Female'}
  
    
    ];
    
  }

  getBreed(){
    this.service.getBreed().subscribe((data)=>{
      this.BreedList=data.content;
    });
  }

  getSire(){
    this.service.getSire().subscribe((data)=>{
      this.SireList=data.content;
     // console.log( this.SireList + 'sireeee');
    })
  }

  getDam(){
    this.service.getDam().subscribe((data)=>{
      this.DamList=data.content;
     // console.log( this.SireList + 'sireeee');
    })
  }
  getEnt(){
    this.service.getEnterpriseList().subscribe((data)=>{
      this.EnterpriseList=data.content;
      console.log(this.EnterpriseList);
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

  data1: CeLivestock = {
    name: '',
    entercode: 0,
    breedcode: 0,
    enterdesc: '',
    breeddesc: '',
    dob: '',
    purchasedt: '',
    purchaseamt: 0,
    origin: '',
    currstatus: '',
    sex:'',
  };

  parameterTypeId!: number | null;
  //router: any;


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



  cancel() {
    this.router.navigate([this.homelink]);
  }

  
  save() {

    //this.data1.entercode = this.selectedEnterprise;
    // console.log(this.selectedEnterprise.descp);
    // console.log(this.data);
    // this.lvc.save(this.data).pipe(takeUntil(this.unsubscribe$)).subscribe({
    //   next: dt => {
    //     console.log(dt);
    //     this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
    //     this.router.navigate([this.homelink]);
    //   }, error: err => {
    //     this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
    //   }
    // });

    this.data1.entercode = this.selectedEnterprise;
    //this.data1.enterdesc = this.selectedEnterprise;
    this.data1.breedcode = this.selectedBreed;
   // this.data1.breeddesc = this.selectedBreed;

    //this.data1.dob = this.selectedDob;

    //this.data1.enterdesc = this.selectedEnterprise.entercode;
    console.log(this.data1);
    this.lvc.saveCeLivestock(this.data1).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: dt => {
        console.log(dt);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
        this.router.navigate([this.homelink]);
      }, error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });


  }

  
}
