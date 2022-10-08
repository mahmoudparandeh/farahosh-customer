import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'پروفایل',
    moduleName: 'profile',
    icon: 'fas fa-user',
    class: '',
    groupTitle: false,
    hasBadge: false,
    count: 0,
    submenu: [],
  },
  {
    path: 'fa/address',
    title: 'مدیریت آدرس',
    moduleName: 'address',
    icon: 'fa fa-map-marker',
    class: '',
    groupTitle: false,
    hasBadge: false,
    count: 0,
    submenu: [],
  },
  {
    path: 'fa/ticket-list',
    title: 'مدیریت RFQ',
    moduleName: 'RFQ',
    icon: 'fas fa-envelope',
    class: '',
    groupTitle: false,
    hasBadge: false,
    count: 0,
    submenu: [],
  },
];
