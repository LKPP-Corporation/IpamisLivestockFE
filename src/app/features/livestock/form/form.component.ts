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

  dropdownOptions: CeLivestock[] = [];
  
  constructor(private service:LivestockService,private router: Router, private route: ActivatedRoute, private lvc: LivestockService,private messageService: MessageService){}

  ngOnInit(): void {
    this.getEnt();
    this.getBreed();
    this.getSire();
    this.getDam();

    this.sex = [
      {code: 'm', name: 'male'},
      {code: 'f', name:'female'}
  
    
    ];

    // this.service.getSire().subscribe((options)=>{
    //   this.SireList=[
    //     {label:'Not Applicable',value:'not applicable'},
    //     ...options,
    //   ];
    // });

        // // Fetch options from the service
        // this.service.getSire().subscribe((options) => {
        //   // Add the "Not Applicable" option at the beginning
        //   this.dropdownOptions = [
        //     { label: 'Not Applicable', value: 'not_applicable' },
        //     ...options, // Add the options fetched from the database
        //   ];
        // });
    
  }


//   onOptionSelect() {
//     if (this.selectedSire === 'not_applicable') {
//       // Handle the "Not Applicable" selection here
//       console.log('Not Applicable selected');
//     } else {
//       // Handle other options here
//       console.log('Selected Option:', this.selectedSire);
//     }
//   }
// }



  

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
    this.data1.sex=this.selectedSex;
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
