import React from "react"
import { useParams, useHistory, useLocation } from "react-router-dom"
import { Event } from "config/googleAnalytics"
import overviewImage from "assets/images/all-new-svg-icons/overview.svg"
import overviewActiveImage from "assets/images/all-new-svg-icons/overview-active.svg"
import taskboardImage from "assets/images/all-new-svg-icons/taskBoard.svg"
import taskboardActiveImage from "assets/images/all-new-svg-icons/taskBoard-active.svg"
import versionControlImage from "assets/images/all-new-svg-icons/versionControl.svg"
import versionControlActiveImage from "assets/images/all-new-svg-icons/versionControl-active.svg"
// import codeReviewImage from "assets/images/all-new-svg-icons/codeReview.svg"
// import codeReviewActiveImage from "assets/images/all-new-svg-icons/codeReview-active.svg"
import communicationImage from "assets/images/all-new-svg-icons/communication.svg"
import communicationActiveImage from "assets/images/all-new-svg-icons/communication-active.svg"

function TabList(props) {
  let { upr_id } = useParams()
  let location = useLocation()
  let history = useHistory()
  const activeTab = location.pathname.split("/")[3]
  const handleSetActiveTab = tabName => {
    Event(`${tabName}`, `Redirect to ${tabName}  successfully`, "DEV_ENV_PAGE")

    history.push(`/dev-env/${upr_id}/${tabName}`)
  }

  return (
    <>
      <div className="tab-lists">
        <div
          className={activeTab === "overview" ? "tab active" : "tab"}
          onClick={() => handleSetActiveTab("overview")}
        >
          <abbr className="icon-img">
            <img src={overviewImage} alt="" />
            <img src={overviewActiveImage} alt="" className="active-img" />
          </abbr>
          <p className="text-16 menu-text">Overview</p>
        </div>
        <div
          className={activeTab === "task-board" ? "tab active" : "tab"}
          onClick={() => handleSetActiveTab("task-board")}
        >
          <abbr className="icon-img">
            <img src={taskboardImage} alt="" />
            <img src={taskboardActiveImage} alt="" className="active-img" />
          </abbr>
          <p className="text-16 menu-text">Task board</p>
        </div>
        <div
          className={activeTab === "version-control" ? "tab active" : "tab"}
          onClick={() => handleSetActiveTab("version-control")}
        >
          <abbr className="icon-img">
            <img src={versionControlImage} alt="" />
            <img
              src={versionControlActiveImage}
              alt=""
              className="active-img"
            />
          </abbr>
          <p className="text-16 menu-text">Version control</p>
        </div>
        {/* <div
          className={activeTab === "code-review" ? "tab active" : "tab"}
          onClick={() => handleSetActiveTab("code-review")}
        >
          <abbr className="icon-img">
            <img src={codeReviewImage} alt="" />
            <img src={codeReviewActiveImage} alt="" className="active-img" />
          </abbr>
          <p className="text-16 menu-text">Code reviews</p>
        </div> */}
        <div
          className={activeTab === "communication" ? "tab active" : "tab"}
          onClick={() => handleSetActiveTab("communication")}
        >
          <abbr className="icon-img">
            <img src={communicationImage} alt="" />
            <img src={communicationActiveImage} alt="" className="active-img" />
          </abbr>
          <p className="text-16 menu-text">Communication</p>
        </div>
      </div>
    </>
  )
}

export default TabList
