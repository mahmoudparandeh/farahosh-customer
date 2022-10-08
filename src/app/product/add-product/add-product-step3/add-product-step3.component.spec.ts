import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep3Component } from './add-product-step3.component';

describe('AddProductStep3Component', () => {
  let component: AddProductStep3Component;
  let fixture: ComponentFixture<AddProductStep3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep3Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
