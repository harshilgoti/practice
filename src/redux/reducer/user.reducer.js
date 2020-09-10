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
} from "../action/actionType"

let initialState = {
  userDetails: {},
  updateUserProfileLoading: false,

  fetchingUserDetailsLoading: false,
  fetchingUserDetailsError: "",

  userCreateExtraFieldLoading: false,
  userCreateExtraFieldError: "",
  userPermissions: [],

  //static put for on boarded workspace
  isShowUpdateLevelPopup: false,
  userXp: 0,
  userLevel: 0,

  isShowProductBacklogWelcomePopup: true
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_DETAILS:
      return {
        ...state,
        fetchingUserDetailsLoading: true,
        updateUserProfileError: ""
      }
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingUserDetailsLoading: false,
        userDetails: action.payload
      }
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingUserDetailsLoading: false,
        fetchingUserDetailsError: action.payload.error
      }
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        updateUserProfileLoading: true,
        updateUserProfileError: ""
      }
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        //for static field false to close update level popup
        isShowUpdateLevelPopup: !action.payload.is_workspace_onboarded
          ? true
          : false,
        updateUserProfileLoading: false,
        userDetails: action.payload
      }
    case UPDATE_USER_PROFILE_FAILURE:
      return {
        ...state,
        updateUserProfileLoading: false,
        updateUserProfileError: action.payload.error
      }
    case USER_CREATE_EXTRA_FIELD:
      return {
        ...state,
        userCreateExtraFieldLoading: true,
        userCreateExtraFieldError: ""
      }
    case USER_CREATE_EXTRA_FIELD_SUCCESS:
      return {
        ...state,
        userCreateExtraFieldLoading: false
      }
    case USER_CREATE_EXTRA_FIELD_FAILURE:
      return {
        ...state,
        userCreateExtraFieldLoading: false,
        userCreateExtraFieldError: action.payload.error
      }

    case UPDATE_USER_STATIC_XP_SUCCESS:
      return {
        ...state,
        isShowUpdateLevelPopup: !state.userDetails.is_workspace_onboarded
          ? true
          : false,
        userXp: 105,
        userLevel: 1
      }
    case TOGGLE_PRODUCT_BACKLOG_WELCOME_POPUP:
      return {
        ...state,
        isShowProductBacklogWelcomePopup: false
      }
    default:
      return state
  }
}

export default userReducer
