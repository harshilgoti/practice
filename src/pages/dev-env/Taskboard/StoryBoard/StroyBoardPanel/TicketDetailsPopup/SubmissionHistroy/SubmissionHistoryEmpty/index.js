import React from "react"
import illustrationSubmissionHistoryImage from "assets/images/all-new-svg-icons/illustrationSubmissionHistory.svg"
function SubmissionHistoryEmpty(props) {
  return (
    <>
      {/* <!-- NOTE : No history html start here --> */}
      <div className="w-full no-submissions-wrap">
        <span className="no-submissions-icon">
          <img src={illustrationSubmissionHistoryImage} alt="" />
        </span>
        <div className="w-full text-body no-submissions-text">
          Your submission history will appear here
        </div>
      </div>
    </>
  )
}

export default SubmissionHistoryEmpty
