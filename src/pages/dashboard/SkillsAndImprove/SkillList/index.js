import React from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { useSelector } from "react-redux"
import emptyIcon from "assets/images/empty.jpg"
import Skill from "./Skill"

function SkillList(props) {
  const { dashboardUserReport } = useSelector(({ dashboard }) => dashboard)

  return (
    <div className="details-box joyride-2">
      <div className="heading">
        <div className="text-22">Skills</div>
        {/* <div className="hover-text">View all</div> */}
      </div>

      <div className="content skills-content">
        <Scrollbars autoHeight autoHeightMin={50} autoHeightMax={196}>
          {dashboardUserReport &&
          dashboardUserReport.skills &&
          !!dashboardUserReport.skills.length ? (
            dashboardUserReport.skills.map((skl, i) => {
              return <Skill skl={skl} key={i} />
            })
          ) : (
            <div className="empty-message-outer">
              <div className="empty-message-inner">
                <img src={emptyIcon} alt="emptyIcon" />
                <p className="text-16 text-center font-opcaity-05 ">
                  Complete your first task to start building your skills profile
                </p>
                {/* <div
                  className="hover-text text-16 "
                  onClick={() => handleRedirecToCompniesRoleList()}
                >
                  Begin now
                </div> */}
              </div>
            </div>
          )}
        </Scrollbars>
      </div>
    </div>
  )
}

export default SkillList
