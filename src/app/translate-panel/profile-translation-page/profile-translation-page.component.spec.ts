import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTranslationPageComponent } from './profile-translation-page.component';

describe('ProfileTranslationPageComponent', () => {
  let component: ProfileTranslationPageComponent;
  let fixture: ComponentFixture<ProfileTranslationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileTranslationPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileTranslationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
