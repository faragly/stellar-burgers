import { FC, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router';
import {
  IngredientDetails,
  OrderInfo,
  ProtectedRoute,
  Modal
} from '@components';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileForm,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useModal } from '../../hooks';
import { useDispatch } from 'services/store';
import { getIngredients } from '@slices';

export const AppContent: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backgroundLocation: Location | null =
    location.state?.background ?? null;

  const { openModal, closeModal } = useModal({
    closeHandler: () => navigate(-1)
  });

  useEffect(() => {
    if (backgroundLocation) openModal();
  }, [backgroundLocation, openModal]);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='' element={<ConstructorPage />} />
        <Route path='feed' element={<Feed />} />
        <Route
          path='login'
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='register'
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='forgot-password'
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='reset-password'
          element={
            <ProtectedRoute onlyUnAuth={true}>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path='orders'>
            <Route index element={<ProfileOrders />} />
            <Route path=':number' element={<OrderInfo />} />
          </Route>
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route path='ingredients/:id' element={<IngredientDetails />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={closeModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='feed/:id'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='profile/orders/:number'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};
