import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundAlarmsComponent } from './sound-alarms.component';

describe('SoundAlarmsComponent', () => {
  let component: SoundAlarmsComponent;
  let fixture: ComponentFixture<SoundAlarmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundAlarmsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
