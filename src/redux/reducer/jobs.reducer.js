import {
  FETCH_COMPANIES_AND_ROLES_LIST,
  FETCH_COMPANIES_AND_ROLES_LIST_SUCCESS,
  FETCH_COMPANIES_AND_ROLES_LIST_FAILURE,
  FETCH_ACTIVE_WORKSPACES_LIST,
  FETCH_ACTIVE_WORKSPACES_LIST_SUCCESS,
  FETCH_ACTIVE_WORKSPACES_LIST_FAILURE,
  FETCH_ROLE_DETAILS_BY_ID,
  FETCH_ROLE_DETAILS_BY_ID_SUCCESS,
  FETCH_ROLE_DETAILS_BY_ID_FAILURE,
  USER_BEGIN_PROJECT,
  USER_BEGIN_PROJECT_SUCCESS,
  USER_BEGIN_PROJECT_FAILURE,
  FETCH_PROJECT_DETAILS_BY_ID,
  FETCH_PROJECT_DETAILS_BY_ID_SUCCESS,
  FETCH_PROJECT_DETAILS_BY_ID_FAILURE,
  USER_UPDATE_TICKET,
  USER_UPDATE_TICKET_SUCCESS,
  USER_UPDATE_TICKET_FAILURE,
  USER_CODE_UPLOAD,
  USER_CODE_UPLOAD_SUCCESS,
  USER_CODE_UPLOAD_FAILURE,
  USER_UPDATE_PROJECT,
  USER_UPDATE_PROJECT_SUCCESS,
  USER_UPDATE_PROJECT_FAILURE
} from "../action/actionType"

let initialState = {
  fetchCompaniesAndRolesListLoading: false,
  companiesAndRolesList: [],
  fetchCompaniesAndRolesListError: "",

  fetchActiveWorkspacesListLoading: false,
  fetchActiveWorkspacesList: [],
  fetchActiveWorkspacesListError: "",

  beginProjectLoading: false,
  beginProjectError: "",

  userCodeUploadError: "",
  userCodeUploadLoading: false,

  fetchTicketSubmissionListaLoading: false,
  ticketSubmissionList: [],
  fetchTicketSubmissionListError: "",
  isCompaniesAndRolesListLoaded: false,

  userUpdateProjectError: "",
  userUpdateProjectLoading: false,

  fetchRoleDetailsLoading: false,
  currentRoleDetails: {},

  createSprintsLoading: false,

  productDetailsById: {}
}

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMPANIES_AND_ROLES_LIST:
      return {
        ...state,
        fetchCompaniesAndRolesListLoading: true,
        fetchCompaniesAndRolesListError: ""
      }
    case FETCH_COMPANIES_AND_ROLES_LIST_SUCCESS:
      return {
        ...state,
        isCompaniesAndRolesListLoaded: true,
        fetchCompaniesAndRolesListLoading: false,
        companiesAndRolesList: action.payload
      }
    case FETCH_COMPANIES_AND_ROLES_LIST_FAILURE:
      return {
        ...state,
        isCompaniesAndRolesListLoaded: true,
        fetchCompaniesAndRolesListLoading: false,
        fetchCompaniesAndRolesListError: action.payload.error
      }
    case FETCH_ACTIVE_WORKSPACES_LIST:
      return {
        ...state,
        fetchActiveWorkspacesListLoading: true
      }
    case FETCH_ACTIVE_WORKSPACES_LIST_SUCCESS:
      return {
        ...state,
        fetchActiveWorkspacesListLoading: false,
        fetchActiveWorkspacesList: action.payload
      }
    case FETCH_ACTIVE_WORKSPACES_LIST_FAILURE:
      return {
        ...state,
        fetchActiveWorkspacesListLoading: false,
        fetchActiveWorkspacesListError: action.payload.error
      }
    case FETCH_ROLE_DETAILS_BY_ID:
      return {
        ...state,
        currentRoleDetails: true,
        fetchCompaniesAndRolesListError: ""
      }
    case FETCH_ROLE_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        isCompaniesAndRolesListLoaded: true,
        fetchRoleDetailsLoading: false,
        currentRoleDetails: action.payload
      }
    case FETCH_ROLE_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        isCompaniesAndRolesListLoaded: true,
        currentRoleDetails: false,
        fetchCompaniesAndRolesListError: action.payload.error
      }
    case USER_BEGIN_PROJECT:
      return {
        ...state,

        beginProjectLoading: true,
        beginProjectError: ""
      }
    case USER_BEGIN_PROJECT_SUCCESS:
      return {
        ...state,
        beginProjectLoading: false
      }
    case USER_BEGIN_PROJECT_FAILURE:
      return {
        ...state,
        beginProjectLoading: false,
        beginProjectError: action.payload.error
      }
    case FETCH_PROJECT_DETAILS_BY_ID:
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: true,
        fetchingProjectDetailsByIdError: ""
      }
    case FETCH_PROJECT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: false,
        productDetailsById: action.payload
      }
    case FETCH_PROJECT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: false,
        fetchingProjectDetailsByIdError: action.payload.error
      }

    case USER_UPDATE_TICKET:
      return {
        ...state,
        updateUserTicketLoading: true,
        updateUserTicketError: ""
      }
    case USER_UPDATE_TICKET_SUCCESS: {
      const updatedTicketList = state.projectDetailsById.tickets.map(ticket => {
        if (ticket.id === action.payload.id) {
          return Object.assign(ticket, { status: action.payload.status })
        } else {
          return ticket
        }
      })

      return {
        ...state,
        updateUserTicketLoading: false,
        projectDetailsById: Object.assign(state.projectDetailsById, {
          tickets: updatedTicketList
        })
      }
    }

    case USER_UPDATE_TICKET_FAILURE:
      return {
        ...state,
        updateUserTicketLoading: false,
        updateUserTicketError: action.payload.error
      }
    case USER_CODE_UPLOAD:
      return {
        ...state,
        userCodeUploadLoading: true,
        userCodeUploadError: ""
      }
    case USER_CODE_UPLOAD_SUCCESS:
      return {
        ...state,
        userCodeUploadLoading: false
      }
    case USER_CODE_UPLOAD_FAILURE:
      return {
        ...state,
        userCodeUploadLoading: false,
        userCodeUploadError: action.payload.error
      }

    case USER_UPDATE_PROJECT:
      return {
        ...state,

        userUpdateProjectLoading: true,
        userUpdateProjectError: ""
      }
    case USER_UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        userUpdateProjectLoading: false,
        projectDetailsById: Object.assign(state.projectDetailsById, {
          is_onboarded: 1
        })
      }
    case USER_UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        userUpdateProjectLoading: false,
        userUpdateProjectError: action.payload.error
      }

    default:
      return state
  }
}

export default jobsReducer
