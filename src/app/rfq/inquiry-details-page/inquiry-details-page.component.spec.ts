import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryDetailsPageComponent } from './inquiry-details-page.component';

describe('InquiryDetailsPageComponent', () => {
  let component: InquiryDetailsPageComponent;
  let fixture: ComponentFixture<InquiryDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InquiryDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
