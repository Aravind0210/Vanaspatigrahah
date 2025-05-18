import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingsummaryComponent } from './billingsummary.component';

describe('BillingsummaryComponent', () => {
  let component: BillingsummaryComponent;
  let fixture: ComponentFixture<BillingsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillingsummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
