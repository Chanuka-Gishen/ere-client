import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';
import { NAVBAR_ITEMS } from './common/navigation-names';

import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import ListIcon from '@mui/icons-material/List';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: 'Dashboard',
    name: NAVBAR_ITEMS.DASHBOARD,
    path: '',
    icon: <DashboardIcon />,
    adminOnly: false,
  },
  {
    title: 'Customers',
    name: NAVBAR_ITEMS.CUSTOMERS,
    path: NAVIGATION_ROUTES.customers,
    icon: <GroupIcon />,
    adminOnly: true,
  },
  {
    title: 'Work Orders',
    name: NAVBAR_ITEMS.WORKORDERS,
    path: NAVIGATION_ROUTES.work_orders,
    icon: <ListIcon />,
    adminOnly: true,
  },
  {
    title: 'Invoices',
    name: NAVBAR_ITEMS.INVOICES,
    path: NAVIGATION_ROUTES.invoices,
    icon: <RequestQuoteIcon />,
    adminOnly: true,
  },
  {
    title: 'Employees',
    name: NAVBAR_ITEMS.EMPLOYEES,
    path: NAVIGATION_ROUTES.employees,
    icon: <PeopleOutlineIcon />,
    adminOnly: true,
  },
];

export default navConfig;
