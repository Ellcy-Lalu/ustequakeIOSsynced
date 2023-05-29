import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineFeatureComponent } from './offline-feature.component';

describe('OfflineFeatureComponent', () => {
  let component: OfflineFeatureComponent;
  let fixture: ComponentFixture<OfflineFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfflineFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
