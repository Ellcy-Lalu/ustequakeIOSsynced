import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyProtocolComponent } from './emergency-protocol.component';

describe('EmergencyProtocolComponent', () => {
  let component: EmergencyProtocolComponent;
  let fixture: ComponentFixture<EmergencyProtocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencyProtocolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyProtocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
