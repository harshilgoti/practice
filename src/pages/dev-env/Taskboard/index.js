import React from "react"
import SprintDetails from "./SprintDetails"
import StoryBoard from "./StoryBoard"
import DevEnvLayout from "components/DevEnvLayout"
import TicketDetailsPopup from "../Taskboard/StoryBoard/StroyBoardPanel/TicketDetailsPopup"
import { useLocation, useHistory } from "react-router-dom"

function TaskBoard(props) {
  let location = useLocation()
  let history = useHistory()

  let pathArray = location.pathname.split("/")
  const handleCloseTicketPopup = e => {
    //remove tic id on close
    history.goBack()
    // pathArray.pop()
    // const updatePathArray = pathArray.join("/")

    // history.push(`${updatePathArray}`)
  }

  return (
    <>
      <DevEnvLayout>
        <section className="tab-panel task-board">
          <SprintDetails />
          <StoryBoard />
          {pathArray.length === 7 && (
            <TicketDetailsPopup close={handleCloseTicketPopup} title="title " />
          )}
        </section>
      </DevEnvLayout>
    </>
  )
}

export default TaskBoard
