import PropTypes from "prop-types";
export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.oneOf(["bun", "main", "sauce"]),
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const orderType = PropTypes.shape({
  createdAt: PropTypes.string,
  ingredients: PropTypes.array,
  name: PropTypes.string,
  number: PropTypes.number,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
  _id: PropTypes.string,
});
