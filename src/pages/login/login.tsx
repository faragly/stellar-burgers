import { FC, SyntheticEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'services/store';
import { fetchUser, loginUser, selectUserError } from '@slices';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectUserError);
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    try {
      await dispatch(loginUser({ email, password })).unwrap();
      await dispatch(fetchUser()).unwrap();
      const from = location.state?.from || { pathname: '/' };
      navigate(from);
    } catch (err) {
      console.error(
        `Failed to complete the request: ${(err as Error).message}`
      );
    }
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
