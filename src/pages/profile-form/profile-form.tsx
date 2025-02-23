import { FC, SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';
import { selectUser, updateUser } from '@slices';
import { Preloader } from '@ui';
import { ProfileFormUI } from '@ui-pages';
import { useDispatch, useSelector } from 'services/store';

export const ProfileForm: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [formValue, setFormValue] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: ''
  });

  useEffect(() => {
    setFormValue((state) => ({
      ...state,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  if (!user) return <Preloader />;

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
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
    />
  );
};
