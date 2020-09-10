import {
  FETCH_BOT_TOPIC_LIST,
  FETCH_BOT_TOPIC_LIST_SUCCESS,
  FETCH_BOT_TOPIC_LIST_FAILURE,
  FETCH_BOT_TOPIC_DETAILS_BY_ID,
  FETCH_BOT_TOPIC_DETAILS_BY_ID_SUCCESS,
  FETCH_BOT_TOPIC_DETAILS_BY_ID_FAILURE,
  FETCH_BOT_SECTION_DETAILS_BY_ID,
  FETCH_BOT_SECTION_DETAILS_BY_ID_SUCCESS,
  FETCH_BOT_SECTION_DETAILS_BY_ID_FAILURE,
  FETCH_BOT_SECTION_TAB_DETAILS_BY_ID,
  FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_SUCCESS,
  FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_FAILURE,
  OPEN_CHATBOT_WITH_TOPICS_ID,
  CLOSE_CHATBOT_WITH_TOPICS_ID,
  UPDATE_SECTION_UPDATE_FEEDBACK,
  UPDATE_SECTION_UPDATE_FEEDBACK_SUCCESS,
  UPDATE_SECTION_UPDATE_FEEDBACK_FAILURE
} from "../action/actionType"

let initialState = {
  topicList: [],
  fetchingTopicListLoading: false,
  fetchingTopicListError: "",

  topicDetailsById: {},
  fetchingTopicDetailsLoading: false,
  fetchingTopicDetailsError: "",

  fetchingSectionDetailsLoading: false,
  fetchingSectionDetailsError: "",

  fetchingSectionTabDetailsLoading: false,
  fetchingSectionTabDetailsError: "",
  sectionTabDetailsById: {},

  isOpenChatBot: false,
  chatBotTopicsIdList: null,

  updateSectionLoading: false,
  updateSectionError: ""
}

const botReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOT_TOPIC_LIST:
      return {
        ...state,
        fetchingTopicListLoading: true,
        fetchingTopicListError: ""
      }
    case FETCH_BOT_TOPIC_LIST_SUCCESS:
      return {
        ...state,
        fetchingTopicListLoading: false,
        topicList: action.payload
      }
    case FETCH_BOT_TOPIC_LIST_FAILURE:
      return {
        ...state,
        fetchingTopicListLoading: false,
        fetchingTopicListError: action.payload.error
      }
    case FETCH_BOT_TOPIC_DETAILS_BY_ID:
      return {
        ...state,
        fetchingTopicDetailsLoading: true,
        fetchingTopicDetailsError: ""
      }
    case FETCH_BOT_TOPIC_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingTopicDetailsLoading: false,
        topicDetailsById: action.payload.res,
        botActiveTopic: action.payload.topic,
        sectionTabDetailsById: action.payload.res.section.curr_section_detail
      }
    case FETCH_BOT_TOPIC_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingTopicDetailsLoading: false,
        fetchingTopicDetailsError: action.payload.error
      }

    case FETCH_BOT_SECTION_DETAILS_BY_ID:
      return {
        ...state,
        fetchingSectionDetailsLoading: true,
        fetchingSectionDetailsError: ""
      }
    case FETCH_BOT_SECTION_DETAILS_BY_ID_SUCCESS: {
      const updatedTopicDetailsById = Object.assign(state.topicDetailsById, {
        section: action.payload
      })

      return {
        ...state,
        fetchingSectionDetailsLoading: false,
        topicDetailsById: updatedTopicDetailsById,
        sectionTabDetailsById: action.payload.curr_section_detail
      }
    }
    case FETCH_BOT_SECTION_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingSectionDetailsLoading: false,
        fetchingSectionDetailsError: action.payload.error
      }
    case FETCH_BOT_SECTION_TAB_DETAILS_BY_ID:
      return {
        ...state,
        fetchingSectionTabDetailsLoading: true,
        fetchingSectionTabDetailsError: ""
      }
    case FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        fetchingSectionTabDetailsLoading: false,
        sectionTabDetailsById: action.payload
      }
    case FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_FAILURE:
      return {
        ...state,
        fetchingSectionTabDetailsLoading: false,
        fetchingSectionTabDetailsError: action.payload.error
      }
    case OPEN_CHATBOT_WITH_TOPICS_ID:
      return {
        ...state,
        isOpenChatBot: true,
        chatBotTopicsIdList: action.payload
      }
    case CLOSE_CHATBOT_WITH_TOPICS_ID:
      return {
        ...state,
        isOpenChatBot: false,
        chatBotTopicsIdList: null,
        topicList: []
      }

    case UPDATE_SECTION_UPDATE_FEEDBACK:
      return {
        ...state,
        updateSectionLoading: true,
        fetchingSectionTabDetailsError: ""
      }
    case UPDATE_SECTION_UPDATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        updateSectionLoading: false,
        topicDetailsById: Object.assign(state.topicDetailsById, {
          section: action.payload
        })
      }
    case UPDATE_SECTION_UPDATE_FEEDBACK_FAILURE:
      return {
        ...state,
        updateSectionLoading: false,
        updateSectionError: action.payload.error
      }

    default:
      return state
  }
}

export default botReducer
