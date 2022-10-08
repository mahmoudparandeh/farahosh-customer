import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTranslationPageComponent } from './product-translation-page.component';

describe('ProductTranslationPageComponent', () => {
  let component: ProductTranslationPageComponent;
  let fixture: ComponentFixture<ProductTranslationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductTranslationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductTranslationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
