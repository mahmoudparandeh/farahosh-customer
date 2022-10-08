import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerItemComponent } from './file-manager-item.component';

describe('FileManagerItemComponent', () => {
  let component: FileManagerItemComponent;
  let fixture: ComponentFixture<FileManagerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileManagerItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileManagerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
