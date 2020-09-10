import React from "react"
import StoryBoardPanel from "./StroyBoardPanel"
import { DragDropContext } from "react-beautiful-dnd"
import { useSelector, useDispatch } from "react-redux"
import { updateTicketStatus, enqueueSnackbar } from "redux/action"
import emptyStroyTaskboard from "assets/images/empty-taskboard.jpg"

function StoryBoard(props) {
  const dispatch = useDispatch()
  let backlogTicketList = []
  let progressTicketList = []
  let doneTicketList = []
  let testingTicketList = []

  const ticketListByStoryId = useSelector(
    ({ product }) => product.ticketListByStoryId
  )
  const currentSprint = useSelector(({ product }) => product.currentSprint)

  const currentStory = useSelector(({ product }) => product.currentStory)
  const storyListBySprintId = useSelector(
    ({ product }) => product.storyListBySprintId
  )
  if (ticketListByStoryId && ticketListByStoryId.length) {
    ticketListByStoryId.forEach(ticket => {
      if (ticket.status === "backlog") {
        backlogTicketList.push(ticket)
      }
      if (ticket.status === "in-progress") {
        progressTicketList.push(ticket)
      }
      if (ticket.status === "in-testing") {
        testingTicketList.push(ticket)
      }
      if (ticket.status === "done") {
        doneTicketList.push(ticket)
      }
    })
  }
  const onDragEnd = result => {
    const { source, destination } = result
    //for completed or not completed
    if (!currentSprint.is_completed) {
      // status wise drag n drop
      if (
        source.droppableId === "backlog" &&
        destination.droppableId === "in-progress"
      ) {
        if (progressTicketList.length > 0) {
          const draggedBacklog = backlogTicketList.find(
            (backlog, index) => backlog.ticket.index === source.index
          )
          if (
            draggedBacklog.ticket.index ===
            progressTicketList[0].ticket.index + 1
          ) {
            const sourceIndex = backlogTicketList.findIndex(
              backlog => backlog.ticket.index === source.index
            )

            backlogTicketList.splice(sourceIndex, 1)
            progressTicketList.push(draggedBacklog)

            const body = {
              status: "in-progress"
            }
            dispatch(
              updateTicketStatus(
                currentSprint._id,
                currentStory._id,
                draggedBacklog._id,
                body
              )
            )
          } else {
            dispatch(
              enqueueSnackbar({
                message: `Please  follow your ticket order.`,
                options: {
                  key: new Date().getTime() + Math.random(),
                  variant: "warning"
                }
              })
            )
          }
        } else {
          const draggableBacklog =
            backlogTicketList[backlogTicketList.length - 1]
          const draggedBacklog = backlogTicketList.find(
            (backlog, index) => backlog.ticket.index === source.index
          )
          if (draggedBacklog.ticket.index === draggableBacklog.ticket.index) {
            const sourceIndex = backlogTicketList.findIndex(
              backlog => backlog.ticket.index === source.index
            )

            backlogTicketList.splice(sourceIndex, 1)
            progressTicketList.push(draggedBacklog)

            const body = {
              status: "in-progress"
            }
            dispatch(
              updateTicketStatus(
                currentSprint._id,
                currentStory._id,
                draggedBacklog._id,
                body
              )
            )
          } else {
            dispatch(
              enqueueSnackbar({
                message: `Please  follow your ticket order.`,
                options: {
                  key: new Date().getTime() + Math.random(),
                  variant: "warning"
                }
              })
            )
          }
        }
        // const draggedBacklog = backlogTicketList.find(
        //   (backlog, index) => backlog.ticket.index === source.index
        // )
        // const sourceIndex = backlogTicketList.findIndex(
        //   backlog => backlog.ticket.index === source.index
        // )

        // backlogTicketList.splice(sourceIndex, 1)
        // progressTicketList.push(draggedBacklog)

        // const body = {
        //   status: "in-progress"
        // }
        // dispatch(
        //   updateTicketStatus(
        //     currentSprint._id,
        //     currentStory._id,
        //     draggedBacklog._id,
        //     body
        //   )
        // )
      }

      if (
        source.droppableId === "in-progress" &&
        destination.droppableId === "in-testing"
      ) {
        if (testingTicketList.length > 0) {
          dispatch(
            enqueueSnackbar({
              message: `You can't take more then one tickets in testing.`,
              options: {
                key: new Date().getTime() + Math.random(),
                variant: "warning"
              }
            })
          )
        } else {
          const draggedBacklog = progressTicketList.find(
            (backlog, index) => backlog.ticket.index === source.index
          )
          const sourceIndex = progressTicketList.findIndex(
            backlog => backlog.ticket.index === source.index
          )
          const body = {
            status: "in-testing"
          }
          progressTicketList.splice(sourceIndex, 1)
          testingTicketList.push(draggedBacklog)

          dispatch(
            updateTicketStatus(
              currentSprint._id,
              currentStory._id,
              draggedBacklog._id,
              body
            )
          )
        }
      }

      if (
        (source.droppableId === "backlog" &&
          destination.droppableId === "in-testing") ||
        (source.droppableId === "in-progress" &&
          destination.droppableId === "backlog") ||
        (source.droppableId === "in-testing" &&
          destination.droppableId === "in-progress") ||
        (source.droppableId === "in-testing" &&
          destination.droppableId === "backlog")
      ) {
        dispatch(
          enqueueSnackbar({
            message: `Something went wrong.`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "warning"
            }
          })
        )
      }
    } else {
      dispatch(
        enqueueSnackbar({
          message: `Your sprint has been completed.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error"
          }
        })
      )
    }
  }

  return (
    <>
      <div className="right-wrap">
        {storyListBySprintId && storyListBySprintId.length > 0 ? (
          <div className="w-full main-content-wrap">
            <div className="inner-wrap">
              <DragDropContext onDragEnd={onDragEnd}>
                <StoryBoardPanel
                  isDisableDrop={false}
                  title={"Backlog"}
                  status={"backlog"}
                  storyList={backlogTicketList}
                />
                <StoryBoardPanel
                  isDisableDrop={false}
                  title={"In Progress"}
                  status={"in-progress"}
                  storyList={progressTicketList}
                />
                <StoryBoardPanel
                  isDisableDrop={false}
                  title={"Testing"}
                  status={"in-testing"}
                  storyList={testingTicketList}
                />
                <StoryBoardPanel
                  isDisableDrop={true}
                  title={"Done"}
                  status={"done"}
                  storyList={doneTicketList}
                />
              </DragDropContext>
            </div>
          </div>
        ) : (
          <div className="no-data-story">
            <img src={emptyStroyTaskboard} alt="emptyStroyTaskboard" />
            <p className="text-16 text-center font-opcaity-05">
              Your tasks for the Story will appear here once you create a
              Sprint.
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default StoryBoard
