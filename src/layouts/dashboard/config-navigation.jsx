import SvgColor from 'src/components/svg-color';
import { NAVIGATION_ROUTES } from 'src/routes/navigation-routes';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Customers',
    path: NAVIGATION_ROUTES.customers,
    icon: icon('ic_user'),
  },
  {
    title: 'Employees',
    path: NAVIGATION_ROUTES.employees,
    icon: icon('ic_user'),
  },
];

export default navConfig;
