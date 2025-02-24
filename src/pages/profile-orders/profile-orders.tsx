import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'services/store';
import { Preloader } from '@ui';
import { getOrderHistory, selectOrderHistory } from '@slices';
import { OrdersList } from '@components';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector(selectOrderHistory);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <OrdersList orders={orders} />;
};
