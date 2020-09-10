import React from "react"
import SubmissionHistoryEmpty from "./SubmissionHistoryEmpty"
import SubmissionHistoryList from "./SubmissionHistoryList"
import { useSelector } from "react-redux"
function TicketDetailsPopup(props) {
  const ticketSubmissionList = useSelector(
    ({ product }) => product.ticketSubmissionList
  )
  const fetchingTicketSubmissionListLoading = useSelector(
    ({ product }) => product.fetchingTicketSubmissionListLoading
  )

  return (
    <>
      <div className="submission-history-wrap">
        {fetchingTicketSubmissionListLoading ? null : (
          <div className="text-18 font-semibold submission-history-text">
            Submission History
          </div>
        )}

        <div className="submissions">
          {fetchingTicketSubmissionListLoading ? (
            <></>
          ) : ticketSubmissionList.length > 0 ? (
            <SubmissionHistoryList />
          ) : (
            <SubmissionHistoryEmpty />
          )}
        </div>
      </div>
    </>
  )
}

export default TicketDetailsPopup
