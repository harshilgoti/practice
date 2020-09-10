import React from "react"
import failedImage from "assets/images/all-new-svg-icons/failed.svg"
import moment from "moment"
function SubmissionFailed(props) {
  const { submission } = props
  return (
    <>
      {/* <!-- NOTE : Test failed html start here --> */}
      <div className="w-full submission-failed">
        <img src={failedImage} alt="" className="submission-failed-icon" />
        <div className="submission-failed-wrap">
          <p className="text-body submission-failed-heading">Testing Failed.</p>
          <p className="text-body">{submission.message}</p>
          <p className="text-caption date-time">
            {moment(submission.created_at).format("MMMM Do YYYY, h:mm:ss a")}
          </p>
        </div>
      </div>
    </>
  )
}

export default SubmissionFailed
