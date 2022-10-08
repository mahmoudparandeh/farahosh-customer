import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductFinalComponent } from './add-product-final.component';

describe('AddProductFinalComponent', () => {
  let component: AddProductFinalComponent;
  let fixture: ComponentFixture<AddProductFinalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductFinalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
