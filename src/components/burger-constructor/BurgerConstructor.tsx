import React, { useMemo, FC } from "react";
import { useDispatch } from "../../services/hooks/useDispatch";
import { useSelector } from "../../services/hooks/useSelector";
import { useDrop } from "react-dnd";
import styles from "./burgerConstructor.module.css";
import {
  CurrencyIcon,
  Button,
  ConstructorElement,
} from "@ya.praktikum/react-developer-burger-ui-components";
import {
  addIngredient,
  addBun,
} from "../../services/actions/currentIngredients";
import { BurgerConstructorElement } from "../burger-constructor-element/BurgerConstructorElement";
import * as selectors from "../../services/selectors";
import { TIngredient, TConstructorIngredient } from "../../services/types/data";

type TBurgerConstructorProps = {
  openModalOrder: () => void;
};

const BurgerConstructor: FC<TBurgerConstructorProps> = ({ openModalOrder }) => {
  const dispatch = useDispatch();

  const ingredients = useSelector(selectors.currentIngredients);
  const bun = useSelector(selectors.currentBun);
  const totalPrice = useSelector(selectors.totalPrice);

  const otherIngredients = useMemo(
    () => ingredients.filter((item: TIngredient) => item.type !== "bun"),
    [ingredients]
  );

  const [{ isHover }, dropTarget] = useDrop<
    { item: TIngredient },
    void,
    { isHover: boolean }
  >({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      if (item.item.type === "bun") {
        dispatch(addBun(item.item));
      } else {
        dispatch(addIngredient(item.item));
      }
    },
  });

  const isDisabledButton = useMemo(() => {
    return !(ingredients.length > 0 && bun);
  }, [ingredients, bun]);

  return (
    <section
      className={`${styles.constructor} ${isHover ? styles.onHover : ""}
       pt-25 pl-4`}
      ref={dropTarget}
    >
      <div className={styles.ingredients}>
        {bun && (
          <div className="pl-8">
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}

        <ul className={`${styles.list_toppings} pr-3`}>
          {!bun && otherIngredients.length === 0 && (
            <div className={styles.hint}>
              <p className="text text_type_main-medium">
                Перенесите ингредиенты сюда, чтобы&nbsp;собрать&nbsp;бургер
              </p>
            </div>
          )}
          {!bun && otherIngredients.length > 0 && (
            <div className={styles.hint}>
              <p className="text text_type_main-medium mb-4">Добавьте булку</p>
            </div>
          )}
          {bun && otherIngredients.length === 0 && (
            <div className={styles.hint}>
              <p className="text text_type_main-medium">Добавьте начинку</p>
            </div>
          )}

          {useMemo(
            () =>
              otherIngredients.map(
                (item: TConstructorIngredient, index: number) => (
                  <BurgerConstructorElement
                    key={item.uid}
                    item={item}
                    index={index}
                  />
                )
              ),
            [otherIngredients]
          )}
        </ul>

        {bun && (
          <div className="pl-8">
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          </div>
        )}
      </div>
      <div className={`${styles.order} pt-10 pr-3`}>
        <div className={`${styles.total__price} pr-10`}>
          <p className={` text text_type_digits-medium`}>{`${totalPrice}`}</p>

          <CurrencyIcon type="primary" />
        </div>

        <Button
          htmlType="button"
          type="primary"
          disabled={isDisabledButton}
          size="large"
          onClick={openModalOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </section>
  );
};
export default BurgerConstructor;
