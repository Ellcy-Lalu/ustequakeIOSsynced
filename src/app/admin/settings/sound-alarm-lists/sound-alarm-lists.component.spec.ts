import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundAlarmListsComponent } from './sound-alarm-lists.component';

describe('SoundAlarmListsComponent', () => {
  let component: SoundAlarmListsComponent;
  let fixture: ComponentFixture<SoundAlarmListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundAlarmListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundAlarmListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
