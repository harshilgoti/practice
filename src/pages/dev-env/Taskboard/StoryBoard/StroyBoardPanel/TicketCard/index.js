import React from "react"
import { Draggable } from "react-beautiful-dnd"
import { Event } from "config/googleAnalytics"
import { useHistory, useLocation } from "react-router-dom"
import { stringTruncator } from "utils/helpers"
function TicketCard(props) {
  let location = useLocation()

  let history = useHistory()

  const { ticketIndex, title, ticketDetails, index } = props
  const handleToggleTicketPopup = ticketDetails => {
    Event(
      "TICKET_POPUP_SHOW",
      "Redirect to ticket popup successfully",
      "TASKBOARD_PAGE"
    )
    history.push(`${location.pathname}/${ticketDetails.ticket_id}`)
  }
  const totalXp = ticketDetails.ticket.skills_xp.reduce((acc, cur) => {
    const values = Object.values(cur)[0]
    return acc + values
  }, 0)
  return (
    <>
      <Draggable
        key={`${title}-card-${ticketIndex}`}
        draggableId={`${title}-card-${ticketIndex}`}
        index={index}
        type="CARD"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="w-full card-wrap"
            onClick={() => handleToggleTicketPopup(ticketDetails)}
          >
            <span className="card-status status-backend">{`+ ${totalXp} XP`}</span>

            <h5 className="h5 card-title">{`Ticket #${index} ${ticketDetails.ticket.title}`}</h5>
            <p className="text-body">
              {ticketDetails.ticket.description_body_text.length >= 103
                ? stringTruncator(
                    ticketDetails.ticket.description_body_text,
                    103
                  )
                : ticketDetails.ticket.description_body_text}
            </p>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default TicketCard
