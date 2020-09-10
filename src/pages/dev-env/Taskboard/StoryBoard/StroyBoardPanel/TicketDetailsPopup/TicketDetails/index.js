import React, { useEffect } from "react"
import TicketDetailsHeading from "./TicketDetailsHeading"
import TicketDescription from "./TicketDescription"
import { useSelector, useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import {
  getTicketDetailsById,
  getTicketSubmissionDetailsById
} from "redux/action"
function TicketDetails(props) {
  const { title } = props
  let location = useLocation()
  const dispatch = useDispatch()

  let pathArray = location.pathname.split("/")
  const ticketDetailsById = useSelector(
    ({ product }) => product.ticketDetailsById
  )
  useEffect(() => {
    dispatch(getTicketDetailsById(pathArray[6]))
    dispatch(getTicketSubmissionDetailsById(pathArray[6]))
  }, [pathArray.join(",")])

  const handleOpenXpPopup = ticketDetailsById => {
    props.openXpPopup(ticketDetailsById)
  }

  return (
    <>
      <div className="ticket-details">
        {!!Object.keys(ticketDetailsById).length && (
          <>
            <TicketDetailsHeading
              title={title}
              handleOpenXpPopup={handleOpenXpPopup}
            />
            <TicketDescription />
          </>
        )}
      </div>
    </>
  )
}

export default TicketDetails
