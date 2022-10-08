// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  moduleName: string;
  icon: string;
  class: string;
  groupTitle: boolean;
  hasBadge: boolean;
  count: number;
  submenu: RouteInfo[];
}
