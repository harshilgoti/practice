import React, { useEffect } from "react"
import EmailLayout from "../EmailLayout"
import EmptyEmailList from "../EmptyList"
import { Scrollbars } from "react-custom-scrollbars"

import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory, useLocation } from "react-router-dom"
import moment from "moment"
import { getEmailListByStatus } from "redux/action"
import xlsImage from "assets/images/all-new-svg-icons/xls.svg"
// import pdfImage from "assets/images/all-new-svg-icons/pdf.svg"

function EmailList(props) {
  let { upr_id } = useParams()
  const dispatch = useDispatch()
  let history = useHistory()
  let location = useLocation()
  let pathArray = location.pathname.split("/")

  useEffect(() => {
    if (pathArray[5] === "inbox") {
      dispatch(getEmailListByStatus(upr_id, "received"))
    } else {
      dispatch(getEmailListByStatus(upr_id, pathArray[5]))
    }
  }, [upr_id])

  const emailListByStatus = useSelector(
    ({ product }) => product.emailListByStatus
  )
  const handleRedirectToEmailDetails = mail => {
    history.push(`/dev-env/${upr_id}/communication/email/${mail._id}`)
  }
  return (
    <>
      <EmailLayout>
        {emailListByStatus.length > 0 ? (
          <div className="email-inbox-items active" id="style-3">
            <Scrollbars
              autoHeight
              autoHeightMin={50}
              autoHeightMax={"calc(100vh - 276px)"}
            >
              {emailListByStatus.map(mail => {
                return (
                  <div
                    key={mail._id}
                    className="email-single-item flex text-body"
                    onClick={() => handleRedirectToEmailDetails(mail)}
                  >
                    <div className="from-name">{mail.fromUser.name}</div>
                    <div className="email-subject">
                      <strong className="font-semibold"> {mail.subject}</strong>{" "}
                      -{mail.message_body_text}
                      {mail.attachment.length > 0 &&
                        mail.attachment.map(attchment => {
                          return (
                            <div className="attachements" key={attchment.url}>
                              <span>
                                <img src={xlsImage} />
                                {attchment.file_name}
                              </span>
                            </div>
                          )
                        })}
                    </div>
                    <div className="emailtime">
                      {moment(mail.created_at).format("LT")}
                    </div>
                  </div>
                )
              })}
            </Scrollbars>
          </div>
        ) : (
          <EmptyEmailList status={pathArray[5]} />
        )}
      </EmailLayout>
    </>
  )
}

export default EmailList
