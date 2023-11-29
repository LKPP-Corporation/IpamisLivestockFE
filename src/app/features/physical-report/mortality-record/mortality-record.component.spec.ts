import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortalityRecordComponent } from './mortality-record.component';

describe('MortalityRecordComponent', () => {
  let component: MortalityRecordComponent;
  let fixture: ComponentFixture<MortalityRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortalityRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortalityRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
