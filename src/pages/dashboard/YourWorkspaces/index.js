import React from "react"
// import image from "assets/images/AirBNB.svg"
import { useSelector } from "react-redux"
import { Event } from "config/googleAnalytics"
import { useHistory } from "react-router-dom"
import addIconSvg from "assets/images/all-new-svg-icons/addSprint.svg"
import emptyIcon from "assets/images/empty.jpg"
import CircularProgressbar from "react-pie-progressbar"
import { useDispatch } from "react-redux"
import { handleProjectDetailsById } from "redux/action"

function YourWorkspaces(props) {
  let history = useHistory()
  const dispatch = useDispatch()
  const { dashboardUserReport } = useSelector(({ dashboard }) => dashboard)
  const handleRedirecToDevEnv = workspaces => {
    Event(
      "RESUME PRODUCT",
      "Redirect to dev-env successfully",
      "DASHBOARD_PAGE"
    )
    history.push(`/dev-env/${workspaces.user_product_id}`)
    dispatch(handleProjectDetailsById())
  }
  const handleRedirecToCompniesRoleList = () => {
    history.push(`/companies-and-role-list`)
  }

  return (
    <div className="create-section-joyride">
      <section id="workspace-section">
        <div className="container">
          <div className="dashboard-your-workspaces">
            <div className="workspace-heading-main">
              <h2 className="h3 font-medium">Your Workspaces</h2>
              <span>
                <img
                  src={addIconSvg}
                  alt="addWorkspaceSvg"
                  onClick={() => handleRedirecToCompniesRoleList()}
                />
              </span>
            </div>
            <div className="workspaces">
              {dashboardUserReport &&
              dashboardUserReport.workspaces &&
              dashboardUserReport.workspaces.length ? (
                dashboardUserReport.workspaces.map((workspaces, i) => {
                  return (
                    <div className="workspace" key={i}>
                      <div className="workspace-details">
                        <div className="company-details">
                          <div className="company-logo-wrappper">
                            <img
                              className="company-logo"
                              src={
                                workspaces.company_logo_url &&
                                workspaces.company_logo_url
                              }
                              alt="company-details"
                            />
                          </div>

                          <div className="company-role-details">
                            <div className="text-28 font-semibold">
                              {workspaces.company_name &&
                                workspaces.company_name}
                            </div>
                            <CircularProgressbar
                              percentage={
                                workspaces && workspaces.completed_perc
                              }
                            />

                            {/* <div className="text-18 truncate">
                              {workspaces.description_body_text &&
                                workspaces.description_body_text}
                            </div> */}
                            {/* <div className="progress-limit">
                            <div className="progress-show">
                              <div className="inner-wrap orange-color">
                                <span
                                  className="progress-rate"
                                  style={{
                                    width: `${workspaces &&
                                      workspaces.completed_perc}%`
                                  }}
                                ></span>
                              </div>
                            </div>
                            <div className="progress-percent">
                              <p className="text-body">
                                {" "}
                                {workspaces && workspaces.completed_perc}%
                              </p>
                            </div>
                          </div> */}
                          </div>
                        </div>

                        <div className="text-22 workspace-name">
                          <span className="font-semibold ">Workspace :</span>
                          <span className="text-blue">
                            {" "}
                            {workspaces.title && workspaces.title}
                          </span>
                        </div>
                        <div className="text-22 workspace-name">
                          <span className="font-semibold ">Role :</span>{" "}
                          <span className="text-blue">
                            {" "}
                            {workspaces.role_title && workspaces.role_title}
                          </span>
                        </div>
                        <div className="workspace-action">
                          <div
                            className="hover-text"
                            onClick={() => handleRedirecToDevEnv(workspaces)}
                          >
                            Resume
                          </div>{" "}
                        </div>
                      </div>
                      <div className="workspace-statistics">
                        <div className="statictics-box">
                          <div className="text-28 number">
                            {workspaces.xp_gained && workspaces.xp_gained}
                          </div>
                          <div className="text-22 sub-title">XP Gained</div>
                        </div>

                        <div className="statictics-box">
                          <div className="text-28 number">
                            {workspaces.task_completed &&
                              workspaces.task_completed}
                          </div>
                          <div className="text-22 sub-title">
                            Task Completed
                          </div>
                        </div>
                        {/* Time spent commented */}
                        {/* <div className="statictics-box">
                          <div className="text-28 number">28 hours</div>
                          <div className="text-22 sub-title">Time Spent</div>
                        </div> */}
                      </div>
                      <div className="workspace-skills">
                        <div className="text-22 font-medium">Skills</div>
                        <div className="skills-list">
                          {workspaces &&
                          workspaces.skills &&
                          workspaces.skills.length ? (
                            workspaces.skills.map((skill, i) => {
                              return (
                                <div className="skill" key={i}>
                                  <div className="text-14 skill-title">
                                    {skill.name && skill.name}
                                  </div>
                                  <div className="text-22 skill-xp">
                                    {skill.xp && skill.xp} XP
                                  </div>
                                </div>
                              )
                            })
                          ) : (
                            <div className="no-data-available-workspace-skills">
                              <img src={emptyIcon} alt="emptyIcon" />
                              <p className="text-18 text-center font-opcaity-05">
                                Your skills for this workspace will show up
                                after you complete your first task
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="no-data-workspace">
                  <div className="no-data-available-workspace">
                    <div>
                      <img src={emptyIcon} alt="emptyIcon" />
                      <p className="text-16 text-center font-opcaity-05 ">
                        You aren't part of any workspaces yet.
                      </p>
                      <div className="text-18 ">
                        <span
                          className="hover-text"
                          onClick={() => handleRedirecToCompniesRoleList()}
                        >
                          Create one
                        </span>{" "}
                        <span className="text-16 text-center font-opcaity-05 ">
                          to get started.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {dashboardUserReport.workspaces &&
            dashboardUserReport.workspaces.length > 0 ? (
              <div className="add-workspace-btn joyride-3">
                <div className="add-btn-main">
                  <a
                    className="hover-text text-20"
                    onClick={() => handleRedirecToCompniesRoleList()}
                  >
                    Create another workspace
                  </a>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default YourWorkspaces
