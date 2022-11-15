import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqVendorItemComponent } from './rfq-vendor-item.component';

describe('RfqVendorItemComponent', () => {
  let component: RfqVendorItemComponent;
  let fixture: ComponentFixture<RfqVendorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqVendorItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqVendorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
