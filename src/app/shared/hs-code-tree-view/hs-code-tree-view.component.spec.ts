import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HsCodeTreeViewComponent } from './hs-code-tree-view.component';

describe('HsCodeTreeViewComponent', () => {
  let component: HsCodeTreeViewComponent;
  let fixture: ComponentFixture<HsCodeTreeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HsCodeTreeViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HsCodeTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
