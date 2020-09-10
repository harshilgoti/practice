import {
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILURE,
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  USER_CREATE_EXTRA_FIELD,
  USER_CREATE_EXTRA_FIELD_SUCCESS,
  USER_CREATE_EXTRA_FIELD_FAILURE,
  UPDATE_USER_STATIC_XP_SUCCESS,
  TOGGLE_PRODUCT_BACKLOG_WELCOME_POPUP
} from "./actionType"
import axios from "../../config/axios"

//FETCH USER DETAILS

export const fetchUserDetails = payload => {
  return {
    type: FETCH_USER_DETAILS,
    payload: payload
  }
}

export const fetchUserDetailsSuccess = payload => {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    payload: payload
  }
}

export const fetchUserDetailsFailure = payload => {
  return {
    type: FETCH_USER_DETAILS_FAILURE,
    payload: payload
  }
}

export const getUserDetails = () => async dispatch => {
  dispatch(fetchUserDetails())
  axios
    .get(`/user-profile`)
    .then(res => {
      dispatch(fetchUserDetailsSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(fetchUserDetailsFailure({ error: error.response.data.message }))
    })
}

//EDIT USER PROFILE
export const editUserProfile = payload => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: payload
  }
}

export const editUserProfileSuccess = payload => {
  return {
    type: UPDATE_USER_PROFILE_SUCCESS,
    payload: payload
  }
}

export const editUserProfileFailure = payload => {
  return {
    type: UPDATE_USER_PROFILE_FAILURE,
    payload: payload
  }
}

export const updateUserProfile = (
  body,
  handleOpenSelectUserType
) => async dispatch => {
  dispatch(editUserProfile())
  axios
    .put(`/user-profile`, body)
    .then(res => {
      dispatch(editUserProfileSuccess(res.data.data))
      handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(editUserProfileFailure({ error: error.response.data.message }))
    })
}
/////user/extra/field/create

export const userCreateExtraField = payload => {
  return {
    type: USER_CREATE_EXTRA_FIELD,
    payload: payload
  }
}

export const userCreateExtraFieldSuccess = payload => {
  return {
    type: USER_CREATE_EXTRA_FIELD_SUCCESS,
    payload: payload
  }
}

export const userCreateExtraFieldFailure = payload => {
  return {
    type: USER_CREATE_EXTRA_FIELD_FAILURE,
    payload: payload
  }
}

export const craeteExtraField = (
  body,
  userCreateExtraFieldSuccessCallBack
) => async dispatch => {
  dispatch(userCreateExtraField())

  axios
    .post(`/user-profile-extra-fields`, body)
    .then(res => {
      dispatch(userCreateExtraFieldSuccess(res.data.data))
      userCreateExtraFieldSuccessCallBack &&
        userCreateExtraFieldSuccessCallBack()
    })
    .catch(error => {
      console.error("error", error)
      dispatch(
        userCreateExtraFieldFailure({ error: error.response.data.message })
      )
    })
}

//update static xp of user as per on boarded
export const userUpdateStaticXpOnBoardedSuccess = payload => {
  return {
    type: UPDATE_USER_STATIC_XP_SUCCESS,
    payload: payload
  }
}
export const toggleProductBacklogWelcomePopup = payload => {
  return {
    type: TOGGLE_PRODUCT_BACKLOG_WELCOME_POPUP,
    payload: payload
  }
}
