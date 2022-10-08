import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { SharedService } from '../shared.service';
import { BehaviorSubject } from 'rxjs';
import { TreeItemModel } from '../models/tree-item.model';

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class TreeViewComponent implements OnInit {
  // #region properties

  @Input() treeData = [];
  @Input() multiSelect = false;
  @Input() expanded = false;
  @Input() maxHeight = '150px';
  @Input() ElementId = 1;
  @Input() editItem = new BehaviorSubject<any>(0);
  @Output() selected = new EventEmitter<number[]>();
  direction = 'rtl';
  selectedItems: number[] = [];
  selectedItemsText: string[] = [];
  items: TreeItemModel[] = [];
  filteredItems: TreeItemModel[] = [];
  checkboxes: any[] = [];
  toggle = false;
  changing = false;
  selectedCategories: any = 'انتخاب دسته بندی';

  // #endregion

  constructor(private sharedService: SharedService) {
    this.sharedService.siteDirection.subscribe(direction => {
      this.direction = direction;
    });
  }

  ngOnInit(): void {
    // this.treeData.subscribe(items => {
    //   this.items = items;
    //   this.filteredItems = items;
    // });
    this.items = this.treeData;
    this.filteredItems = this.treeData;
    this.editItem.subscribe(items => {
      if (items !== 0) {
        for (const item of items) {
          this.selectItem(this.findItemById(this.items, +item));
        }
      }
    });
  }

  findItemById(items: TreeItemModel[], id: number): any {
    for (const item of items) {
      if (item.Id === id) {
        return item;
      } else {
        // tslint:disable-next-line:no-non-null-assertion
        const fItem = this.findItemById(item.Childes!, id);
        if (fItem !== null) {
          item.expand = true;
          return fItem;
        }
      }
    }
    return null;
  }

  expandItem(item: TreeItemModel) {
    item.expand = !item.expand;
  }

  selectItem(item: TreeItemModel) {
    if (item == null) {
      return;
    }
    item.selected = true;
    let selectedItems: TreeItemModel[] = [];
    if (!this.multiSelect) {
      selectedItems = this.getSelectedItems(this.filteredItems);
    } else {
      this.unSelectItems(this.items, item);
      if (item.selected) {
        selectedItems.push(item);
      }
    }
    this.selectedItems = [];
    if (selectedItems.length === 0) {
      this.selectedCategories = 'انتخاب دسته بندی';
      this.selected.emit(this.selectedItems);
    } else {
      this.selectedCategories = '';
      for (let i = 0; i < selectedItems.length; i++) {
        // tslint:disable-next-line:no-non-null-assertion
        this.selectedItems.push(selectedItems[i].Id!);
        this.selectedCategories +=
          selectedItems[i].currentName != null ? selectedItems[i].currentName : selectedItems[i].Name;
        if (i < selectedItems.length - 1) {
          this.selectedCategories += ' - ';
        }
      }
      this.selected.emit(this.selectedItems);
    }
  }

  unSelectItems(items: TreeItemModel[], item: TreeItemModel) {
    for (const fItem of items) {
      if (fItem !== item) {
        fItem.selected = false;
      }
      // tslint:disable-next-line:no-non-null-assertion
      this.unSelectItems(fItem.Childes!, item);
    }
  }

  getSelectedItems(items: TreeItemModel[]): TreeItemModel[] {
    const selectedItems: TreeItemModel[] = [];
    for (const item of items.filter(i => i.selected)) {
      selectedItems.push(item);
    }
    for (const item of items) {
      // tslint:disable-next-line:no-non-null-assertion
      for (const subItem of this.getSelectedItems(item.Childes!)) {
        selectedItems.push(subItem);
      }
    }
    return selectedItems;
  }

  filter(text: any, select = false) {
    text = text.value;
    if (text !== '') {
      this.filteredItems = [];
      for (const item of this.items) {
        item.expand = false;
        if (this.filterItem(item, text, select)) {
          this.filteredItems.push(item);
        } else {
          item.expand = false;
        }
      }
    } else {
      for (const item of this.items) {
        item.expand = false;
      }
      this.filteredItems = this.items;
    }
  }

  filterItem(item: TreeItemModel, text: any, select: boolean): boolean {
    let find = false;
    if (
      // tslint:disable-next-line:no-non-null-assertion
      item.currentName!.indexOf(text) !== -1 ||
      item.Id === +text
    ) {
      find = true;
    } else {
      // tslint:disable-next-line:no-non-null-assertion
      for (const subItem of item.Childes!) {
        find = this.filterItem(subItem, text, select);
        if (find) {
          break;
        }
      }
    }
    item.expand = find;
    item.selected = select;
    return find;
  }

  expandTree() {
    this.expanded = !this.expanded;
  }
}
