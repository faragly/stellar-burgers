import { FC } from 'react';
import { useNavigate } from 'react-router';
import { NavItem } from '../nav-item';
import { useDispatch } from 'services/store';
import { logoutUser } from '@slices';

import styles from './profile-nav.module.css';

const NAVIGATION_ITEMS = {
  profile: {
    to: '/profile',
    title: 'Профиль'
  },
  orders: {
    to: '/profile/orders',
    title: 'История заказов'
  }
};

export const ProfileNav: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <nav>
        <ul className={styles.list}>
          {Object.entries(NAVIGATION_ITEMS).map(([key, item]) => (
            <li className={styles.item} key={key}>
              <NavItem {...item} size={'medium'} />
            </li>
          ))}
          <li className={styles.item} key={'logout'}>
            <div onClick={() => handleLogout()}>
              <NavItem to={''} title={'Выход'} size={'medium'} />
            </div>
          </li>
        </ul>
      </nav>
      <span className={'text text_type_main-default text_color_inactive'}>
        В этом разделе вы можете
        <br />
        изменить свои персональные данные
      </span>
    </div>
  );
};
