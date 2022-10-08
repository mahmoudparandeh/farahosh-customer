import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep1Component } from './add-product-step1.component';

describe('AddProductStep1Component', () => {
  let component: AddProductStep1Component;
  let fixture: ComponentFixture<AddProductStep1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
