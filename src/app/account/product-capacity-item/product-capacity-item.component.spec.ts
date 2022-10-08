import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCapacityItemComponent } from './product-capacity-item.component';

describe('ProductCapacityItemComponent', () => {
  let component: ProductCapacityItemComponent;
  let fixture: ComponentFixture<ProductCapacityItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCapacityItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCapacityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
