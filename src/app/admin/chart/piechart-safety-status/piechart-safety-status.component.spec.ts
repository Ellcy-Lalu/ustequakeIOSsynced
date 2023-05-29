import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartSafetyStatusComponent } from './piechart-safety-status.component';

describe('PiechartSafetyStatusComponent', () => {
  let component: PiechartSafetyStatusComponent;
  let fixture: ComponentFixture<PiechartSafetyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiechartSafetyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartSafetyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
