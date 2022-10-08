import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryListItemComponent } from './inquiry-list-item.component';

describe('InquiryListItemComponent', () => {
  let component: InquiryListItemComponent;
  let fixture: ComponentFixture<InquiryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InquiryListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
