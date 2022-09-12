import styles from "./ingredientDetails.module.css";
export const IngredientDetails = ({ ingredient }) => {
  return (
    <div className={`${styles.container} pb-15`}>
      <img
        className={`${styles.image} mb-4`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <h3 className={`${styles.name} mb-8 text text_type_main-medium`}>
        {ingredient.name}
      </h3>
      <ul
        className={`${styles.list_propeties} text text_type_main-default text_color_inactive`}
      >
        <li className={`${styles.item} `}>
          <p className={`${styles.property}`}>Калории,ккал</p>
          <p className={`${styles.value}`}>{ingredient.calories}</p>
        </li>
        <li className={`${styles.item} `}>
          <p className={`${styles.property}`}>Белки, г</p>
          <p className={`${styles.value}`}>{ingredient.proteins}</p>
        </li>
        <li className={`${styles.item} `}>
          <p className={`${styles.property}`}>Жиры, г</p>
          <p className={`${styles.value}`}>{ingredient.fat}</p>
        </li>
        <li className={`${styles.item}`}>
          <p className={`${styles.property}`}>Углеводы, г</p>
          <p className={`${styles.value}`}>{ingredient.carbohydrates}</p>
        </li>
      </ul>
    </div>
  );
};
