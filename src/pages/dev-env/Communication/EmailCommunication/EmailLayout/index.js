import React from "react"
import { Event } from "config/googleAnalytics"
import { useParams, useHistory, useLocation } from "react-router-dom"
import CommunicationLayout from "../../CommunicationLayout"
import backArrowImage from "assets/images/all-new-svg-icons/backArrow.svg"
function EmailLayout(props) {
  let { upr_id } = useParams()
  let history = useHistory()
  let location = useLocation()
  let pathArray = location.pathname.split("/")

  const handleRedirectToComposeEmail = () => {
    history.push(`/dev-env/${upr_id}/communication/email/compose`)
    Event(
      "COMPOSE_EMAIL",
      "Redirect to compose email successfully.",
      "COMMUNICATION_EMAIL_PAGE"
    )
  }

  const handleRedirectToEmailList = status => {
    Event(
      `${status}`,
      `Redirect to ${status} successfully.`,
      "COMMUNICATION_EMAIL_PAGE"
    )
    history.push(`/dev-env/${upr_id}/communication/email/${status}`)
  }
  return (
    <>
      <CommunicationLayout>
        <div className="communication-right">
          {/* <!-- NOTE : Add "active" className on click to parent div which is "email-inbox" --> */}
          <div className="email-inbox flex active">
            <div className="email-inbox-head flex ">
              {pathArray[5] === "compose" ? (
                <span
                  className="left-arrow"
                  style={{ width: "34px", cursor: "pointer" }}
                >
                  <img
                    src={backArrowImage}
                    alt=""
                    onClick={() => handleRedirectToEmailList("inbox")}
                  />
                </span>
              ) : (
                <div className="inbox-wrapper flex text-14">
                  <div
                    className={
                      pathArray[5] === "inbox"
                        ? "inbox-receive active"
                        : "inbox-receive "
                    }
                    onClick={() => handleRedirectToEmailList("inbox")}
                  >
                    inbox
                  </div>
                  <div
                    className={
                      pathArray[5] === "sent"
                        ? "inbox-receive active"
                        : "inbox-receive "
                    }
                    onClick={() => handleRedirectToEmailList("sent")}
                  >
                    sent
                  </div>
                </div>
              )}

              <a
                onClick={() => handleRedirectToComposeEmail()}
                className={
                  pathArray[5] === "compose"
                    ? "upload-new upload-disable"
                    : "upload-new upload"
                }
              >
                Compose
              </a>
            </div>
            {props.children}
          </div>
        </div>
      </CommunicationLayout>
    </>
  )
}

export default EmailLayout
