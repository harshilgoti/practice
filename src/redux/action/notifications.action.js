import {
  NOTIFICATIONS_ENQUEUE_SNACKBAR,
  NOTIFICATIONS_CLOSE_SNACKBAR,
  NOTIFICATIONS_REMOVE_SNACKBAR,
  UPDATE_NOTIFICATION_LIST_ON_SOCKET,
  FETCH_ALL_NOTIFICATIONS_LIST,
  FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS,
  FETCH_ALL_NOTIFICATIONS_LIST_FAILURE,
  MARK_ALL_NOTIFICATIONS_AS_READ,
  MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
  MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE
} from "./actionType"
import axios from "../../config/axios"
export const enqueueSnackbar = notification => {
  const key = notification.options && notification.options.key

  return {
    type: NOTIFICATIONS_ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random()
    }
  }
}

export const closeSnackbar = key => ({
  type: NOTIFICATIONS_CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key
})
export const removeSnackbar = key => ({
  type: NOTIFICATIONS_REMOVE_SNACKBAR,
  key
})

export const updateNotificationOnSocket = payload => {
  return {
    type: UPDATE_NOTIFICATION_LIST_ON_SOCKET,
    payload: payload
  }
}
//FETCH NOTIFICATIONS LIST
export const fetchNotificationsList = payload => {
  return {
    type: FETCH_ALL_NOTIFICATIONS_LIST,
    payload: payload
  }
}

export const fetchNotificationsListSuccess = payload => {
  return {
    type: FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS,
    payload: payload
  }
}

export const fetchNotificationsListFailure = payload => {
  return {
    type: FETCH_ALL_NOTIFICATIONS_LIST_FAILURE,
    payload: payload
  }
}

export const getNotificationsList = (
  pageCount,
  pageLimit
) => async dispatch => {
  dispatch(fetchNotificationsList())
  axios
    .get(`/notifications?page=${pageCount}&limit=${pageLimit}`)
    .then(res => {
      dispatch(
        fetchNotificationsListSuccess({
          notifications: res.data.data.notifications,
          unReadCount: res.data.data.unReadCount,
          pageCount
        })
      )
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        fetchNotificationsListFailure({
          error: error.response.data.message
        })
      )
    })
}

//MARK ALL AS  READ
export const markAllNotificationsAsRead = payload => {
  return {
    type: MARK_ALL_NOTIFICATIONS_AS_READ,
    payload: payload
  }
}

export const markAllNotificationsAsReadSuccess = payload => {
  return {
    type: MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS,
    payload: payload
  }
}

export const markAllNotificationsAsReadFailure = payload => {
  return {
    type: MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE,
    payload: payload
  }
}

export const markReadAllNotifications = () => async dispatch => {
  dispatch(markAllNotificationsAsRead())
  axios
    .put(`/notifications/mark-as-read`)
    .then(res => {
      dispatch(markAllNotificationsAsReadSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        markAllNotificationsAsReadFailure({
          error: error.response.data.message
        })
      )
    })
}
