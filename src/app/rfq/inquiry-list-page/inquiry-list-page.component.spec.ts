import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryListPageComponent } from './inquiry-list-page.component';

describe('InquiryListPageComponent', () => {
  let component: InquiryListPageComponent;
  let fixture: ComponentFixture<InquiryListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InquiryListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InquiryListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
