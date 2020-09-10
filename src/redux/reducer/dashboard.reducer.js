import {
  DASHBOARD_GET_USER_REPORT,
  DASHBOARD_GET_USER_REPORT_SUCCESS,
  DASHBOARD_GET_USER_REPORT_FAILURE,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS,
  DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE
} from "../action/actionType"
import moment from "moment"
const getUserReportForXpTimelineFromAPIResponse = xpTimelineData => {
  const labelList = xpTimelineData.map(timeline => timeline.label)
  const dataByLabelList = xpTimelineData.map(timeline => timeline.data)
  return {
    labels: labelList,
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: [
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#008afc",
          "#fff",
          "#fff",
          "#fff",
          "#fff"
        ],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: [3, 3, 3, 3, 5, 3, 3, 3, 3],
        pointHitRadius: 10,
        data: dataByLabelList
      }
    ]
  }
}

let initialState = {
  dashboardUserReportLoading: false,
  dashboardUserReport: {},
  dashboardUserReportError: "",
  dashboardUserReportForXpTimelineLoading: false,
  dashboardUserReportForXpTimeline: {
    labels: [
      moment()
        .subtract(4, "days")
        .format("Do MMM"),
      moment()
        .subtract(3, "days")
        .format("Do MMM"),
      moment()
        .subtract(2, "days")
        .format("Do MMM"),
      moment()
        .subtract(1, "days")
        .format("Do MMM"),
      moment().format("Do MMM"),
      moment()
        .add(1, "days")
        .format("Do MMM"),
      moment()
        .add(2, "days")
        .format("Do MMM"),
      moment()
        .add(3, "days")
        .format("Do MMM"),
      moment()
        .add(4, "days")
        .format("Do MMM")
    ],
    datasets: [
      {
        label: "",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: [
          "#fff",
          "#fff",
          "#fff",
          "#fff",
          "#008afc",
          "#fff",
          "#fff",
          "#fff",
          "#fff"
        ],
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: [3, 3, 3, 3, 5, 3, 3, 3, 3],
        pointHitRadius: 10,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  },
  dashboardUserReportForXpTimelineError: null
}

const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_GET_USER_REPORT:
      return {
        ...state,
        dashboardUserReportLoading: true
      }
    case DASHBOARD_GET_USER_REPORT_SUCCESS:
      return {
        ...state,
        dashboardUserReportLoading: false,
        dashboardUserReport: action.payload
      }
    case DASHBOARD_GET_USER_REPORT_FAILURE:
      return {
        ...state,
        dashboardUserReportLoading: false,
        dashboardUserReportError: action.payload.error
      }
    case DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE:
      return {
        ...state,
        dashboardUserReportForXpTimelineLoading: true
      }
    case DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS:
      return {
        ...state,
        dashboardUserReportForXpTimelineLoading: false,
        dashboardUserReportForXpTimeline: getUserReportForXpTimelineFromAPIResponse(
          action.payload
        )
      }
    case DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE:
      return {
        ...state,
        dashboardUserReportForXpTimelineLoading: false,
        dashboardUserReportForXpTimelineError: action.payload.error
      }

    default:
      return state
  }
}

export default dashboard
