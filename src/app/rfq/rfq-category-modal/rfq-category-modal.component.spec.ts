import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqCategoryModalComponent } from './rfq-category-modal.component';

describe('RfqCategoryModalComponent', () => {
  let component: RfqCategoryModalComponent;
  let fixture: ComponentFixture<RfqCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RfqCategoryModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RfqCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
