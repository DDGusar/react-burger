import { getCookie } from "./cookie";

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

export const authRequest = async (email, password) => {
  return request(`${apiConfig.baseURL}auth/login`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
};

export const getAuthToken = async () => {
  return request(`${apiConfig.baseURL}auth/token`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};

export const logOut = async () => {
  return request(`${apiConfig.baseURL}auth/logout`, {
    method: "POST",
    headers: apiConfig.headers,
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
};

export const getUserData = async () => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("authToken"),
    },
  });
};

export const updateUserData = async (name, email, password) => {
  return request(`${apiConfig.baseURL}auth/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("authToken"),
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  });
};

export const modalRoot = document.querySelector("#react-modals");
