import styles from "./ingredientDetails.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as selectors from "../../services/selectors";
export const IngredientDetails = () => {
  const { id } = useParams();
  const ingredients = useSelector(selectors.ingredients);
  const ingredient = ingredients.find((el) => el._id === id);
  return (
    ingredient && (
      <div className={`${styles.container} pb-15 ml-15 mr-15`}>
        <img
          className={`${styles.image} mb-4`}
          src={ingredient.image}
          alt={ingredient.name}
        />
        <h3 className={`${styles.name} mb-8 text text_type_main-medium`}>
          {ingredient.name}
        </h3>
        <ul
          className={`${styles.list_properties} text text_type_main-default text_color_inactive`}
        >
          <li className={`${styles.item} `}>
            <p className={`${styles.property} pb-2`}>Калории,ккал</p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.calories}
            </p>
          </li>
          <li className={`${styles.item} `}>
            <p className={`${styles.property} pb-2`}>Белки, г</p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.proteins}
            </p>
          </li>
          <li className={`${styles.item} `}>
            <p className={`${styles.property} pb-2`}>Жиры, г</p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.fat}
            </p>
          </li>
          <li className={`${styles.item}`}>
            <p className={`${styles.property} pb-2`}>Углеводы, г</p>
            <p className={`${styles.value} text text_type_digits-default`}>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    )
  );
};
