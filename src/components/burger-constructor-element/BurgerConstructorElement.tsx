import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burgerConstructorElement.module.css";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useDrop, useDrag } from "react-dnd";
import { useRef, FC } from "react";
import {
  swapIngredient,
  deleteIngredient,
} from "../../services/actions/currentIngredients";
import { TConstructorIngredient } from "../../services/types/data";

type TConstructorIngredientProps = {
  item: TConstructorIngredient;
  index: number;
};

export const BurgerConstructorElement: FC<TConstructorIngredientProps> = ({
  item,
  index,
}) => {
  const dispatch = useDispatch();

  const [{ opacity }, dragRef] = useDrag({
    type: "currentIngredient",
    item: { item, index },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const [, dropRef] = useDrop<TConstructorIngredientProps, void>({
    accept: "currentIngredient",
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const clientOffset = monitor.getClientOffset();

      if (hoverBoundingRect !== undefined && clientOffset !== null) {
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const hoverActualY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;

        if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;
      }
      dispatch(swapIngredient(dragIndex, hoverIndex));
      item.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <li
      draggable
      ref={(ref) => {
        dragRef(dropRef(ref));
      }}
      style={{ opacity }}
      className={`${styles.item__topping} pb-4`}
      key={item.data._id}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.data.name}
        price={item.data.price}
        thumbnail={item.data.image}
        handleClose={() => {
          dispatch(deleteIngredient(item));
        }}
      />
    </li>
  );
};
