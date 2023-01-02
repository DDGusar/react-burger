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

export const userRequest = async (email, password, name) => {
  return request(`${apiConfig.baseURL}auth/register`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const forgotPasswordRequest = async (email) => {
  return request(`${apiConfig.baseURL}password-reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const resetPasswordRequest = async (password, token) => {
  return request(`${apiConfig.baseURL}password-reset/reset`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export const modalRoot = document.querySelector("#react-modals");
