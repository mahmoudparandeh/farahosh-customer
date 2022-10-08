import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep2Component } from './add-product-step2.component';

describe('AddProductStep2Component', () => {
  let component: AddProductStep2Component;
  let fixture: ComponentFixture<AddProductStep2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep2Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
