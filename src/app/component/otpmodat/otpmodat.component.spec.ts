import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpmodatComponent } from './otpmodat.component';

describe('OtpmodatComponent', () => {
  let component: OtpmodatComponent;
  let fixture: ComponentFixture<OtpmodatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpmodatComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OtpmodatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
