import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInvitesComponent } from './account-invites.component';

describe('AccountInvitesComponent', () => {
  let component: AccountInvitesComponent;
  let fixture: ComponentFixture<AccountInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountInvitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
