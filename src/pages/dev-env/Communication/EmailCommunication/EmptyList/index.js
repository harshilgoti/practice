import React from "react"

import illustrationInboxImage from "assets/images/all-new-svg-icons/illustrationInbox.svg"

function EmptyEmailList(props) {
  const status = props.status === "inbox" ? "inbox" : "sentbox"
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "email-inbox-empty" --> */}
      <div className="email-inbox-empty flex active">
        <img src={illustrationInboxImage} />
        <p className="para text-13">Your {status} is empty</p>
      </div>
    </>
  )
}

export default EmptyEmailList
