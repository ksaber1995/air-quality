import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedChartComponent } from './detailed-chart.component';

describe('DetailedChartComponent', () => {
  let component: DetailedChartComponent;
  let fixture: ComponentFixture<DetailedChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
