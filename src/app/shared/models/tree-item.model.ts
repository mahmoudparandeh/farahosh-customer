export interface TreeItemModel {
  Id?: number;
  Name?: string;
  currentName?: string;
  Childes?: TreeItemModel[];
  PicsPath?: any[];
  expand?: boolean;
  selected?: boolean;
}
