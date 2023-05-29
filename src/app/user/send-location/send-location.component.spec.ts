import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendLocationComponent } from './send-location.component';

describe('SendLocationComponent', () => {
  let component: SendLocationComponent;
  let fixture: ComponentFixture<SendLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
