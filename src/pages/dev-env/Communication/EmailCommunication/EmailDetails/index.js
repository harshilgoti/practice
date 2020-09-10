import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import { Event } from "config/googleAnalytics"
import { getEmailDetailsById } from "redux/action"
import EmailLayout from "../EmailLayout"
import backArrowImage from "assets/images/all-new-svg-icons/backArrow.svg"
import xlsImage from "assets/images/all-new-svg-icons/xls.svg"
// import pdfImage from "assets/images/all-new-svg-icons/pdf.svg"
function EmailDetails(props) {
  const dispatch = useDispatch()
  let history = useHistory()
  let { eml_id } = useParams()
  const emailDetailsById = useSelector(
    ({ product }) => product.emailDetailsById
  )
  useEffect(() => {
    dispatch(getEmailDetailsById(eml_id))
  }, [eml_id])

  const handleRedirectToEmailList = status => {
    Event(
      `${status}`,
      `Redirect to ${status} successfully.`,
      "COMMUNICATION_EMAIL_DETAILS_PAGE"
    )
    history.goBack()
  }
  return (
    <>
      <EmailLayout>
        {/* <!-- NOTE : Add "active" className on click to parent div which is "open-email" --> */}
        <div className="open-email active ">
          <div className="email-heading-main">
            <span className="left-arrow">
              <img
                src={backArrowImage}
                style={{ width: "24px", cursor: "pointer" }}
                alt=""
                onClick={() => handleRedirectToEmailList("inbox")}
              />
            </span>
            <div
              className="emailheading text-20 font-semibold"
              style={{ paddingLeft: "15px" }}
            >
              {emailDetailsById.subject}
            </div>
          </div>

          <div className="from-email text-14 font-semibold flex">
            <div className="from-name">
              From: {emailDetailsById && emailDetailsById.from}{" "}
            </div>
            <div className="from-time">
              {" "}
              {emailDetailsById &&
                moment(emailDetailsById.created_at).format("LT")}
            </div>
          </div>
          <div className="email-content">
            <p className="para text-12">
              {`Hi 
              ${emailDetailsById &&
                emailDetailsById.toUser &&
                emailDetailsById.toUser.name}
              ,`}
            </p>{" "}
            <p
              className="para text-12"
              dangerouslySetInnerHTML={{
                __html: emailDetailsById && emailDetailsById.message_body_html
              }}
            />
            <p className="para text-12">
              {emailDetailsById &&
                emailDetailsById.attachment &&
                emailDetailsById.attachment.length > 0 &&
                emailDetailsById.attachment.map(attchment => {
                  return (
                    <div className="attachements" key={attchment.url}>
                      <span>
                        <a href={attchment.url} download>
                          <img src={xlsImage} />
                          {attchment.file_name}
                        </a>
                      </span>
                    </div>
                  )
                })}
            </p>
            {/* <p className="para text-12">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                  ipsum purus, luctus vitae lectus ut, ornare pharetra orci.
                  Phasellus at lacus bibendum, blandit diam eu, feugiat nunc.
                  Donec ut purus augue.
                </p> */}
            <p className="para text-12">
              Thanks,
              <br />
              {emailDetailsById &&
                emailDetailsById.fromUser &&
                emailDetailsById.fromUser.name}
            </p>
          </div>
        </div>
      </EmailLayout>
    </>
  )
}

export default EmailDetails
