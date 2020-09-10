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
} from "./actionType"
import axios from "../../config/axios"
import { enqueueSnackbar } from "redux/action"

//FETCH BOT TOPIC LIST
export const fetchBotTopicList = payload => {
  return {
    type: FETCH_BOT_TOPIC_LIST,
    payload: payload
  }
}

export const fetchBotTopicListSuccess = payload => {
  return {
    type: FETCH_BOT_TOPIC_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchBotTopicListFailure = payload => {
  return {
    type: FETCH_BOT_TOPIC_LIST_FAILURE,
    payload: payload
  }
}

export const getBotTopicList = chatBotTopicsIdList => async dispatch => {
  dispatch(fetchBotTopicList())
  axios
    .get(`/topics`, {
      params: { topic_ids: chatBotTopicsIdList }
    })
    .then(res => {
      dispatch(fetchBotTopicListSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchBotTopicListFailure({
          error: error.response.data.message
        })
      )
    })
}

//FETCH  TOPIC DETAILS BY ID
export const fetchTopicDetailsById = payload => {
  return {
    type: FETCH_BOT_TOPIC_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchTopicDetailsByIdSuccess = payload => {
  return {
    type: FETCH_BOT_TOPIC_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchTopicDetailsByIdFailure = payload => {
  return {
    type: FETCH_BOT_TOPIC_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getTopicDetailsById = (top_id, topic) => async dispatch => {
  dispatch(fetchTopicDetailsById())
  axios
    .get(`/topics/${top_id}`)
    .then(res => {
      dispatch(fetchTopicDetailsByIdSuccess({ res: res.data.data, topic }))
    })
    .catch(error => {
      dispatch(
        fetchTopicDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

//FETCH  SECTION DETAILS BY ID
export const fetchSectionDetailsById = payload => {
  return {
    type: FETCH_BOT_SECTION_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchSectionDetailsByIdSuccess = payload => {
  return {
    type: FETCH_BOT_SECTION_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchSectionDetailsByIdFailure = payload => {
  return {
    type: FETCH_BOT_SECTION_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getSectionDetailsById = sec_id => async dispatch => {
  dispatch(fetchSectionDetailsById())
  axios
    .get(`/sections/${sec_id}`)
    .then(res => {
      dispatch(fetchSectionDetailsByIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchSectionDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}
//FETCH  SECTION TAB DETAILS BY ID
export const fetchSectionTabDetailsById = payload => {
  return {
    type: FETCH_BOT_SECTION_TAB_DETAILS_BY_ID,
    payload: payload
  }
}

export const fetchSectionTabDetailsByIdSuccess = payload => {
  return {
    type: FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_SUCCESS,
    payload: payload
  }
}

export const fetchSectionTabDetailsByIdFailure = payload => {
  return {
    type: FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_FAILURE,
    payload: payload
  }
}

export const getSectionTabDetailsById = sct_id => async dispatch => {
  dispatch(fetchSectionTabDetailsById())
  axios
    .get(`/section-tab/${sct_id}`)
    .then(res => {
      dispatch(fetchSectionTabDetailsByIdSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        fetchSectionTabDetailsByIdFailure({
          error: error.response.data.message
        })
      )
    })
}

export const chatBotOpenChatBotWithTopicIds = payload => {
  return {
    type: OPEN_CHATBOT_WITH_TOPICS_ID,
    payload: payload
  }
}

export const openChatBotWithTopicIds = associated_topics => async dispatch => {
  dispatch(chatBotOpenChatBotWithTopicIds(associated_topics))
}

export const chatBotCloseChatBotWithTopicIds = payload => {
  return {
    type: CLOSE_CHATBOT_WITH_TOPICS_ID,
    payload: payload
  }
}

export const closeChatBotWithTopicIds = () => async dispatch => {
  dispatch(chatBotCloseChatBotWithTopicIds())
}

//update user ticket

export const sectionUpdateSectionFeedback = payload => {
  return {
    type: UPDATE_SECTION_UPDATE_FEEDBACK,
    payload: payload
  }
}

export const sectionUpdateSectionFeedbackSuccess = payload => {
  return {
    type: UPDATE_SECTION_UPDATE_FEEDBACK_SUCCESS,
    payload: payload
  }
}

export const sectionUpdateSectionFeedbackFailure = payload => {
  return {
    type: UPDATE_SECTION_UPDATE_FEEDBACK_FAILURE,
    payload: payload
  }
}

export const updateSectionFeedback = (
  sec_id,
  body,
  handleCloseFeedBackPopup
) => async dispatch => {
  dispatch(sectionUpdateSectionFeedback())
  axios
    .post(`/sections/${sec_id}/feedBack`, body)
    .then(res => {
      dispatch(sectionUpdateSectionFeedbackSuccess(res.data.data))
      handleCloseFeedBackPopup && handleCloseFeedBackPopup()
      dispatch(
        enqueueSnackbar({
          message: `Thank you for your feedback! We appreciate it.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            autoHideDuration: 1000,
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
        sectionUpdateSectionFeedbackFailure({
          error: error.response.data.message
        })
      )
    })
}
