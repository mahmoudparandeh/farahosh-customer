import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyCertificatesComponent } from './company-certificates.component';

describe('CompanyCertificatesComponent', () => {
  let component: CompanyCertificatesComponent;
  let fixture: ComponentFixture<CompanyCertificatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyCertificatesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
