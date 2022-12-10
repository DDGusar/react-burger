const apiConfig = {
  baseURL: "https://norma.nomoreparties.space/api/",
  headers: {
    "Content-type": "application/json",
  },
};

async function request(url, options) {
  const res = await fetch(url, options);
  return getResponse(res);
}

const getResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const dataRequest = async () => {
  return request(`${apiConfig.baseURL}ingredients`);
};

export const orderRequest = async (orderData) => {
  return request(`${apiConfig.baseURL}orders`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      ingredients: orderData,
    }),
  });
};

export const modalRoot = document.querySelector("#react-modals");
