import { NavItem } from './nav-item/nav-item';



export const clientGuestNavItems: NavItem[] = [
  {
    displayName: 'Home',
    iconName: 'home',
    route: 'client',
  },
  {
    displayName: 'Our projets',
    iconName: 'cash',
    route: 'client/projects',
  },
  {
    displayName: 'Contact us',
    iconName: 'phone',
    route: 'client/contact',
  },
];

export const clientUserNavItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: 'dashboard',
  },
  {
    displayName: 'Home',
    iconName: 'home',
    route: 'client',
  },
  {
    displayName: 'Projets',
    iconName: 'cash',
    route: 'client/projects',
  },
  {
    displayName: 'Contact us',
    iconName: 'phone',
    route: 'client/contact',
  },
];

export const dashboardUserNavItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: 'dashboard',
  },
  {
    displayName: 'Projects',
    iconName: 'cash',
    route: 'dashboard/projects',
  },
];

export const dashboardAdminNavItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: 'dashboard',
  },
  {
    displayName: 'Projects',
    iconName: 'cash',
    route: 'dashboard/projects',
  },
  {
    displayName: 'Our pages',
    iconName: 'book',
    route: 'dashboard/page-contents',
  },
  {
    displayName: 'Our partners',
    iconName: 'building',
    route: 'dashboard/partners',
  },
  {
    displayName: 'Testimonials',
    iconName: 'stars',
    route: 'dashboard/testmonials',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'archive',
    route: 'dashboard/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'info-circle',
    route: 'dashboard/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list-details',
    route: 'dashboard/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'file-text',
    route: 'dashboard/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'file-text-ai',
    route: 'dashboard/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'clipboard-text',
    route: 'dashboard/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'table',
    route: 'dashboard/ui-components/tables',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'login',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: 'dashboard/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'brand-dribbble',
    route: 'dashboard/extra/sample-page',
  },
];
