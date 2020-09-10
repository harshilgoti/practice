import React, { useState } from "react"
import TicketDetails from "./TicketDetails"
import SubmissionHistroy from "./SubmissionHistroy"
import closeImage from "assets/images/all-new-svg-icons/close.svg"
import TicketXpPopup from "../../../TicketXpPopup"
function TicketDetailsPopup(props) {
  const [isShowXpPopup, setIsShowXpPopup] = useState(false)
  const [currentTicketXpDetails, setCurrentTicketXpDetails] = useState([])
  const { title } = props
  const handleCloseTicketPopup = e => {
    props.close(e)
  }
  const handleOpenXpPopup = xpList => {
    setIsShowXpPopup(true)
    setCurrentTicketXpDetails(xpList)
  }

  const handleCloseXpPopup = () => {
    setIsShowXpPopup(false)
  }
  return (
    <>
      <div className="ticket-popup-overlay active">
        <div className="ticket-popup">
          <span className="close-icon">
            <img src={closeImage} alt="" onClick={handleCloseTicketPopup} />
          </span>
          {/* <!-- NOTE : Add "active" className on click to parent div which is "ticket-popup-overlay" --> */}
          {!isShowXpPopup ? (
            <>
              <TicketDetails title={title} openXpPopup={handleOpenXpPopup} />
              <SubmissionHistroy />
            </>
          ) : (
            <TicketXpPopup
              title="title "
              closeXpDetails={handleCloseXpPopup}
              skillsXpList={currentTicketXpDetails}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TicketDetailsPopup
