import React, { useState } from "react"
// import TicketDetailsPopup from "../TicketDetailsPopup"
function TicketCard(props) {
  const [isShowTicketDetailsPopup, setIsShowTicketDetailsPopup] = useState(
    false
  )
  const handleToggleTicketPopup = () => {
    setIsShowTicketDetailsPopup(!isShowTicketDetailsPopup)
  }
  return (
    <>
      <div className="w-full card-wrap" onClick={handleToggleTicketPopup}>
        <span className="card-status status-backend"> Backloag</span>
        <h5 className="h5 card-title">Ticket - 10</h5>
        <p className="text-body">
          Lorem ipsum dolor sitsdf amet, consectetur adiscing elit.
        </p>
      </div>

      {/* {isShowTicketDetailsPopup && (
        <TicketDetailsPopup close={handleToggleTicketPopup} />
      )} */}
    </>
  )
}

export default TicketCard
