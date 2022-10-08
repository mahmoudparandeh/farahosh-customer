import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProductionCapacityComponent } from './company-production-capacity.component';

describe('CompanyProductionCapacityComponent', () => {
  let component: CompanyProductionCapacityComponent;
  let fixture: ComponentFixture<CompanyProductionCapacityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyProductionCapacityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyProductionCapacityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
