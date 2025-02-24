import { FC, SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import { selectUser, selectUserError, updateUser } from '@slices';
import { Preloader } from '@ui';
import { ProfileFormUI } from '@ui-pages';
import { useDispatch, useSelector } from 'services/store';

export const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const error = useSelector(selectUserError);
  const name = user?.name ?? '';
  const email = user?.email ?? '';
  const [formValue, setFormValue] = useState({ name, email, password: '' });

  useEffect(() => {
    setFormValue((state) => ({ ...state, name, email }));
  }, [user]);

  if (!user) return <Preloader />;

  const isFormChanged =
    formValue.name !== name ||
    formValue.email !== email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({ ...user, password: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileFormUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      updateUserError={error || ''}
    />
  );
};
