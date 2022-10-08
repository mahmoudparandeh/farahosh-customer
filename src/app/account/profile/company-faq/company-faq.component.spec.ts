import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFaqComponent } from './company-faq.component';

describe('CompanyFaqComponent', () => {
  let component: CompanyFaqComponent;
  let fixture: ComponentFixture<CompanyFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyFaqComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
