import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyStatusComponent } from './safety-status.component';

describe('SafetyStatusComponent', () => {
  let component: SafetyStatusComponent;
  let fixture: ComponentFixture<SafetyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
