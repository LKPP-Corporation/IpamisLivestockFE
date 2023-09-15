import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessagesModule } from 'primeng/messages';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MultiSelectModule } from 'primeng/multiselect';
const MODULES: any[] = [CommonModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  InputNumberModule,
  InputTextareaModule,
  ConfirmDialogModule,
  MessagesModule,
  ToastModule,
  BlockUIModule,
  CheckboxModule,
  CalendarModule,
  ReactiveFormsModule,
  FormsModule,
  DynamicDialogModule,
  DropdownModule,
  ListboxModule,
  DividerModule,
  RadioButtonModule,
  SelectButtonModule,
  InputSwitchModule,
  MultiSelectModule,
];

@NgModule({
  declarations: [],
  imports: [...MODULES],
  exports: [...MODULES],
  providers: [ConfirmationService, MessageService],
})
export class SharedModule { }
