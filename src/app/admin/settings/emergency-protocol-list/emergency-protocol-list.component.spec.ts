import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyProtocolListComponent } from './emergency-protocol-list.component';

describe('EmergencyProtocolListComponent', () => {
  let component: EmergencyProtocolListComponent;
  let fixture: ComponentFixture<EmergencyProtocolListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyProtocolListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyProtocolListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
