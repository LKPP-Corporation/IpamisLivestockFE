import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subject, takeUntil } from 'rxjs';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'], providers: [DialogService]
})
export class FormComponent implements OnDestroy, OnInit {

  deleteSubMenu(event: Event, i: number) {
    this.data.items?.splice(i, 1);
  }

  editSubMenu(s?: MenuItem) {
    console.log(s);
    if (s === undefined) {
      console.log('undefined');
      s = {
        label: '',
        icon: '',
        routerLink: [''],
        items: [],
      };

      this.data.items?.push(s);
    }
    else {
      console.log('nav');
      this.router.navigate(['menu/form', { id: s.id }]);
    }

  }
  ref!: DynamicDialogRef;
  unsubscribe$: Subject<void> = new Subject<void>();
  homelink = '/menu/list';
  data: MenuItem = {
    label: '',
    icon: '',
    routerLink: [''],
    items: [],
  };

  id!: number | null;
  tempMasterId!: number | null;


  constructor(
    private router: Router, private route: ActivatedRoute,
    private messageService: MessageService,
    private svc: MenuService,
    public dialogService: DialogService) {
    if (this.route.snapshot.paramMap.get('id') === 'undefined') {
      this.router.navigate([this.homelink]);
    } else {
      console.log(this.route.snapshot.paramMap.get('id'));
      let id = this.route.snapshot.paramMap.get('id');
      if (id === null || id === 'null' || id === 'undefined')
        this.id = null;
      else
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit(): void {
    this.reloadForm();
  }

  reloadForm() {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe(params => {
      console.log('in params', params['id']);
      this.id = params['id'] === 'undefined' ? null : Number(params['id']);
      this.tempMasterId = params['tempMasterId'] === 'undefined' ? null : Number(params['tempMasterId']);
      if (this.id != null) {
        console.log(this.id);
        this.svc.getData(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
          next: dt => {
            this.data = dt as MenuItem;
          }, error: err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
          }
        });
      } else {
        this.data = {
          label: '',
          icon: '',
          routerLink: [''],
          items: [],
        };
      }
    });
  }

  save() {
    console.log(this.data);
    this.svc.save(this.data).pipe(takeUntil(this.unsubscribe$)).subscribe({
      next: (dt: MenuItem) => {
        console.log(dt);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Saved' });
        this.router.navigate(['menu/form', { id: dt.id, masterId: this.tempMasterId }]);
        //this.router.navigate([this.homelink]);
      }, error: err => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
      }
    });
  }

  cancel() {
    this.router.navigate([this.homelink]);
  }
}
