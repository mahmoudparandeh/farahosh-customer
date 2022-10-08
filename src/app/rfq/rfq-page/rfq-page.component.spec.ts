import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfqPageComponent } from './rfq-page.component';

describe('RfqPageComponent', () => {
  let component: RfqPageComponent;
  let fixture: ComponentFixture<RfqPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfqPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfqPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
