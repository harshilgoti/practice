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
} from "./actionType"
import axios from "../../config/axios"

//SIGN UP
export const authSignup = payload => {
  return {
    type: AUTH_SIGN_UP,
    payload: payload
  }
}

export const authSignupSuccess = payload => {
  return {
    type: AUTH_SIGN_UP_SUCCESS,
    payload: payload
  }
}

export const authSignupFailure = payload => {
  return {
    type: AUTH_SIGN_UP_FAILURE,
    payload: payload
  }
}

export const signup = (body, handleSignUpSuccess) => async dispatch => {
  dispatch(authSignup())
  axios
    .post(`/register`, body)
    .then(res => {
      dispatch(authSignupSuccess(res.data))
      localStorage.setItem("user-token", res.data.data.token)
      handleSignUpSuccess && handleSignUpSuccess()
    })
    .catch(error => {
      dispatch(authSignupFailure({ error: error.response.data.errors.message }))
    })
}

//LOGIN

export const authLogin = payload => {
  return {
    type: AUTH_LOGIN,
    payload: payload
  }
}

export const authLoginSuccess = payload => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: payload
  }
}

export const authLoginFailure = payload => {
  return {
    type: AUTH_LOGIN_FAILURE,
    payload: payload
  }
}

export const login = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authLogin())

  axios
    .post(`/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data))
      localStorage.setItem("user-token", res.data.data.token)
      handleLoginSuccess && handleLoginSuccess()
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.errors.message }))
    })
}

//RESET PASSWORD

export const authResetPassword = payload => {
  return {
    type: AUTH_RESET_PASSWORD,
    payload: payload
  }
}

export const authResetPasswordSuccess = payload => {
  return {
    type: AUTH_RESET_PASSWORD_SUCCESS,
    payload: payload
  }
}

export const authResetPasswordFailure = payload => {
  return {
    type: AUTH_RESET_PASSWORD_FAILURE,
    payload: payload
  }
}
export const resetPassword = (
  body,
  token_id,
  handleResetPasswordSuccess
) => async dispatch => {
  dispatch(authResetPassword())
  axios
    .post(`/reset-password`, body)
    .then(res => {
      dispatch(authResetPasswordSuccess(res.data.data))
      handleResetPasswordSuccess && handleResetPasswordSuccess()
    })
    .catch(error => {
      dispatch(
        authResetPasswordFailure({ error: error.response.data.errors.message })
      )
    })
}

//FORGOT PASSWORD
export const authForgotPassword = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD,
    payload: payload
  }
}
export const authForgotPasswordSuccess = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
    payload: payload
  }
}
export const authForgotPasswordFailure = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD_FAILURE,
    payload: payload
  }
}
export const forgotPassword = (
  body,
  handleForgotPasswordSuccess
) => async dispatch => {
  dispatch(authForgotPassword())
  axios
    .post(`/forgot-password`, body)
    .then(res => {
      dispatch(authForgotPasswordSuccess(res.data.data))
      handleForgotPasswordSuccess && handleForgotPasswordSuccess()
    })
    .catch(error => {
      dispatch(
        authForgotPasswordFailure({ error: error.response.data.errors.message })
      )
    })
}

// email verification
export const authMailConfirm = payload => {
  return {
    type: AUTH_MAIL_CONFIRM,
    payload: payload
  }
}
export const authMailConfirmSuccess = payload => {
  return {
    type: AUTH_MAIL_CONFIRM_SUCCESS,
    payload: payload
  }
}
export const authMailConfirmFailure = payload => {
  return {
    type: AUTH_MAIL_CONFIRM_FAILURE,
    payload: payload
  }
}
export const confirmMail = user_id => async dispatch => {
  axios
    .get(`/user/verify/email/${user_id}`)
    .then(res => {
      dispatch(authMailConfirmSuccess())
    })
    .catch(error => {
      dispatch(
        authMailConfirmFailure({ error: error.response.data.errors.message })
      )
    })
}

//LOGOUT

export const authLogout = payload => {
  return {
    type: AUTH_USER_LOGOUT,
    payload: payload
  }
}

export const authLogoutSuccess = payload => {
  return {
    type: AUTH_USER_LOGOUT_SUCCESS,
    payload: payload
  }
}

export const authLogoutFailure = payload => {
  return {
    type: AUTH_USER_LOGOUT_FAILURE,
    payload: payload
  }
}

export const logout = handleLogoutSuccess => async dispatch => {
  axios.get(`/logout`).then(res => {
    if (!res.data.error) {
      dispatch(authLogoutSuccess())
      handleLogoutSuccess()
    }
  })
}
//CHANGE PASSWORD
export const authChangePassword = payload => {
  return {
    type: AUTH_CHANGE_PASSWORD,
    payload: payload
  }
}
export const authChangePasswordSuccess = payload => {
  return {
    type: AUTH_CHANGE_PASSWORD_SUCCESS,
    payload: payload
  }
}
export const authChangePasswordFailure = payload => {
  return {
    type: AUTH_CHANGE_PASSWORD_FAILURE,
    payload: payload
  }
}
export const changePassword = (
  body,
  handleChangePasswordSuccess
) => async dispatch => {
  dispatch(authChangePassword())
  axios
    .post(`/change-password`, body)
    .then(res => {
      dispatch(authChangePasswordSuccess(res.data.data))
      handleChangePasswordSuccess && handleChangePasswordSuccess()
    })
    .catch(error => {
      dispatch(
        authChangePasswordFailure({ error: error.response.data.errors.message })
      )
    })
}
