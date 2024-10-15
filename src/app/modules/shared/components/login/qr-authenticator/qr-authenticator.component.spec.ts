import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrAuthenticatorComponent } from './qr-authenticator.component';

describe('QrAuthenticatorComponent', () => {
  let component: QrAuthenticatorComponent;
  let fixture: ComponentFixture<QrAuthenticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QrAuthenticatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QrAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
