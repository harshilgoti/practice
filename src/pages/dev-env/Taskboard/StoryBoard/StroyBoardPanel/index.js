import React from "react"
import TicketList from "./TicketList"

function StroyBoardPanel(props) {
  const { storyList, title, status, isDisableDrop } = props

  const sortedList = storyList.sort((a, b) => {
    let fa = a.ticket.index,
      fb = b.ticket.index

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })

  return (
    <>
      <div className={`status-column status-column-${status}`}>
        <h2 className={`h2 ${status}-text`}>{title}</h2>
        <TicketList
          title={title}
          status={status}
          storyList={sortedList}
          isDisableDrop={isDisableDrop}
        />
      </div>
    </>
  )
}

export default StroyBoardPanel
