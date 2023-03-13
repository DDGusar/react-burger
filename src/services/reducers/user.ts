import {
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILED,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILED,
  UPDATE_TOKEN_REQUEST,
  UPDATE_TOKEN_SUCCESS,
  UPDATE_TOKEN_FAILED,
  EXIT_REQUEST,
  EXIT_SUCCESS,
  EXIT_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,
  TUserActions,
} from "../actions/user";

import { TUser } from "../types/data";

type TInitialState = {
  user: TUser | null;

  authRequest: boolean;
  authSuccess: boolean;
  authFailed: boolean;

  registerRequest: boolean;
  registerSuccess: boolean;
  registerFailed: boolean;

  userRequest: boolean;
  userSuccess: boolean;
  userFailed: boolean;

  updateRequest: boolean;
  updateSuccess: boolean;
  updateFailed: boolean;

  tokenRequest: boolean;
  tokenSuccess: boolean;
  tokenFailed: boolean;

  forgotPasswordRequest: boolean;
  forgotPasswordFailed: boolean;
  forgotPasswordSuccess: boolean;

  resetPasswordRequest: boolean;
  resetPasswordFailed: boolean;
  resetPasswordSuccess: boolean;

  exitRequest: boolean;
  exitSuccess: boolean;
  exitFailed: boolean;

  expiredToken: boolean;
};

const initialState: TInitialState = {
  user: null,
  registerRequest: false,
  registerFailed: false,
  registerSuccess: false,

  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  forgotPasswordSuccess: false,

  resetPasswordRequest: false,
  resetPasswordFailed: false,
  resetPasswordSuccess: false,

  authRequest: false,
  authSuccess: false,
  authFailed: false,

  tokenRequest: false,
  tokenSuccess: false,
  tokenFailed: false,

  exitRequest: false,
  exitSuccess: false,
  exitFailed: false,

  userRequest: false,
  userSuccess: false,
  userFailed: false,

  updateRequest: false,
  updateSuccess: false,
  updateFailed: false,

  expiredToken: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): TInitialState => {
  switch (action.type) {
    case REGISTRATION_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case REGISTRATION_SUCCESS: {
      return {
        ...state,
        registerRequest: false,
        user: action.user,
        registerFailed: false,
        registerSuccess: true,
      };
    }
    case REGISTRATION_FAILED: {
      return {
        ...state,
        registerRequest: false,
        registerFailed: true,
      };
    }
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
      };
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,
        forgotPasswordRequest: false,
        forgotPasswordSuccess: action.forgotPasswordSuccess,
      };
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true,
        forgotPasswordRequest: false,
      };
    }
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
      };
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,
        resetPasswordRequest: false,
        resetPasswordSuccess: action.resetPasswordSuccess,
      };
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true,
        resetPasswordRequest: false,
      };
    }
    case AUTH_REQUEST: {
      return {
        ...state,
        authRequest: true,
      };
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        authRequest: false,
        authSuccess: true,
        authFailed: false,
        user: action.user,
      };
    }
    case AUTH_FAILED: {
      return {
        ...state,
        authRequest: false,
        authFailed: true,
      };
    }
    case UPDATE_TOKEN_REQUEST: {
      return {
        ...state,
        tokenRequest: true,
      };
    }
    case UPDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        tokenRequest: false,
        tokenSuccess: true,
        tokenFailed: false,
        expiredToken: false,
      };
    }
    case UPDATE_TOKEN_FAILED: {
      return {
        ...state,
        tokenRequest: false,
        tokenFailed: true,
        expiredToken: false,
      };
    }
    case EXIT_REQUEST: {
      return {
        ...state,
        exitRequest: true,
      };
    }
    case EXIT_SUCCESS: {
      return {
        ...state,
        exitRequest: false,
        exitSuccess: true,
        exitFailed: false,
        user: null,
      };
    }
    case EXIT_FAILED: {
      return {
        ...state,
        exitRequest: false,
        exitFailed: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userSuccess: true,
        userFailed: false,
        user: action.user,
      };
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        userRequest: false,
        userFailed: true,
        expiredToken: true,
      };
    }

    case UPDATE_USER_REQUEST: {
      return {
        ...state,
        updateRequest: true,
      };
    }
    case UPDATE_USER_SUCCESS: {
      return {
        ...state,
        updateRequest: false,
        updateSuccess: true,
        updateFailed: false,
        user: action.user,
      };
    }
    case UPDATE_USER_FAILED: {
      return {
        ...state,
        updateRequest: false,
        updateFailed: true,
        expiredToken: true,
      };
    }

    default: {
      return state;
    }
  }
};
