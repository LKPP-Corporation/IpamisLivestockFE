import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivestockInformationComponent } from './livestock-information.component';

describe('LivestockInformationComponent', () => {
  let component: LivestockInformationComponent;
  let fixture: ComponentFixture<LivestockInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivestockInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivestockInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
