import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBillingComponent } from './smart-billing.component';

describe('SmartBillingComponent', () => {
  let component: SmartBillingComponent;
  let fixture: ComponentFixture<SmartBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartBillingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
