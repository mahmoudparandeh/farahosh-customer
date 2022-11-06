import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqDetailsPageComponent } from './rfq-details-page.component';

describe('RfqDetailsPageComponent', () => {
  let component: RfqDetailsPageComponent;
  let fixture: ComponentFixture<RfqDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
