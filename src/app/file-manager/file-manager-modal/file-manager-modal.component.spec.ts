import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerModalComponent } from './file-manager-modal.component';

describe('FileManagerModalComponent', () => {
  let component: FileManagerModalComponent;
  let fixture: ComponentFixture<FileManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileManagerModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
