// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Next Prediction',
    path: '/dashboard/Prediction',
    icon: icon('ic_cart'),
  },
  {
    title: 'Withdraw Request',
    path: '/dashboard/Withdraw',
    icon: icon('ic_blog'),
  },
  {
    title: 'Recharge Request',
    path: '/dashboard/Recharge ',
    icon: icon('ic_blog'),
  },
  {
    title: 'Notice change',
    path: '/dashboard/Notice',
    icon: icon('ic_blog'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
