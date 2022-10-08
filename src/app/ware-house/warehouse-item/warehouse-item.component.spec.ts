import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseItemComponent } from './warehouse-item.component';

describe('WarehouseItemComponent', () => {
  let component: WarehouseItemComponent;
  let fixture: ComponentFixture<WarehouseItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarehouseItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WarehouseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
