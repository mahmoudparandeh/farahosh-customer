import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import { ProductService } from '../../product/product.service';

@Component({
  selector: 'app-hs-code-tree-view',
  templateUrl: './hs-code-tree-view.component.html',
  styleUrls: ['./hs-code-tree-view.component.sass'],
})
export class HsCodeTreeViewComponent {
  @Input() sections: any[] = [];
  @Input() hsCodeListWithSectionId: any[] = [];
  @Input() hsCodeListWithChapterId: any[] = [];
  @Input() hsCodeListWithHsNumber: any[] = [];
  @Input() hsCodeListWithIndent: any[] = [];
  @Output() getHsCode = new EventEmitter<boolean>();
  @Output() htsNumber = new EventEmitter<string>();
  @Output() hsCode = new EventEmitter<any>();
  direction = 'rtl';
  openedItemIndex = -1;
  openedItemIndex2 = -1;
  openedItemIndex3 = -1;
  openedItemIndex4 = -1;
  constructor(private sharedService: SharedService, private productService: ProductService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
  }

  getIcon(i: number) {
    if (i === this.openedItemIndex) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }

  getIcon2(i: number) {
    if (i === this.openedItemIndex2) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }

  getIcon3(i: number) {
    if (i === this.openedItemIndex3) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }

  getIcon4(i: number) {
    if (i === this.openedItemIndex4) {
      return 'fa-angle-down';
    } else {
      if (this.direction === 'rtl') {
        return 'fa-angle-left';
      } else {
        return 'fa-angle-right';
      }
    }
  }

  onOpenAccordion(i: number, section: any) {
    this.productService.hsCodeSectionId.next(section.Id);
    this.productService.hsCodeChapterId.next(-1);
    this.productService.hsCodeHsNumber.next('-1');
    this.productService.hsCodeIndent.next(-1);
    this.getHsCode.emit(true);
    if (i === this.openedItemIndex) {
      this.openedItemIndex = -1;
    } else {
      this.openedItemIndex2 = -1;
      this.openedItemIndex3 = -1;
      this.openedItemIndex4 = -1;
      this.openedItemIndex = i;
    }
  }

  onOpenAccordion2(i: number, section: any, chapter: any) {
    this.productService.hsCodeSectionId.next(section.Id);
    this.productService.hsCodeChapterId.next(chapter.Id);
    this.productService.hsCodeHsNumber.next('-1');
    this.productService.hsCodeIndent.next(-1);
    this.getHsCode.emit(true);
    if (i === this.openedItemIndex2) {
      this.openedItemIndex2 = -1;
    } else {
      // this.openedItemIndex = -1;
      this.openedItemIndex3 = -1;
      this.openedItemIndex4 = -1;
      this.openedItemIndex2 = i;
    }
  }

  onOpenAccordion3(i: number, section: any, chapter: any, hsNumber: any) {
    this.productService.hsCodeSectionId.next(section.Id);
    this.productService.hsCodeChapterId.next(chapter.Id);
    this.productService.hsCodeHsNumber.next(hsNumber.HTSNumber);
    this.productService.hsCodeIndent.next(-1);
    this.getHsCode.emit(true);
    if (i === this.openedItemIndex3) {
      this.openedItemIndex3 = -1;
    } else {
      // this.openedItemIndex = -1;
      // this.openedItemIndex2 = -1;
      this.openedItemIndex4 = -1;
      this.openedItemIndex3 = i;
    }
  }

  onOpenAccordion4(i: number, section: any, chapter: any, hsNumber: any, indentId: any) {
    this.productService.hsCodeSectionId.next(section.Id);
    this.productService.hsCodeChapterId.next(chapter.Id);
    this.productService.hsCodeHsNumber.next(hsNumber.HTSNumber);
    this.productService.hsCodeIndent.next(indentId.Indent);
    this.getHsCode.emit(true);
    if (i === this.openedItemIndex4) {
      this.openedItemIndex4 = -1;
    } else {
      // this.openedItemIndex = -1;
      // this.openedItemIndex3 = -1;
      // this.openedItemIndex2 = -1;
      this.openedItemIndex4 = i;
    }
  }

  setHsCode(htsNumber: string, hsCode: any) {
    this.htsNumber.emit(htsNumber);
    this.hsCode.emit(hsCode);
  }
}
