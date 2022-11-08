import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqListItemComponent } from './rfq-list-item.component';

describe('RfqListItemComponent', () => {
  let component: RfqListItemComponent;
  let fixture: ComponentFixture<RfqListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqListItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
