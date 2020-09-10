import React, { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import { Event } from "config/googleAnalytics"
import { Scrollbars } from "react-custom-scrollbars"
import { getTicketListByStoryId } from "redux/action"
import { useDispatch, useSelector } from "react-redux"
import Story from "../Story"

function Stories(props) {
  const dispatch = useDispatch()

  let location = useLocation()
  let pathArray = location.pathname.split("/")

  let history = useHistory()
  const { storyListBySprintId } = props
  const [isActiveStoryId, setIsActiveStoryId] = useState("")

  const currentSprint = useSelector(({ product }) => product.currentSprint)
  const currentStory = useSelector(({ product }) => product.currentStory)
  const ticketListByStoryId = useSelector(
    ({ product }) => product.ticketListByStoryId
  )

  const handleFetchTicketList = story => {
    if (pathArray.length === 6) {
      //remove last story id for replace with new story id

      pathArray.pop()
      const updatedPath = pathArray.join("/")

      setIsActiveStoryId(story._id)
      history.push(`${updatedPath}/${story._id}`)
      Event("STORY_CHANGED", "Redirect to current story.", "TASKBOARD_PAGE")
      dispatch(getTicketListByStoryId(currentSprint._id, story._id))
    }
  }

  useEffect(
    () => {
      if (ticketListByStoryId.length > 0) {
        currentSprint &&
          currentSprint._id &&
          storyListBySprintId &&
          storyListBySprintId.length &&
          pathArray.length >= 6 &&
          (pathArray[4] !== currentSprint._id ||
            pathArray[5] !== currentStory._id) &&
          dispatch(getTicketListByStoryId(currentSprint._id, pathArray[5]))

        pathArray.length >= 6 && setIsActiveStoryId(pathArray[5])
      } else {
        currentSprint &&
          currentSprint._id &&
          storyListBySprintId &&
          storyListBySprintId.length &&
          pathArray.length >= 6 &&
          dispatch(getTicketListByStoryId(currentSprint._id, pathArray[5]))

        pathArray.length >= 6 && setIsActiveStoryId(pathArray[5])
      }
    },
    [dispatch, currentSprint && currentSprint._id, pathArray.length],
    pathArray.length === 6 && pathArray[5]
  )
  // useEffect(
  //   () => {
  //     console.log("we called")
  //     currentSprint &&
  //       currentSprint._id &&
  //       storyListBySprintId &&
  //       storyListBySprintId.length &&
  //       pathArray.length >= 6 &&
  //       dispatch(getTicketListByStoryId(currentSprint._id, pathArray[5]))

  //     pathArray.length >= 6 && setIsActiveStoryId(pathArray[5])
  //   },
  //   [dispatch, currentSprint && currentSprint._id, pathArray.length],
  //   pathArray.length === 6 && pathArray[5]
  // )
  return (
    <>
      <div className="progress-main-wrap">
        <Scrollbars>
          {storyListBySprintId && storyListBySprintId.length
            ? storyListBySprintId.map((story, index) => {
                return (
                  <Story
                    story={story}
                    key={story._id}
                    fetchTicketList={handleFetchTicketList}
                    isStoryActive={
                      (!isActiveStoryId && index === 0) ||
                      isActiveStoryId === story._id
                    }
                  />
                )
              })
            : null}
        </Scrollbars>
      </div>
    </>
  )
}

export default Stories
