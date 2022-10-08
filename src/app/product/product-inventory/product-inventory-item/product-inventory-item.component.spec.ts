import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInventoryItemComponent } from './product-inventory-item.component';

describe('ProductInventoryItemComponent', () => {
  let component: ProductInventoryItemComponent;
  let fixture: ComponentFixture<ProductInventoryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductInventoryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductInventoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
