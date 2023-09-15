import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'], providers: [DialogService]
})
export class FormComponent implements OnDestroy, OnInit {
  ref!: DynamicDialogRef;
  unsubscribe$: Subject<void> = new Subject<void>();
  homelink = '/user/list';
  data: User = {
    email: '',
    staffId: '',
    signature: '',
    roles: [],
  };

  id!: number | null;
  roles$!: Observable<string[]>;


  constructor(
    private router: Router, private route: ActivatedRoute,
    private messageService: MessageService,
    private svc: UserService,
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
    this.roles$ = this.svc.getRoles().pipe(takeUntil(this.unsubscribe$));
    if (this.id != null) {
      console.log(this.id);
      this.svc.getData(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe({
        next: dt => {
          this.data = dt as User;
        }, error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err });
        }
      });
    } else {
      this.data = {
        email: '',
        staffId: '',
        signature: '',
        roles: [],
      };
    }
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
