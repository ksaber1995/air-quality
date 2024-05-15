import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAuthenticatorComponent } from './set-authenticator.component';

describe('SetAuthenticatorComponent', () => {
  let component: SetAuthenticatorComponent;
  let fixture: ComponentFixture<SetAuthenticatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetAuthenticatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetAuthenticatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
