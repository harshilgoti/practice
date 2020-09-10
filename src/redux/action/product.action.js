import axios, { axiosGIT } from "../../config/axios"
import {
  FETCH_PROJECT_DETAILS_BY_ID,
  FETCH_PROJECT_DETAILS_BY_ID_SUCCESS,
  FETCH_PROJECT_DETAILS_BY_ID_FAILURE,
  HANDLE_PROJECT_DETAILS_BY_ID,
  CREATE_SPRINTS,
  CREATE_SPRINTS_SUCCESS,
  CREATE_SPRINTS_FAILURE,
  FETCH_SPRINT_LIST_BY_PRODUCT_ID,
  FETCH_SPRINT_LIST_BY_PRODUCT_ID_SUCCESS,
  FETCH_SPRINT_LIST_BY_PRODUCT_ID_FAILURE,
  FETCH_STORY_LIST_BY_SPRINT,
  FETCH_STORY_LIST_BY_SPRINT_SUCCESS,
  FETCH_STORY_LIST_BY_SPRINT_FAILURE,
  FETCH_TICKET_LIST_BY_STORY,
  FETCH_TICKET_LIST_BY_STORY_SUCCESS,
  FETCH_TICKET_LIST_BY_STORY_FAILURE,
  FETCH_TICKET_DETAILS_BY_ID,
  FETCH_TICKET_DETAILS_BY_ID_SUCCESS,
  FETCH_TICKET_DETAILS_BY_ID_FAILURE,
  FETCH_GIT_BRANCHES_BY_GIT_REPO_ID,
  FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_SUCCESS,
  FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_FAILURE,
  FETCH_GIT_COMMITS_BY_GIT_REPO_ID,
  FETCH_GIT_COMMITS_BY_GIT_REPO_ID_SUCCESS,
  FETCH_GIT_COMMITS_BY_GIT_REPO_ID_FAILURE,
  UPDATE_TICKET_STATUS,
  UPDATE_TICKET_STATUS_SUCCESS,
  UPDATE_TICKET_STATUS_FAILURE,
  FETCH_TICKET_SUBMISSION_LIST,
  FETCH_TICKET_SUBMISSION_LIST_SUCCESS,
  FETCH_TICKET_SUBMISSION_LIST_FAILURE,
  FETCH_ALL_EMAIL_LIST_BY_STATUS,
  FETCH_ALL_EMAIL_LIST_BY_STATUS_SUCCESS,
  FETCH_ALL_EMAIL_LIST_BY_STATUS_FAILURE,
  COMPOSE_EMAIL,
  COMPOSE_EMAIL_SUCCESS,
  COMPOSE_EMAIL_FAILURE,
  FETCH_EMAIL_DETAILS_BY_ID,
  FETCH_EMAIL_DETAILS_BY_ID_SUCCESS,
  FETCH_EMAIL_DETAILS_BY_ID_FAILURE,
  FETCH_ALL_DOCUMENT_LIST,
  FETCH_ALL_DOCUMENT_LIST_SUCCESS,
  FETCH_ALL_DOCUMENT_LIST_FAILURE,
  USER_PRODUCT_ADD_DOCUMENT,
  USER_PRODUCT_ADD_DOCUMENT_SUCCESS,
  USER_PRODUCT_ADD_DOCUMENT_FAILURE,
  // USER_PRODUCT_UPLOAD,
  // USER_PRODUCT_UPLOAD_SUCCESS,
  // USER_PRODUCT_UPLOAD_FAILURE,
  FETCH_ALL_CHAT_USER_LIST,
  FETCH_ALL_CHAT_USER_LIST_SUCCESS,
  FETCH_ALL_CHAT_USER_LIST_FAILURE,
  FETCH_ALL_CHAT_LIST,
  FETCH_ALL_CHAT_LIST_SUCCESS,
  FETCH_ALL_CHAT_LIST_FAILURE,
  USER_PRODUCT_ADD_CHAT,
  USER_PRODUCT_ADD_CHAT_SUCCESS,
  USER_PRODUCT_ADD_CHAT_FAILURE,
  USER_INVITE_USER,
  USER_INVITE_USER_SUCCESS,
  USER_INVITE_USER_FAILURE,
  FETCH_TICKETS_BY_STORY,
  FETCH_TICKETS_BY_STORY_SUCCESS,
  FETCH_TICKETS_BY_STORY_FAILURE,
  HANDLE_TICKETS_BY_STORY,
  CLEAR_CURRENT_SPRINT,
  HANDLE_STORY_LIST_BY_SPRINT_ID,
  UPDATE_CURRENT_SPRINT_AND_STORY
} from "./actionType"
import { enqueueSnackbar } from "redux/action"

// FETCH PROJECT DETAILS
export const fetchProjectDetailsById = payload => {
  return {
    type: FETCH_PROJECT_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchProjectDetailsByIdSuccess = payload => {
  return {
    type: FETCH_PROJECT_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchProjectDetailsByIdFailure = payload => {
  return {
    type: FETCH_PROJECT_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getUserProductDetailsById = project_id => async dispatch => {
  dispatch(fetchProjectDetailsById())
  axios
    .get(`/user-products/${project_id}`)
    .then(res => {
      dispatch(fetchProjectDetailsByIdSuccess(res.data.data))
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        fetchProjectDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

export const handleProjectDetailsById = payload => {
  return {
    type: HANDLE_PROJECT_DETAILS_BY_ID,
    payload: payload
  }
}
//CREATE SPRINTS
export const createProjectSprints = payload => {
  return {
    type: CREATE_SPRINTS,
    payload: payload
  }
}

export const createProjectSprintsSuccess = payload => {
  return {
    type: CREATE_SPRINTS_SUCCESS,
    payload: payload
  }
}

export const createProjectSprintsFailure = payload => {
  return {
    type: CREATE_SPRINTS_FAILURE,
    payload: payload
  }
}

export const createSprints = (
  body,
  handleCreateSprintSuccess
) => async dispatch => {
  dispatch(createProjectSprints())
  axios
    .post(`/sprints`, body)
    .then(res => {
      dispatch(createProjectSprintsSuccess(res.data.data))
      handleCreateSprintSuccess && handleCreateSprintSuccess(res.data.data)
      dispatch(
        enqueueSnackbar({
          message: `You just created a sprint. Good luck!`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )
    })
    .catch(error => {
      dispatch(
        createProjectSprintsFailure({
          error: error.response.data.errors.message
        })
      )
    })
}

// FETCH SPRINT LIST BY PRODUCT ID
export const fetchSprintListByProductId = payload => {
  return {
    type: FETCH_SPRINT_LIST_BY_PRODUCT_ID,
    payload: payload
  }
}

export const fetchSprintListByProductIdSuccess = payload => {
  return {
    type: FETCH_SPRINT_LIST_BY_PRODUCT_ID_SUCCESS,
    payload: payload
  }
}

export const fetchSprintListByProductIdFailure = payload => {
  return {
    type: FETCH_SPRINT_LIST_BY_PRODUCT_ID_FAILURE,
    payload: payload
  }
}

export const getSprintListByProductId = user_product_id => async dispatch => {
  dispatch(fetchSprintListByProductId())
  axios
    .get(`/sprints?user_product_id=${user_product_id}`)
    .then(res => {
      dispatch(fetchSprintListByProductIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchSprintListByProductIdFailure({
          error: error.response.data.message
        })
      )
    })
}

// FETCH STORY LIST BY SPRINT ID
export const fetchStroyListBySprintId = payload => {
  return {
    type: FETCH_STORY_LIST_BY_SPRINT,
    payload: payload
  }
}

export const fetchStroyListBySprintIdSuccess = payload => {
  return {
    type: FETCH_STORY_LIST_BY_SPRINT_SUCCESS,
    payload: payload
  }
}

export const fetchStroyListBySprintIdFailure = payload => {
  return {
    type: FETCH_STORY_LIST_BY_SPRINT_FAILURE,
    payload: payload
  }
}

export const handleStoryListBySprintId = payload => {
  return {
    type: HANDLE_STORY_LIST_BY_SPRINT_ID,
    payload: payload
  }
}

export const getStoryListBySprintId = sprint_id => async dispatch => {
  dispatch(fetchStroyListBySprintId())
  axios
    .get(`/sprints/${sprint_id}/stories`)
    .then(res => {
      dispatch(
        fetchStroyListBySprintIdSuccess({
          res: res.data.data,
          sprintId: sprint_id
        })
      )
    })
    .catch(error => {
      dispatch(
        fetchStroyListBySprintIdFailure({
          error: error.response.data.errors.message
        })
      )
    })
}

// FETCH TICKET LIST BY SPRINT ID && STORY ID
export const fetchTicketListByStoryId = payload => {
  return {
    type: FETCH_TICKET_LIST_BY_STORY,
    payload: payload
  }
}

export const fetchTicketListByStoryIdSuccess = payload => {
  return {
    type: FETCH_TICKET_LIST_BY_STORY_SUCCESS,
    payload: payload
  }
}

export const fetchTicketListByStoryIdFailure = payload => {
  return {
    type: FETCH_TICKET_LIST_BY_STORY_FAILURE,
    payload: payload
  }
}

export const getTicketListByStoryId = (spr_id, story_id) => async dispatch => {
  dispatch(fetchTicketListByStoryId())

  axios
    .get(`/sprints/${spr_id}/stories/${story_id}/tickets`)
    .then(res => {
      dispatch(
        fetchTicketListByStoryIdSuccess({
          res: res.data.data,
          storyId: story_id
        })
      )
    })
    .catch(error => {
      dispatch(
        fetchTicketListByStoryIdFailure({
          error: error.response.data.message
        })
      )
    })
}
// FETCH TICKET DETAILS BY  ID
export const fetchTicketDetailsById = payload => {
  return {
    type: FETCH_TICKET_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchTicketDetailsByIdSuccess = payload => {
  return {
    type: FETCH_TICKET_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchTicketDetailsByIdFailure = payload => {
  return {
    type: FETCH_TICKET_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getTicketDetailsById = tic_id => async dispatch => {
  dispatch(fetchTicketDetailsById())

  axios
    .get(`/tickets/${tic_id}`)
    .then(res => {
      dispatch(fetchTicketDetailsByIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchTicketDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

// FETCH TICKET SUBMISSIONS DETAILS BY  ID
export const fetchTicketSubmissionDetailsById = payload => {
  return {
    type: FETCH_TICKET_SUBMISSION_LIST,
    payload: payload
  }
}

export const fetchTicketSubmissionDetailsByIdSuccess = payload => {
  return {
    type: FETCH_TICKET_SUBMISSION_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchTicketSubmissionDetailsByIdFailure = payload => {
  return {
    type: FETCH_TICKET_SUBMISSION_LIST_FAILURE,
    payload: payload
  }
}

export const getTicketSubmissionDetailsById = tic_id => async dispatch => {
  dispatch(fetchTicketSubmissionDetailsById())

  axios

    .get(`/submissions?sprint_story_ticket_id=sst_cb9f1c949229c660424ec4d0`)
    // .get(`/submissions?sprint_story_ticket_id=${tic_id}`)
    .then(res => {
      dispatch(fetchTicketSubmissionDetailsByIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchTicketSubmissionDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

// FETCH GIT BRANCHES BY GIT REPO ID
export const fetchGitBranchesByGitRepoId = payload => {
  return {
    type: FETCH_GIT_BRANCHES_BY_GIT_REPO_ID,
    payload: payload
  }
}

export const fetchGitBranchesByGitRepoIdSuccess = payload => {
  return {
    type: FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_SUCCESS,
    payload: payload
  }
}

export const fetchGitBranchesByGitRepoIdFailure = payload => {
  return {
    type: FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_FAILURE,
    payload: payload
  }
}

export const getGitBranchesByGitRepoId = git_repo_id => async dispatch => {
  dispatch(fetchGitBranchesByGitRepoId())

  axiosGIT
    .get(`/projects/${git_repo_id}/repository/branches`)
    .then(res => {
      dispatch(fetchGitBranchesByGitRepoIdSuccess(res.data))
    })
    .catch(error => {
      dispatch(
        fetchGitBranchesByGitRepoIdFailure({
          error: error.response.data.message
        })
      )
    })
}

// FETCH GIT BRANCHES BY GIT REPO ID
export const fetchGitCommitsByGitRepoId = payload => {
  return {
    type: FETCH_GIT_COMMITS_BY_GIT_REPO_ID,
    payload: payload
  }
}

export const fetchGitCommitsByGitRepoIdSuccess = payload => {
  return {
    type: FETCH_GIT_COMMITS_BY_GIT_REPO_ID_SUCCESS,
    payload: payload
  }
}

export const fetchGitCommitsByGitRepoIdFailure = payload => {
  return {
    type: FETCH_GIT_COMMITS_BY_GIT_REPO_ID_FAILURE,
    payload: payload
  }
}

export const getGitCommitsByGitRepoId = git_repo_id => async dispatch => {
  dispatch(fetchGitCommitsByGitRepoId())

  axiosGIT
    .get(`/projects/${git_repo_id}/repository/commits`)
    .then(async res => {
      let commits = res.data

      await res.data.reduce(async (accumP, commit, index) => {
        const accum = await accumP

        const refs = await axiosGIT.get(
          `/projects/${git_repo_id}/repository/commits/${commit.short_id}/refs?type=branch`
        )
        commits[index].refs = refs.data ? refs.data.map(el => el.name) : []
        Promise.resolve(accum)
      }, Promise.resolve())
      dispatch(fetchGitCommitsByGitRepoIdSuccess(commits))
    })
    .catch(error => {
      dispatch(
        fetchGitCommitsByGitRepoIdFailure({
          error: error.response.data.message
        })
      )
    })
}

//update user ticket

export const editTicketStatus = payload => {
  return {
    type: UPDATE_TICKET_STATUS,
    payload: payload
  }
}

export const editTicketStatusSuccess = payload => {
  return {
    type: UPDATE_TICKET_STATUS_SUCCESS,
    payload: payload
  }
}

export const editTicketStatusFailure = payload => {
  return {
    type: UPDATE_TICKET_STATUS_FAILURE,
    payload: payload
  }
}

export const updateTicketStatus = (
  spr_id,
  ssr_id,
  tic_id,
  body
) => async dispatch => {
  dispatch(editTicketStatus())
  axios
    .put(
      `/sprints/${spr_id}/sprint-stories/${ssr_id}/sprint-story-tickets/${tic_id}/status`,
      body
    )
    .then(res => {
      dispatch(editTicketStatusSuccess({ res, tic_id, body }))
    })
    .catch(error => {
      dispatch(
        editTicketStatusFailure({
          error: error.response.data.message
        })
      )
    })
}

//COMMUNICATION
//email
// / FETCH  ALL EMAIL LIST BY STATUS
export const fetchEmailListByStatus = payload => {
  return {
    type: FETCH_ALL_EMAIL_LIST_BY_STATUS,
    payload: payload
  }
}

export const fetchEmailListByStatusSuccess = payload => {
  return {
    type: FETCH_ALL_EMAIL_LIST_BY_STATUS_SUCCESS,
    payload: payload
  }
}

export const fetchEmailListByStatusFailure = payload => {
  return {
    type: FETCH_ALL_EMAIL_LIST_BY_STATUS_FAILURE,
    payload: payload
  }
}

export const getEmailListByStatus = (upr_id, status) => async dispatch => {
  dispatch(fetchEmailListByStatus())
  if (status === "sent" || status === "received") {
    axios
      .get(`/user-product/${upr_id}/emails?status=${status}`)
      .then(res => {
        dispatch(fetchEmailListByStatusSuccess(res.data.data))
      })
      .catch(error => {
        dispatch(
          fetchEmailListByStatusFailure({
            error: error.response.data.message
          })
        )
      })
  } else {
    axios
      .get(`/user-product/${upr_id}/emails`)
      .then(res => {
        dispatch(fetchEmailListByStatusSuccess(res.data.data))
      })
      .catch(error => {
        dispatch(
          fetchEmailListByStatusFailure({
            error: error.response.data.message
          })
        )
      })
  }
}

// FETCH EMAIL DETAILS BY ID
export const fetchEmailDetailsById = payload => {
  return {
    type: FETCH_EMAIL_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchEmailDetailsByIdSuccess = payload => {
  return {
    type: FETCH_EMAIL_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchEmailDetailsByIdFailure = payload => {
  return {
    type: FETCH_EMAIL_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getEmailDetailsById = eml_id => async dispatch => {
  dispatch(fetchEmailDetailsById())

  axios
    .get(`/user-product/emails/${eml_id}`)
    .then(res => {
      dispatch(fetchEmailDetailsByIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchEmailDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

//COMPOSE EMAIL
export const createEmail = payload => {
  return {
    type: COMPOSE_EMAIL,
    payload: payload
  }
}

export const createEmailSuccess = payload => {
  return {
    type: COMPOSE_EMAIL_SUCCESS,
    payload: payload
  }
}

export const createEmailFailure = payload => {
  return {
    type: COMPOSE_EMAIL_FAILURE,
    payload: payload
  }
}

export const composeEmail = (body, handleSuccess) => async dispatch => {
  dispatch(createEmail())

  axios
    .post(`/user-product/emails`, body)
    .then(res => {
      dispatch(createEmailSuccess(res.data.data))
      handleSuccess && handleSuccess()
      dispatch(
        enqueueSnackbar({
          message: `Your email has been sent`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )
    })
    .catch(error => {
      dispatch(
        createEmailFailure({
          error: error.response.data.message
        })
      )
      dispatch(
        enqueueSnackbar({
          message: `Your email must have ${error.response.data.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )
    })
}
//DOCUMENT

// / FETCH  ALL DOCUMENT LIST
export const fetchDocumentList = payload => {
  return {
    type: FETCH_ALL_DOCUMENT_LIST,
    payload: payload
  }
}

export const fetchDocumentListSuccess = payload => {
  return {
    type: FETCH_ALL_DOCUMENT_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchDocumentListFailure = payload => {
  return {
    type: FETCH_ALL_DOCUMENT_LIST_FAILURE,
    payload: payload
  }
}

export const getDocumentList = upr_id => async dispatch => {
  dispatch(fetchDocumentList())

  axios
    .get(`/user-product/${upr_id}/docs`)
    .then(res => {
      dispatch(fetchDocumentListSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchDocumentListFailure({
          error: error.response.data.message
        })
      )
    })
}
// / ADD DOCUMENT
export const userProductAddDocument = payload => {
  return {
    type: USER_PRODUCT_ADD_DOCUMENT,
    payload: payload
  }
}

export const userProductAddDocumentSuccess = payload => {
  return {
    type: USER_PRODUCT_ADD_DOCUMENT_SUCCESS,
    payload: payload
  }
}

export const userProductAddDocumentFailure = payload => {
  return {
    type: USER_PRODUCT_ADD_DOCUMENT_FAILURE,
    payload: payload
  }
}

export const addUserProductDocument = (
  body,
  handleSuccess
) => async dispatch => {
  dispatch(userProductAddDocument())

  axios
    .post(`/user-product/docs`, body)
    .then(res => {
      dispatch(userProductAddDocumentSuccess(res.data.data))
      handleSuccess && handleSuccess()
    })
    .catch(error => {
      dispatch(
        userProductAddDocumentFailure({
          error: error.response.data.message
        })
      )
    })
}
//CHAT
// / FETCH  ALL CHAT USER LIST
export const fetchChatUserList = payload => {
  return {
    type: FETCH_ALL_CHAT_USER_LIST,
    payload: payload
  }
}

export const fetchChatUserListSuccess = payload => {
  return {
    type: FETCH_ALL_CHAT_USER_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchChatUserListFailure = payload => {
  return {
    type: FETCH_ALL_CHAT_USER_LIST_FAILURE,
    payload: payload
  }
}

export const getChatUserList = upr_id => async dispatch => {
  dispatch(fetchChatUserList())
  axios
    .get(`/user-product/chats/${upr_id}/users`)
    .then(res => {
      dispatch(fetchChatUserListSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchChatUserListFailure({
          error: error.response.data.message
        })
      )
    })
}
// / FETCH  ALL CHAT USER LIST
export const fetchChatList = payload => {
  return {
    type: FETCH_ALL_CHAT_LIST,
    payload: payload
  }
}

export const fetchChatListSuccess = payload => {
  return {
    type: FETCH_ALL_CHAT_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchChatListFailure = payload => {
  return {
    type: FETCH_ALL_CHAT_LIST_FAILURE,
    payload: payload
  }
}

export const getChatList = activeUser => async dispatch => {
  dispatch(fetchChatList())

  axios
    .get(`/chat/${activeUser._id}/messages`)
    .then(res => {
      dispatch(fetchChatListSuccess({ res: res.data.data, activeUser }))
    })
    .catch(error => {
      dispatch(
        fetchChatListFailure({
          error: error.response.data.message
        })
      )
    })
}
// / ADD CHAT
export const userProductAddChat = payload => {
  return {
    type: USER_PRODUCT_ADD_CHAT,
    payload: payload
  }
}

export const userProductAddChatSuccess = payload => {
  return {
    type: USER_PRODUCT_ADD_CHAT_SUCCESS,
    payload: payload
  }
}

export const userProductAddChatFailure = payload => {
  return {
    type: USER_PRODUCT_ADD_CHAT_FAILURE,
    payload: payload
  }
}

export const sendChatMessage = (
  chatId,
  body,
  handleSuccess
) => async dispatch => {
  dispatch(userProductAddChat())

  axios
    .post(`/chat/${chatId}/messages`, body)
    .then(res => {
      dispatch(userProductAddChatSuccess(res.data.data))
      handleSuccess && handleSuccess()
    })
    .catch(error => {
      dispatch(
        userProductAddChatFailure({
          error: error.response.data.message
        })
      )
    })
}

// user invite

//CREATE SPRINTS
export const userInviteUser = payload => {
  return {
    type: USER_INVITE_USER,
    payload: payload
  }
}

export const userInviteUserSuccess = payload => {
  return {
    type: USER_INVITE_USER_SUCCESS,
    payload: payload
  }
}

export const userInviteUserFailure = payload => {
  return {
    type: USER_INVITE_USER_FAILURE,
    payload: payload
  }
}

export const userInvite = (body, handleUserInviteSuccess) => async dispatch => {
  dispatch(userInviteUser())
  axios
    .post(`/invites`, body)
    .then(res => {
      dispatch(userInviteUserSuccess(res.data.data))
      handleUserInviteSuccess && handleUserInviteSuccess(res.data.data)
      dispatch(
        enqueueSnackbar({
          message: `Your invitation has been sent`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            autoHideDuration: 3000
          }
        })
      )
    })
    .catch(error => {
      dispatch(
        userInviteUserFailure({
          error: error.response.data.errors.message
        })
      )
    })
}

// tickets by story

export const fetchStoryTicketsByStory = payload => {
  return {
    type: FETCH_TICKETS_BY_STORY,
    payload
  }
}
export const fetchStoryTicketsByStorySuccess = payload => {
  return {
    type: FETCH_TICKETS_BY_STORY_SUCCESS,
    payload
  }
}
export const fetchStoryTicketsByStoryFailure = payload => {
  return {
    type: FETCH_TICKETS_BY_STORY_FAILURE,
    payload
  }
}
export const ticketsByStory = pro_id => async dispatch => {
  dispatch(fetchStoryTicketsByStory())

  axios
    .get(`/stories/${pro_id}/tickets`)
    .then(res => {
      dispatch(fetchStoryTicketsByStorySuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchStoryTicketsByStoryFailure({
          error: error.response.data.errors.message.toString()
        })
      )
    })
}

export const handleTicketListByStory = payload => {
  return {
    type: HANDLE_TICKETS_BY_STORY,
    payload
  }
}
export const handleTicketsByStory = () => async dispatch => {
  dispatch(handleTicketListByStory())
}

export const clearCurrentSprintAction = payload => {
  return {
    type: CLEAR_CURRENT_SPRINT,
    payload
  }
}

export const updateCurrentSprintStoryAction = payload => {
  return {
    type: UPDATE_CURRENT_SPRINT_AND_STORY,
    payload
  }
}
export const clearCurrentSprint = () => async dispatch => {
  dispatch(clearCurrentSprintAction())
}
export const updateCurrentSprintStory = (
  story_completed_perc,
  sprint_completed_prec
) => async dispatch => {
  dispatch(
    updateCurrentSprintStoryAction({
      sprint_completed_prec,
      story_completed_perc
    })
  )
}
