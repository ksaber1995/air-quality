import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeverityBarComponent } from './severity-bar.component';

describe('SeverityBarComponent', () => {
  let component: SeverityBarComponent;
  let fixture: ComponentFixture<SeverityBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SeverityBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeverityBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
