import React from "react"
import SubmissionSuccess from "./SubmissionSuccess"
import SubmissionFailed from "./SubmissionFailed"
import { useSelector } from "react-redux"

function SubmissionHistoryList(props) {
  const ticketSubmissionList = useSelector(
    ({ product }) => product.ticketSubmissionList
  )
  return (
    <>
      {ticketSubmissionList.map(submission => {
        if (submission.result === "passed") {
          return <SubmissionSuccess submission={submission} />
        } else {
          return <SubmissionFailed submission={submission} />
        }
      })}
    </>
  )
}

export default SubmissionHistoryList
