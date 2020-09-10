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
  USER_UPDATE_TICKET,
  USER_UPDATE_TICKET_SUCCESS,
  USER_UPDATE_TICKET_FAILURE,
  USER_CODE_UPLOAD,
  USER_CODE_UPLOAD_SUCCESS,
  USER_CODE_UPLOAD_FAILURE,
  USER_UPDATE_PROJECT,
  USER_UPDATE_PROJECT_SUCCESS,
  USER_UPDATE_PROJECT_FAILURE
} from "./actionType"
import axios from "../../config/axios"

//FETCH COMPANIES & ROLE JOB LIST
export const fetchCompaniesAndRolesList = payload => {
  return {
    type: FETCH_COMPANIES_AND_ROLES_LIST,
    payload: payload
  }
}

export const fetchCompaniesAndRolesListSuccess = payload => {
  return {
    type: FETCH_COMPANIES_AND_ROLES_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchCompaniesAndRolesListFailure = payload => {
  return {
    type: FETCH_COMPANIES_AND_ROLES_LIST_FAILURE,
    payload: payload
  }
}

export const getCompaniesAndRolesList = () => async dispatch => {
  dispatch(fetchCompaniesAndRolesList())
  axios
    .get(`/workspaces`)
    .then(res => {
      dispatch(fetchCompaniesAndRolesListSuccess(res.data.data))
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        fetchCompaniesAndRolesListFailure({
          error: error.response.data.message
        })
      )
    })
}

// active and begin workspaces

export const fetchActiveWorkspacesList = payload => {
  return {
    type: FETCH_ACTIVE_WORKSPACES_LIST,
    payload: payload
  }
}

export const fetchActiveWorkspacesListSuccess = payload => {
  return {
    type: FETCH_ACTIVE_WORKSPACES_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchActiveWorkspacesListFailure = payload => {
  return {
    type: FETCH_ACTIVE_WORKSPACES_LIST_FAILURE,
    payload: payload
  }
}

export const getActiveWorkspacesList = () => async dispatch => {
  dispatch(fetchActiveWorkspacesList())
  axios
    .get(`/user-workspaces`)
    .then(res => {
      dispatch(fetchActiveWorkspacesListSuccess(res.data.data))
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        fetchActiveWorkspacesListFailure({
          error: error.response.data.message
        })
      )
    })
}

//FETCH  ROLE DETAILS BY ID
export const fetchRoleDetailsById = payload => {
  return {
    type: FETCH_ROLE_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchRoleDetailsByIdSuccess = payload => {
  return {
    type: FETCH_ROLE_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchRoleDetailsByIdFailure = payload => {
  return {
    type: FETCH_ROLE_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getRoleDetailsById = role_id => async dispatch => {
  dispatch(fetchRoleDetailsById())
  axios
    .get(`/workspaces/${role_id}`)
    .then(res => {
      dispatch(fetchRoleDetailsByIdSuccess(res.data.data))
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        fetchRoleDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

//USER START PROJECT
export const userStartProject = payload => {
  return {
    type: USER_BEGIN_PROJECT,
    payload: payload
  }
}

export const userStartProjectSuccess = payload => {
  return {
    type: USER_BEGIN_PROJECT_SUCCESS,
    payload: payload
  }
}

export const userStartProjectFailure = payload => {
  return {
    type: USER_BEGIN_PROJECT_FAILURE,
    payload: payload
  }
}
export const userBeginProject = (
  body,
  handleSuccessBeginProject
) => async dispatch => {
  dispatch(userStartProject())

  axios
    .post(`/user-products/begin`, body)
    .then(res => {
      dispatch(userStartProjectSuccess(res.data.data.user_product_id))

      handleSuccessBeginProject &&
        handleSuccessBeginProject(res.data.data.user_product_id)
    })
    .catch(error => {
      dispatch(
        userStartProjectFailure({
          error: error.response.data.message
        })
      )
    })
}

//update user ticket

export const editUserTicket = payload => {
  return {
    type: USER_UPDATE_TICKET,
    payload: payload
  }
}

export const editUserTicketSuccess = payload => {
  return {
    type: USER_UPDATE_TICKET_SUCCESS,
    payload: payload
  }
}

export const editUserTicketFailure = payload => {
  return {
    type: USER_UPDATE_TICKET_FAILURE,
    payload: payload
  }
}

export const updateUserTicket = (
  ticket_id,
  body,
  handleCloseTikcketPopup
) => async dispatch => {
  dispatch(editUserTicket())
  axios
    .put(`/user/ticket/${ticket_id}`, body)
    .then(res => {
      dispatch(editUserTicketSuccess({ id: ticket_id, status: body.status }))
      handleCloseTikcketPopup && handleCloseTikcketPopup()
    })
    .catch(error => {
      dispatch(
        editUserTicketFailure({
          error: error.response.data.message
        })
      )
    })
}

//USER CODE UPLOAD

export const userProjectCodeUpload = payload => {
  return {
    type: USER_CODE_UPLOAD,
    payload: payload
  }
}

export const userProjectCodeUploadSuccess = payload => {
  return {
    type: USER_CODE_UPLOAD_SUCCESS,
    payload: payload
  }
}

export const userProjectCodeUploadFailure = payload => {
  return {
    type: USER_CODE_UPLOAD_FAILURE,
    payload: payload
  }
}

export const userCodeUpload = (
  formData,
  ticket,
  handleUpdateStatus
) => async dispatch => {
  dispatch(userProjectCodeUpload())

  axios
    .post(`/user/code/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })

    .then(res => {
      dispatch(userProjectCodeUploadSuccess(res))
      handleUpdateStatus && handleUpdateStatus(res.data.data, ticket)
    })
    .catch(error => {
      dispatch(
        userProjectCodeUploadFailure({
          error: error.response.data.message
        })
      )
    })
}

//update user project

export const editUserProject = payload => {
  return {
    type: USER_UPDATE_PROJECT,
    payload: payload
  }
}

export const editUserProjectSuccess = payload => {
  return {
    type: USER_UPDATE_PROJECT_SUCCESS,
    payload: payload
  }
}

export const editUserProjectFailure = payload => {
  return {
    type: USER_UPDATE_PROJECT_FAILURE,
    payload: payload
  }
}

export const updateUserProject = (
  project_id,
  body,
  handleCloseTabContent
) => async dispatch => {
  dispatch(editUserProject())
  axios
    .put(`/user/project/${project_id}`, body)
    .then(res => {
      dispatch(editUserProjectSuccess({ proj_id: project_id }))
      handleCloseTabContent && handleCloseTabContent()
    })
    .catch(error => {
      dispatch(
        editUserProjectFailure({
          error: error.response.data.message
        })
      )
    })
}
