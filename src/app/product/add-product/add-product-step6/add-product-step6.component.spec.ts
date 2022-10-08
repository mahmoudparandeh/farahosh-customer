import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductStep6Component } from './add-product-step6.component';

describe('AddProductStep6Component', () => {
  let component: AddProductStep6Component;
  let fixture: ComponentFixture<AddProductStep6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductStep6Component],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductStep6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
