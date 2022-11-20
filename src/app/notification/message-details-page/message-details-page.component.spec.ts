import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDetailsPageComponent } from './message-details-page.component';

describe('MessageDetailsPageComponent', () => {
  let component: MessageDetailsPageComponent;
  let fixture: ComponentFixture<MessageDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
