import React from "react"
import TicketCard from "../TicketCard"
import { Scrollbars } from "react-custom-scrollbars"
import { Droppable } from "react-beautiful-dnd"

function TicketList(props) {
  const { storyList, isDisableDrop } = props
  return (
    <>
      <Droppable
        droppableId={`${props.status}`}
        type="CARD"
        isDropDisabled={isDisableDrop}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="w-full main-card-wrap"
          >
            <Scrollbars
              autoHeight
              autoHeightMin={50}
              autoHeightMax={"calc(100vh - 276px)"}
              // style={{ minHeight: "50px" }}
            >
              {storyList.map((ticket, i) => {
                return (
                  <TicketCard
                    key={ticket._id}
                    ticketIndex={ticket._id}
                    index={ticket.ticket.index}
                    title={props.title}
                    ticketDetails={ticket}
                  />
                )
              })}
            </Scrollbars>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  )
}

export default TicketList
