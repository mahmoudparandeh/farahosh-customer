import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceItemComponent } from './product-price-item.component';

describe('ProductPriceItemComponent', () => {
  let component: ProductPriceItemComponent;
  let fixture: ComponentFixture<ProductPriceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPriceItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductPriceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
