import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructorElement.module.css";
import PropTypes from "prop-types";
import { ingredientType } from "../../utils/types";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import {
  swapIngredient,
  deleteIngredient,
} from "../../services/actions/currentIngredients";
export const BurgerConstructorElement = ({ item, index }) => {
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: "currentIngredient",
    item: { item, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, dropRef] = useDrop({
    accept: "currentIngredient",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      dispatch(swapIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <li
      draggable
      ref={dragDropRef}
      style={{ opacity }}
      className={`${styles.item__topping} pb-4`}
      key={item._id}
    >
      <DragIcon />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => {
          dispatch(deleteIngredient(item));
        }}
      />
    </li>
  );
};

BurgerConstructorElement.propTypes = {
  item: ingredientType.isRequired,
  index: PropTypes.number,
};
