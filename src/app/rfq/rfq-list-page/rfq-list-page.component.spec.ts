import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqListPageComponent } from './rfq-list-page.component';

describe('RfqListPageComponent', () => {
  let component: RfqListPageComponent;
  let fixture: ComponentFixture<RfqListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
