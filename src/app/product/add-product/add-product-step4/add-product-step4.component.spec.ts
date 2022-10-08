import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep4Component } from './add-product-step4.component';

describe('AddProductStep4Component', () => {
  let component: AddProductStep4Component;
  let fixture: ComponentFixture<AddProductStep4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep4Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
