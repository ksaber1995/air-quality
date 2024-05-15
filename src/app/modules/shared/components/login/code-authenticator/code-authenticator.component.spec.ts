import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeAuthenticatorComponent } from './code-authenticator.component';

describe('CodeAuthenticatorComponent', () => {
  let component: CodeAuthenticatorComponent;
  let fixture: ComponentFixture<CodeAuthenticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeAuthenticatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodeAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
