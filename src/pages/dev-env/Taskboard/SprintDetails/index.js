import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, useLocation } from "react-router-dom"
import Countdown from "react-countdown"

import timeRemainingImage from "assets/images/all-new-svg-icons/timeRemaining.svg"
import emptyIcon from "assets/images/empty.jpg"
import moment from "moment"
import {
  getSprintListByProductId,
  getStoryListBySprintId,
  getUserProductDetailsById
} from "redux/action"

import Stories from "./Stories"
function TaskboardStory(props) {
  const dispatch = useDispatch()
  let location = useLocation()

  let { upr_id } = useParams()
  let pathArray = location.pathname.split("/")
  let history = useHistory()
  useEffect(() => {
    async function fetchData() {
      // You can await here
      upr_id && (await dispatch(getSprintListByProductId(upr_id)))
      // ...
    }
    fetchData()
  }, [dispatch, upr_id])
  const sprintListByProductId = useSelector(
    ({ product }) => product.sprintListByProductId
  )
  const storyListBySprintId = useSelector(
    ({ product }) => product.storyListBySprintId
  )
  const productDetailsById = useSelector(
    ({ product }) => product.productDetailsById
  )
  useEffect(() => {
    !productDetailsById && dispatch(getUserProductDetailsById(upr_id))
  }, [dispatch, productDetailsById, upr_id])
  const currentSprint = useSelector(({ product }) => product.currentSprint)
  //sprint id append in path
  useEffect(() => {
    if (sprintListByProductId.length > 0 && pathArray.length === 4) {
      history.push(`${location.pathname}/${sprintListByProductId[0]._id}`)
    }
  }, [
    history,
    location.pathname,
    pathArray.length,
    sprintListByProductId,
    sprintListByProductId.length
  ])

  useEffect(() => {
    if (sprintListByProductId.length > 0) {
      //fetch by route spr id
      if (Object.keys(currentSprint).length > 0) {
        //if already fetch the no need to fetch for same id
        // console.log("currentSprint", currentSprint)
        // console.log("pathArray[4]", pathArray[4])
        // console.log("pathArray[4]", currentSprint._id)

        !!pathArray[4] &&
          // pathArray[4] !== currentSprint._id &&
          !storyListBySprintId.length &&
          dispatch(getStoryListBySprintId(pathArray[4]))
      } else {
        //if id not same
        !!pathArray[4] &&
          !storyListBySprintId.length &&
          dispatch(getStoryListBySprintId(pathArray[4]))
      }
    }
  }, [
    currentSprint,
    dispatch,
    pathArray,
    pathArray.length,
    sprintListByProductId.length,
    storyListBySprintId
  ])

  //stroy id append in path
  useEffect(() => {
    if (storyListBySprintId.length > 0) {
      if (pathArray.length === 5) {
        history.push(`${location.pathname}/${storyListBySprintId[0]._id}`)
      }
      if (pathArray.length === 6) {
        pathArray.pop()
        const updatedPath = pathArray.join("/")

        history.push(`${updatedPath}/${storyListBySprintId[0]._id}`)
      }
      // if (storyListBySprintId.length > 0 && pathArray.length === 5) {
      //   history.push(`${location.pathname}/${storyListBySprintId[0]._id}`)
      // }
    }
  }, [dispatch, pathArray.length, storyListBySprintId.length])

  const renderer = ({ hours, minutes, seconds, completed }) => {
    return (
      <span>
        {minutes}:{seconds} mins
      </span>
    )
  }
  const currentSprintTimerMins =
    productDetailsById &&
    productDetailsById.sprints_duration_mins[currentSprint.index - 1]
  const currentSprintTimerMiliSeconds = currentSprintTimerMins * 60000
  return (
    <>
      <div className="left-fix-wrap">
        {storyListBySprintId && storyListBySprintId.length > 0 ? (
          <>
            <div className="w-full time-wrap">
              <div className="text-22 font-semibold">
                {currentSprint && currentSprint.title}
              </div>
              {currentSprint && !currentSprint.is_completed && (
                <>
                  <p className="w-full text-12 time-heading">Time Remaining</p>
                  <div className="w-full pending-hours">
                    <abbr className="clock-img">
                      <img src={timeRemainingImage} alt="" />
                    </abbr>

                    <p className="text-body">
                      <Countdown
                        date={
                          moment(currentSprint.created_at) +
                          currentSprintTimerMiliSeconds
                        }
                        renderer={renderer}
                      />
                    </p>
                  </div>
                </>
              )}
            </div>

            <Stories storyListBySprintId={storyListBySprintId} />
          </>
        ) : (
          <div className="no-sprint-data">
            <img src={emptyIcon} alt="emptyIcon" />
            <p className="text-16 text-center font-opcaity-05">
              Create a Sprint to view Stories.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default TaskboardStory
