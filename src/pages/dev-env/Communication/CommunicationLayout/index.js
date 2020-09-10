import React, { useState, useEffect } from "react"
import { useParams, useHistory, useLocation } from "react-router-dom"
import { Event } from "config/googleAnalytics"
import DevEnvLayout from "components/DevEnvLayout"
import chatImage from "assets/images/all-new-svg-icons/chat.svg"
import chatActiveImage from "assets/images/all-new-svg-icons/chat-active.svg"
import mailImage from "assets/images/all-new-svg-icons/mail.svg"
import mailActiveImage from "assets/images/all-new-svg-icons/mail-active.svg"
import videocallImage from "assets/images/all-new-svg-icons/videoCall.svg"
import videocallActiveImage from "assets/images/all-new-svg-icons/videoCall-active.svg"
import documentImage from "assets/images/all-new-svg-icons/Document.svg"
import documentActiveImage from "assets/images/all-new-svg-icons/Document-active.svg"

function CommunicationLayout(props) {
  let { upr_id } = useParams()
  let history = useHistory()
  let location = useLocation()
  let pathArray = location.pathname.split("/")
  const [isActiveCommTab, setIsActiveCommTab] = useState("chat")

  const handleActiveTab = activeTabName => {
    history.push(`/dev-env/${upr_id}/communication/${activeTabName}`)
    Event(
      `${activeTabName}`,
      `Redirected to ${activeTabName}  successfully`,
      "COMMUNICATION_PAGE"
    )
    setIsActiveCommTab(activeTabName)
  }

  useEffect(() => {
    pathArray.length >= 4 && setIsActiveCommTab(pathArray[4])
  }, [pathArray.join(",")])
  return (
    <>
      <DevEnvLayout>
        <section className="tab-panel communication">
          <div className="w-full flex">
            <div className="communication-left">
              <div className="communication-left-wrap" id="style-3">
                <div
                  className={
                    isActiveCommTab === "chat"
                      ? "comm-left-sign-le-section text-18 active flex"
                      : "comm-left-sign-le-section text-18 flex"
                  }
                  onClick={() => handleActiveTab("chat")}
                >
                  <img src={chatImage} className="blackicon" alt="chatImage" />
                  <img
                    src={chatActiveImage}
                    className="blueicon"
                    alt="chatActiveImage"
                  />
                  chat
                </div>
                <div
                  className={
                    isActiveCommTab === "email"
                      ? "comm-left-sign-le-section text-18 active flex"
                      : "comm-left-sign-le-section text-18 flex"
                  }
                  onClick={() => handleActiveTab("email")}
                >
                  <img src={mailImage} className="blackicon" alt="mailImage" />
                  <img
                    src={mailActiveImage}
                    className="blueicon"
                    alt="mailActiveImage"
                  />
                  email
                </div>
                <div
                  className={
                    isActiveCommTab === "video"
                      ? "comm-left-sign-le-section text-18 active flex"
                      : "comm-left-sign-le-section text-18 flex"
                  }
                  onClick={() => handleActiveTab("video")}
                >
                  <img
                    src={videocallImage}
                    className="blackicon"
                    alt="videocallImage"
                  />
                  <img
                    src={videocallActiveImage}
                    className="blueicon"
                    alt="videocallActiveImage"
                  />
                  video call
                </div>
                <div
                  className={
                    isActiveCommTab === "file"
                      ? "comm-left-sign-le-section text-18 active flex"
                      : "comm-left-sign-le-section text-18 flex"
                  }
                  onClick={() => handleActiveTab("file")}
                >
                  <img
                    src={documentImage}
                    className="blackicon"
                    alt="documentImage"
                  />
                  <img
                    src={documentActiveImage}
                    className="blueicon"
                    alt="documentActiveImage"
                  />
                  Files
                </div>
              </div>
            </div>
            {props.children}
          </div>
        </section>
      </DevEnvLayout>
    </>
  )
}

export default CommunicationLayout
