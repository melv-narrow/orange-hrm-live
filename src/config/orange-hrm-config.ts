export interface Credentials {
  username: string;
  password: string;
}

export interface ModuleExpectation {
  menuItem: string;
  expectedUrl: RegExp;
  heading: string;
  buttons: string[];
  labels: string[];
}

export const BASE_URL = 'https://opensource-demo.orangehrmlive.com';
export const LOGIN_PATH = '/web/index.php/auth/login';
export const DASHBOARD_PATH = '/web/index.php/dashboard/index';
export const PASSWORD_RESET_PATH = '/web/index.php/auth/requestPasswordResetCode';
export const AUTH_STATE_PATH = 'playwright/.auth/orange-hrm-admin.json';

export const APP_CREDENTIALS: Credentials = {
  username: process.env.ORANGE_HRM_USERNAME ?? 'Admin',
  password: process.env.ORANGE_HRM_PASSWORD ?? 'admin123',
};

export const LOGIN_VERSION_PATTERN = /OrangeHRM OS \d+\.\d+/;

export const CORE_DASHBOARD_WIDGETS = [
  'Time at Work',
  'My Actions',
  'Quick Launch',
  'Buzz Latest Posts',
  'Employees on Leave Today',
  'Employee Distribution by Sub Unit',
  'Employee Distribution by Location',
] as const;

export const CRITICAL_MENU_ITEMS = [
  'Admin',
  'PIM',
  'Leave',
  'Dashboard',
  'Directory',
  'Buzz',
] as const;

export const MODULE_EXPECTATIONS: ModuleExpectation[] = [
  {
    menuItem: 'Admin',
    expectedUrl: /\/web\/index\.php\/admin\/viewSystemUsers$/,
    heading: 'Admin',
    buttons: ['Reset', 'Search'],
    labels: ['Username', 'User Role', 'Employee Name', 'Status'],
  },
  {
    menuItem: 'PIM',
    expectedUrl: /\/web\/index\.php\/pim\/viewEmployeeList$/,
    heading: 'PIM',
    buttons: ['Reset', 'Search'],
    labels: ['Employee Name', 'Employee Id', 'Employment Status', 'Supervisor Name'],
  },
  {
    menuItem: 'Leave',
    expectedUrl: /\/web\/index\.php\/leave\/viewLeaveList$/,
    heading: 'Leave',
    buttons: ['Reset', 'Search'],
    labels: ['From Date', 'To Date', 'Leave Type', 'Employee Name'],
  },
  {
    menuItem: 'Directory',
    expectedUrl: /\/web\/index\.php\/directory\/viewDirectory$/,
    heading: 'Directory',
    buttons: ['Reset', 'Search'],
    labels: ['Employee Name', 'Job Title', 'Location'],
  },
  {
    menuItem: 'Buzz',
    expectedUrl: /\/web\/index\.php\/buzz\/viewBuzz$/,
    heading: 'Buzz',
    buttons: ['Post', 'Share Photos', 'Share Video'],
    labels: [],
  },
];
