import {
  GET_LANGUAGE_LIST,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_LANGUAGE_LIST_FAILURE,
  PRODUCT_UPLOAD_FILE_SUCCESS,
  PRODUCT_UPLOAD_FILE,
  PRODUCT_UPLOAD_FILE_FAILURE
} from "./actionType"
import axios from "../../config/axios"

//LANGLIST
export const fetchLanguageList = payload => {
  return {
    type: GET_LANGUAGE_LIST,
    payload: payload
  }
}

export const fetchLanguageListSuccess = payload => {
  return {
    type: GET_LANGUAGE_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchLanguageListFailure = payload => {
  return {
    type: GET_LANGUAGE_LIST_FAILURE,
    payload: payload
  }
}

export const getLanguageList = () => async dispatch => {
  dispatch(fetchLanguageList())
  axios
    .get(`/languages`)
    .then(res => {
      dispatch(fetchLanguageListSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(fetchLanguageListFailure({ error: error.response.data.message }))
    })
}
// upload
export const productUploadFile = payload => {
  return {
    type: PRODUCT_UPLOAD_FILE,
    payload: payload
  }
}

export const productUploadFileSuccess = payload => {
  return {
    type: PRODUCT_UPLOAD_FILE_SUCCESS,
    payload: payload
  }
}

export const productUploadFileFailure = payload => {
  return {
    type: PRODUCT_UPLOAD_FILE_FAILURE,
    payload: payload
  }
}

export const uploadFile = (formdata, type, name) => async dispatch => {
  dispatch(productUploadFile())
  axios
    .post(`/upload`, formdata)
    .then(res => {
      dispatch(productUploadFileSuccess({ url: res.data.data.url, type, name }))
    })
    .catch(error => {
      dispatch(productUploadFileFailure({ error: error.response.data.message }))
    })
}
