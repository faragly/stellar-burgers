import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router';

import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from 'services/store';
import {
  clearIngredients,
  clearOrder,
  postOrder,
  selectBurgerConstructor,
  selectOrder,
  selectUser
} from '@slices';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(selectBurgerConstructor);
  const { order: orderModalData, loading: orderRequest } =
    useSelector(selectOrder);

  const onOrderClick = async () => {
    if (!user) return navigate('/login');
    if (!constructorItems.bun || orderRequest) return;

    const orderIngredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    try {
      await dispatch(postOrder(orderIngredients)).unwrap();
      dispatch(clearIngredients());
    } catch (err) {
      console.error(
        `Failed to complete the request: ${(err as Error).message}`
      );
    }
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
    navigate('/', { replace: true });
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
