import { PropsWithChildren, FC, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from 'services/store';
import { fetchUser, selectUser, selectUserLoadingState } from '@slices';

interface Props {
  onlyUnAuth?: boolean;
}

export type ProtectedRouteProps = PropsWithChildren<Props>;

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth = false,
  children
}) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserLoadingState);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' replace state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return children;
};
