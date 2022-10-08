import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorWareHouseComponent } from './vendor-ware-house.component';

describe('VendorWareHouseComponent', () => {
  let component: VendorWareHouseComponent;
  let fixture: ComponentFixture<VendorWareHouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorWareHouseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VendorWareHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
