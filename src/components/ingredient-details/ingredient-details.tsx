import { FC } from 'react';
import { useParams } from 'react-router';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { selectIngredients } from '@slices';
import { useSelector } from 'services/store';

export const IngredientDetails: FC = () => {
  const { ingredients } = useSelector(selectIngredients);
  const { id } = useParams();
  const ingredientData = ingredients.find((value) => value._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
