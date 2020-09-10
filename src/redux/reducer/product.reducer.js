import {
  FETCH_PROJECT_DETAILS_BY_ID,
  HANDLE_PROJECT_DETAILS_BY_ID,
  FETCH_PROJECT_DETAILS_BY_ID_SUCCESS,
  FETCH_PROJECT_DETAILS_BY_ID_FAILURE,
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
} from "../action/actionType"

let initialState = {
  createSprintsLoading: false,

  productDetailsById: null,

  fetchingSprintListByProductIdLoading: false,
  fetchingSprintListByProductIdError: "",
  sprintListByProductId: [],
  storyListBySprintId: [],
  fetchingStroyListBySprintIdLoading: false,
  fetchingStroyListBySprintError: "",
  currentSprint: {},

  ticketListByStoryId: [],
  ticketDetailsById: {},

  gitBranches: [],
  gitCommits: [],
  currentStory: {},
  ticketSubmissionList: [],
  fetchingTicketSubmissionListLoading: false,

  fetchingEmailListLoading: false,
  emailListByStatus: [],

  emailDetailsById: {},

  documentList: [],
  fetchingDocumentListLoading: false,

  chatUserList: [],
  fetchingChatUserListLoading: false,

  fetchingChatListLoading: false,
  chatList: [],
  activeChatUser: {},

  userInviteLoading: false,
  userInviteError: "",

  ticketListByStoryLoading: false,
  ticketListByStory: [],
  ticketListByStoryError: null
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECT_DETAILS_BY_ID:
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: true,
        fetchingProjectDetailsByIdError: ""
      }
    case FETCH_PROJECT_DETAILS_BY_ID_SUCCESS: {
      const product_backlog = action.payload.product_backlog.sort((a, b) => {
        let fa = a.index,
          fb = b.index

        if (fa < fb) {
          return -1
        }
        if (fa > fb) {
          return 1
        }
        return 0
      })
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: false,
        productDetailsById: Object.assign(action.payload, { product_backlog })
        // productDetailsById: action.payload
      }
    }

    case FETCH_PROJECT_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingProjectDetailsByIdLoading: false,
        fetchingProjectDetailsByIdError: action.payload.error
      }
    case HANDLE_PROJECT_DETAILS_BY_ID:
      return {
        ...state,
        productDetailsById: null
      }
    case CREATE_SPRINTS:
      return {
        ...state,

        createSprintsLoading: true
      }
    case CREATE_SPRINTS_SUCCESS: {
      let updatedSprintListByProductId = state.sprintListByProductId

      const { created_at, index, is_completed, title, _id } = action.payload
      const updatedCurrentSprint = Object.assign(
        {},
        { completed_perc: 0, created_at, index, is_completed, title, _id }
      )
      updatedSprintListByProductId.unshift(updatedCurrentSprint)

      return {
        ...state,
        createSprintsLoading: false,
        sprintListByProductId: updatedSprintListByProductId,
        storyListBySprintId: []

        // currentSprint: updatedCurrentSprint
      }
    }
    case CREATE_SPRINTS_FAILURE:
      return {
        ...state,
        createSprintsLoading: false
      }

    case FETCH_SPRINT_LIST_BY_PRODUCT_ID:
      return {
        ...state,
        fetchingSprintListByProductIdLoading: true,
        fetchingSprintListByProductIdError: ""
      }
    case FETCH_SPRINT_LIST_BY_PRODUCT_ID_SUCCESS:
      return {
        ...state,
        fetchingSprintListByProductIdLoading: false,
        sprintListByProductId: action.payload.reverse(),
        storyListBySprintId: []
      }
    case FETCH_SPRINT_LIST_BY_PRODUCT_ID_FAILURE:
      return {
        ...state,
        fetchingSprintListByProductIdLoading: false,
        fetchingSprintListByProductIdError: action.payload.error
      }

    case FETCH_STORY_LIST_BY_SPRINT:
      return {
        ...state,
        fetchingStroyListBySprintIdLoading: true,
        fetchingStroyListBySprintError: ""
      }
    case FETCH_STORY_LIST_BY_SPRINT_SUCCESS: {
      const currentSprintById = state.sprintListByProductId.find(
        sprint => sprint._id === action.payload.sprintId
      )
      return {
        ...state,
        fetchingStroyListBySprintIdLoading: false,
        storyListBySprintId: action.payload.res,
        currentSprint: currentSprintById
      }
    }
    case FETCH_STORY_LIST_BY_SPRINT_FAILURE:
      return {
        ...state,
        fetchingStroyListBySprintIdLoading: false,
        fetchingStroyListBySprintError: action.payload.error
      }
    case HANDLE_STORY_LIST_BY_SPRINT_ID:
      return {
        ...state,
        storyListBySprintId: []
      }

    case FETCH_TICKET_LIST_BY_STORY:
      return {
        ...state,
        ticketListByStoryId: []
      }
    case FETCH_TICKET_LIST_BY_STORY_SUCCESS: {
      const currentStroyById = state.storyListBySprintId.find(
        story => story._id === action.payload.storyId
      )
      return {
        ...state,
        ticketListByStoryId: action.payload.res.sort((a, b) => {
          let fa = a.ticket.index,
            fb = b.ticket.index

          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        }),
        currentStory: currentStroyById
      }
    }
    case FETCH_TICKET_LIST_BY_STORY_FAILURE:
      return {
        ...state
      }
    case FETCH_TICKET_DETAILS_BY_ID:
      return {
        ...state,
        ticketDetailsById: {}
      }
    case FETCH_TICKET_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        ticketDetailsById: action.payload
      }
    case FETCH_TICKET_DETAILS_BY_ID_FAILURE:
      return {
        ...state
      }

    case FETCH_GIT_BRANCHES_BY_GIT_REPO_ID: {
      return {
        ...state
      }
    }
    case FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_SUCCESS: {
      return {
        ...state,
        gitBranches: action.payload
      }
    }
    case FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_FAILURE: {
      return {
        ...state
      }
    }
    case FETCH_GIT_COMMITS_BY_GIT_REPO_ID: {
      return {
        ...state
      }
    }
    case FETCH_GIT_COMMITS_BY_GIT_REPO_ID_SUCCESS: {
      return {
        ...state,
        gitCommits: action.payload
      }
    }
    case FETCH_GIT_COMMITS_BY_GIT_REPO_ID_FAILURE: {
      return {
        ...state
      }
    }

    case UPDATE_TICKET_STATUS: {
      return {
        ...state
      }
    }
    case UPDATE_TICKET_STATUS_SUCCESS: {
      return {
        ...state,
        ticketListByStoryId: state.ticketListByStoryId.map(ticket => {
          if (ticket._id === action.payload.tic_id) {
            return Object.assign(ticket, action.payload.body)
          } else {
            return ticket
          }
        })
      }
    }
    case UPDATE_TICKET_STATUS_FAILURE: {
      return {
        ...state
      }
    }
    case FETCH_TICKET_SUBMISSION_LIST: {
      return {
        ...state,
        fetchingTicketSubmissionListLoading: true
      }
    }
    case FETCH_TICKET_SUBMISSION_LIST_SUCCESS: {
      return {
        ...state,
        ticketSubmissionList: action.payload,
        fetchingTicketSubmissionListLoading: false
      }
    }
    case FETCH_TICKET_SUBMISSION_LIST_FAILURE: {
      return {
        ...state,
        fetchingTicketSubmissionListLoading: true
      }
    }
    case FETCH_ALL_EMAIL_LIST_BY_STATUS: {
      return {
        ...state,
        fetchingEmailListLoading: true
      }
    }
    case FETCH_ALL_EMAIL_LIST_BY_STATUS_SUCCESS: {
      return {
        ...state,
        fetchingEmailListLoading: false,
        emailListByStatus: action.payload
      }
    }
    case FETCH_ALL_EMAIL_LIST_BY_STATUS_FAILURE: {
      return {
        ...state,
        fetchingEmailListLoading: true
      }
    }

    case FETCH_EMAIL_DETAILS_BY_ID: {
      return {
        ...state,
        fetchingEmailDetailsLoading: true
      }
    }
    case FETCH_EMAIL_DETAILS_BY_ID_SUCCESS: {
      return {
        ...state,
        fetchingEmailDetailsLoading: false,
        emailDetailsById: action.payload
      }
    }
    case FETCH_EMAIL_DETAILS_BY_ID_FAILURE: {
      return {
        ...state,
        fetchingEmailDetailsLoading: true
      }
    }

    case COMPOSE_EMAIL: {
      return {
        ...state,
        composeEmailLoading: true
      }
    }
    case COMPOSE_EMAIL_SUCCESS: {
      const updatedEmailList = state.emailListByStatus
      updatedEmailList.push(action.payload)
      return {
        ...state,
        composeEmailLoading: false,
        emailListByStatus: updatedEmailList
      }
    }
    case COMPOSE_EMAIL_FAILURE: {
      return {
        ...state,
        composeEmailLoading: true
      }
    }

    case FETCH_ALL_DOCUMENT_LIST: {
      return {
        ...state,
        fetchingDocumentListLoading: true
      }
    }
    case FETCH_ALL_DOCUMENT_LIST_SUCCESS: {
      return {
        ...state,
        fetchingDocumentListLoading: false,
        documentList: action.payload
      }
    }
    case FETCH_ALL_DOCUMENT_LIST_FAILURE: {
      return {
        ...state,
        fetchingDocumentListLoading: true
      }
    }
    case USER_PRODUCT_ADD_DOCUMENT: {
      return {
        ...state,
        addDocumentLoading: true
      }
    }
    case USER_PRODUCT_ADD_DOCUMENT_SUCCESS: {
      return {
        ...state,
        addDocumentLoading: false,
        documentList: [...state.documentList, action.payload]
      }
    }
    case USER_PRODUCT_ADD_DOCUMENT_FAILURE: {
      return {
        ...state,
        addDocumentLoading: true
      }
    }
    case FETCH_ALL_CHAT_USER_LIST: {
      return {
        ...state,
        fetchingChatUserListLoading: true
      }
    }
    case FETCH_ALL_CHAT_USER_LIST_SUCCESS: {
      return {
        ...state,
        fetchingChatUserListLoading: false,
        chatUserList: action.payload
      }
    }
    case FETCH_ALL_CHAT_USER_LIST_FAILURE: {
      return {
        ...state,
        fetchingChatUserListLoading: true
      }
    }

    case FETCH_ALL_CHAT_LIST: {
      return {
        ...state,
        fetchingChatListLoading: true
      }
    }
    case FETCH_ALL_CHAT_LIST_SUCCESS: {
      return {
        ...state,
        fetchingChatListLoading: false,
        chatList: action.payload.res.reverse(),
        activeChatUser: action.payload.activeUser
      }
    }
    case FETCH_ALL_CHAT_LIST_FAILURE: {
      return {
        ...state,
        fetchingChatListLoading: true
      }
    }

    case USER_PRODUCT_ADD_CHAT: {
      return {
        ...state,
        addChatMessageLoading: true
      }
    }
    case USER_PRODUCT_ADD_CHAT_SUCCESS: {
      let updatecChatList = state.chatList
      updatecChatList.unshift(action.payload)
      return {
        ...state,
        addChatMessageLoading: false,
        chatList: updatecChatList
      }
    }
    case USER_PRODUCT_ADD_CHAT_FAILURE: {
      return {
        ...state,
        addChatMessageLoading: true
      }
    }

    case USER_INVITE_USER:
      return {
        ...state,
        userInviteLoading: true
      }
    case USER_INVITE_USER_SUCCESS:
      return {
        ...state,
        userInviteLoading: false
      }
    case USER_INVITE_USER_FAILURE:
      return {
        ...state,
        userInviteLoading: false,
        userInviteError: action.payload.error
      }

    case FETCH_TICKETS_BY_STORY:
      return {
        ...state,
        ticketListByStoryLoading: true
      }

    case FETCH_TICKETS_BY_STORY_SUCCESS:
      return {
        ...state,
        ticketListByStoryLoading: false,
        ticketListByStory: action.payload
      }

    case FETCH_TICKETS_BY_STORY_FAILURE:
      return {
        ...state,
        ticketListByStoryLoading: false,
        ticketListByStoryError: action.payload.error
      }
    case HANDLE_TICKETS_BY_STORY:
      return {
        ...state,
        ticketListByStory: []
      }

    case CLEAR_CURRENT_SPRINT:
      return {
        ...state,
        storyListBySprintId: [],
        ticketListByStory: []
      }
    case UPDATE_CURRENT_SPRINT_AND_STORY: {
      const { sprint_completed_prec, story_completed_perc } = action.payload

      const updatedCurrentSprint = Object.assign(state.currentSprint, {
        completed_perc: sprint_completed_prec,
        is_completed: sprint_completed_prec === 100 ? true : false
      })
      const updatedCurrentStory = Object.assign(state.currentStory, {
        completed_perc: story_completed_perc
      })

      return {
        ...state,
        currentSprint: updatedCurrentSprint,
        currentStory: updatedCurrentStory
      }
    }
    default:
      return state
  }
}

export default productReducer
