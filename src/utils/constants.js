const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const dataRequest = async () => {
  const res = await fetch(`${apiConfig.baseURL}ingredients`);
  return getResponse(res);
};

export const orderRequest = async (orderData) => {
  const res = await fetch(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      ingredients: orderData,
    }),
  });
  return getResponse(res);
};

export const modalRoot = document.querySelector("#react-modals");
