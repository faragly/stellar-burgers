import { FC, useEffect, useReducer } from 'react';

import { getOrderFeed, selectOrderFeed } from '@slices';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from 'services/store';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const { orderFeed: orders, loading } = useSelector(selectOrderFeed);
  const [refresh, dispatchRefresh] = useReducer((value: number) => value + 1, 0);

  useEffect(() => {
    dispatch(getOrderFeed());
  }, [dispatch, refresh]);

  if (loading) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={dispatchRefresh} />;
};
