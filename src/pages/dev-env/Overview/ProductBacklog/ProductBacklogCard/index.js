import React from "react"

import backlogicon01Image from "assets/images/chatbot/backlogicon01.png"
import backlogicon02Image from "assets/images/chatbot/backlogicon02.png"
import { Draggable } from "react-beautiful-dnd"

function ProductBacklogCard(props) {
  const { backlog, backlogIndex, draggbleTitle } = props

  const image =
    backlog.type === "story" ? backlogicon01Image : backlogicon02Image

  function handleOpenProductBacklogPopup(backlog) {
    props.openProductBacklogPopup(backlog)
  }
  return (
    <>
      <Draggable
        key={`${draggbleTitle}-card-${backlogIndex}`}
        draggableId={`${draggbleTitle}-card-${backlogIndex}`}
        index={backlogIndex}
        type="CARD"
        className="product-backlog-box"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="product-backlog-box popup-shadow01"
            onClick={e => handleOpenProductBacklogPopup(backlog)}
          >
            <img src={image} className="backlogicon" alt="backlogicon01Image" />
            <p className="para text-body">{backlog.title}</p>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default ProductBacklogCard
