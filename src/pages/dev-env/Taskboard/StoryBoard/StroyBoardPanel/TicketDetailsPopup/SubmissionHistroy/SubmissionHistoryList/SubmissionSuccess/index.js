import React from "react"
import doneImage from "assets/images/all-new-svg-icons/done.svg"
import moment from "moment"

function SubmissionSuccess(props) {
  const { submission } = props
  return (
    <>
      {/* <!-- NOTE : Submissions are  there --> */}

      {/* <!-- NOTE : Test completed html start here --> */}
      <div className="w-full submission-completed">
        <div className="w-full title-wrapper">
          <img src={doneImage} alt="" className="test-done" />
          <div className="text-18 font-semibold">Completed</div>
        </div>
        <p className="text-body">{submission.message}</p>

        <p className="text-caption date-time">
          {moment(submission.created_at).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
      </div>
    </>
  )
}

export default SubmissionSuccess
