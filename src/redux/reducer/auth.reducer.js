import {
  AUTH_SIGN_UP,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAILURE,
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_FORGOT_PASSWORD,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_MAIL_CONFIRM,
  AUTH_MAIL_CONFIRM_SUCCESS,
  AUTH_MAIL_CONFIRM_FAILURE,
  AUTH_USER_LOGOUT,
  AUTH_USER_LOGOUT_SUCCESS,
  AUTH_USER_LOGOUT_FAILURE,
  AUTH_CHANGE_PASSWORD,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE
} from "../action/actionType"

let initialState = {
  userData: {},
  signupLoading: false,
  signupError: "",

  loginLoading: false,
  loginError: "",

  forgotPasswordError: "",
  forgotPasswordLoading: false,

  emailVerificationLoading: false,
  emailVerificationError: "",

  changePasswordError: "",
  changePasswordLoading: false
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        signupLoading: true,
        signupError: ""
      }
    case AUTH_SIGN_UP_SUCCESS:
      return {
        ...state,
        signupLoading: false,
        user: action.payload
      }
    case AUTH_SIGN_UP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.payload.error
      }

    case AUTH_LOGIN:
      return {
        ...state,
        loginLoading: true,
        loginError: ""
      }
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false
      }
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error
      }

    case AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordLoading: true,
        forgotPasswordError: ""
      }
    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false
      }
    case AUTH_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload.error
      }

    case AUTH_RESET_PASSWORD:
      return {
        ...state,
        resetPasswordLoading: true,
        resetPasswordError: ""
      }
    case AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false
      }
    case AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload.error
      }
    case AUTH_MAIL_CONFIRM:
      return {
        ...state,
        emailVerificationLoading: true
      }
    case AUTH_MAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        emailVerificationLoading: false
      }
    case AUTH_MAIL_CONFIRM_FAILURE:
      return {
        ...state,
        emailVerificationLoading: false,
        emailVerificationError: action.payload.error
      }
    case AUTH_USER_LOGOUT:
      return {
        ...state,
        logoutLoading: true
      }
    case AUTH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userData: {}
      }
    case AUTH_USER_LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutLoadingError: action.payload.error
      }

    case AUTH_CHANGE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: ""
      }
    case AUTH_CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false
      }
    case AUTH_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: action.payload.error
      }
    default:
      return state
  }
}

export default authReducer
