import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep5Component } from './add-product-step5.component';

describe('AddProductStep5Component', () => {
  let component: AddProductStep5Component;
  let fixture: ComponentFixture<AddProductStep5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep5Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
