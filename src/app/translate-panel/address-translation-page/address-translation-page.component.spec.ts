import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressTranslationPageComponent } from './address-translation-page.component';

describe('AddressTranslationPageComponent', () => {
  let component: AddressTranslationPageComponent;
  let fixture: ComponentFixture<AddressTranslationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddressTranslationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressTranslationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
