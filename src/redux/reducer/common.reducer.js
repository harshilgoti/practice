import {
  GET_LANGUAGE_LIST,
  GET_LANGUAGE_LIST_SUCCESS,
  GET_LANGUAGE_LIST_FAILURE,
  PRODUCT_UPLOAD_FILE_SUCCESS,
  PRODUCT_UPLOAD_FILE,
  PRODUCT_UPLOAD_FILE_FAILURE
} from "../action/actionType"

let initialState = {
  fetchLanguageListLoading: false,
  languagesList: [],
  attachmentList: [],
  uploadFileLoading: false
}

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGE_LIST:
      return {
        ...state,
        fetchLanguageListLoading: true,
        signupError: ""
      }
    case GET_LANGUAGE_LIST_SUCCESS:
      return {
        ...state,
        fetchLanguageListLoading: false,
        languagesList: action.payload
      }
    case GET_LANGUAGE_LIST_FAILURE:
      return {
        ...state,
        fetchLanguageListLoading: false,
        signupError: action.payload.error
      }
    case PRODUCT_UPLOAD_FILE:
      return {
        ...state,
        uploadFileLoading: true
      }
    case PRODUCT_UPLOAD_FILE_SUCCESS: {
      const { url, type, name } = action.payload
      let updatedAttchmentList = state.attachmentList
      updatedAttchmentList.push({ url: url, file_type: type, file_name: name })

      return {
        ...state,
        uploadFileLoading: false,
        attachmentList: updatedAttchmentList
      }
    }
    case PRODUCT_UPLOAD_FILE_FAILURE:
      return {
        ...state,
        uploadFileLoading: false
      }
    default:
      return state
  }
}

export default commonReducer
