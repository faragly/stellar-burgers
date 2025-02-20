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
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { useModal } from '../../hooks';

export const AppContent: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { backgroundLocation?: Location };

  const { openModal, closeModal } = useModal({
    closeHandler: () => navigate(-1)
  });

  useEffect(() => {
    if (state?.backgroundLocation) openModal();
  }, [state, openModal]);

  return (
    <Routes location={state?.backgroundLocation || location}>
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
        <Route path='orders' element={<ProfileOrders />} />
        <Route path='profile/orders/:id' element={<OrderInfo />} />
      </Route>
      <Route path='*' element={<NotFound404 />} />
      <Route path='ingredients/:id' element={<IngredientDetails />} />

      {state?.backgroundLocation && (
        <Routes>
          <Route
            path='ingredients/:id'
            element={
              <Modal title='' onClose={closeModal}>
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
            path='profile/orders/:id'
            element={
              <Modal title='' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </Routes>
  );
};
