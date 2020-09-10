import {
  DASHBOARD_GET_USER_REPORT,
  DASHBOARD_GET_USER_REPORT_SUCCESS,
  DASHBOARD_GET_USER_REPORT_FAILURE,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE
} from "./actionType"
import axios from "../../config/axios"

//user report
export const dashboardGetDashboardUserReport = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT,
    payload: payload
  }
}

export const dashboardGetDashboardUserReportSuccess = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT_SUCCESS,
    payload: payload
  }
}

export const dashboardGetDashboardUserReportFailure = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT_FAILURE,
    payload: payload
  }
}

export const getDashboardUserReport = () => async dispatch => {
  dispatch(dashboardGetDashboardUserReport())
  axios
    .get(`/user-report`)
    .then(res => {
      dispatch(dashboardGetDashboardUserReportSuccess(res.data.data))
    })
    .catch(error => {
      dispatch(
        dashboardGetDashboardUserReportFailure({
          error: error.response.data.message
        })
      )
    })
}

export const dashboardGetDashboardUserReportForXpTimeline = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE,
    payload: payload
  }
}

export const dashboardGetDashboardUserReportForXpTimelineSuccess = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS,
    payload: payload
  }
}

export const dashboardGetDashboardUserReportForXpTimelineFailure = payload => {
  return {
    type: DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE,
    payload: payload
  }
}

export const getDashboardUserReportForXpTimeline = (
  start_date,
  end_date
) => async dispatch => {
  dispatch(dashboardGetDashboardUserReportForXpTimeline())
  axios
    .get(`/user-xp-timeline-chart`)
    .then(res => {
      dispatch(
        dashboardGetDashboardUserReportForXpTimelineSuccess(res.data.data)
      )
    })
    .catch(error => {
      dispatch(
        dashboardGetDashboardUserReportForXpTimelineFailure({
          error: error.response.data.message
        })
      )
    })
}
