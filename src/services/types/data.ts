export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: "bun" | "sauce" | "main";
  __v: number;
  _id: string;
  key: string;
};
export type TConstructorIngredient = {
  data: TIngredient;
  uid: string;
};
export type TOrder = {
  createdAt: string;
  ingredients: Array<string>;
  name: string;
  number: number;
  owner: { name: string; email: string; createdAt: string; updatedAt: string };
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
};
export type TGetIngredients = {
  data: Array<TIngredient>;
  success: boolean;
};
export type TPostOrder = {
  name: string;
  order: TOrder;
  success: boolean;
};
export type TGetUser = {
  success: boolean;
  user: { email: string; name: string };
};
export type TChangePassAndLogout = {
  success: boolean;
  message: string;
};
export type TUserInfo = {
  success: boolean;
  user: { email: string; name: string };
  refreshToken: string;
  accessToken: string;
};
export type TIngredientsIdArray = Array<string>;
export type TUser = { email: string; name: string };
export type TLocation = {
  hash: string;
  pathname: string;
  search: string;
  state: object;
  from?: string;
  background: {
    pathname: string;
    search: string;
    hash: string;
    state: null;
    key: string;
  };
};
