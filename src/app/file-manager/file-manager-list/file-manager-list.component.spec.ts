import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileManagerListComponent } from './file-manager-list.component';

describe('FileManagerListComponent', () => {
  let component: FileManagerListComponent;
  let fixture: ComponentFixture<FileManagerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileManagerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FileManagerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
