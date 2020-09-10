import React from "react"

import backArrow from "assets/images/all-new-svg-icons/backArrow.svg"
function TicketXpPopup(props) {
  const { skillsXpList } = props

  const handleCloseTicketXpPopup = e => {
    props.closeXpDetails()
  }

  return (
    <>
      <span className="back-icon">
        <img
          src={backArrow}
          alt="backArrow"
          onClick={handleCloseTicketXpPopup}
        />
      </span>
      <div className="xp-main-wrap">
        {skillsXpList && skillsXpList.length > 0
          ? skillsXpList.map((xpObj, i) => {
              return (
                <div className="xp-details" key={i}>
                  <div className="text-26 text-primary-color">
                    {`+${xpObj.level_xp}xp`}
                  </div>
                  <div className="text-14 description-heading">
                    {xpObj.name}
                  </div>
                </div>
              )
            })
          : ""}
      </div>
    </>
  )
}

export default TicketXpPopup
