import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { EVENTS } from "react-joyride"
import Joyride from "react-joyride"
import CallBackProps from "react-joyride"
import CountUp from "react-countup"

import SkillsAndImprove from "./SkillsAndImprove"
import DashboardLayout from "../../components/Dashboard/Layout"
// import JoyRidePopup from "components/JoyRidePopup"
import { useHistory, useLocation } from "react-router-dom"
import InterestPopup from "./UserInterests"
import LevelUpSliderPopup from "./LevelUpSliderPopup"
import SelectUserTypePopup from "./SelectUserType"
import YourWorkspaces from "./YourWorkspaces"
import {
  getCompaniesAndRolesList,
  getLanguageList,
  getDashboardUserReport,
  getDashboardUserReportForXpTimeline,
  updateUserProfile
} from "../../redux/action"
// import graphImage from "assets/images/graph.jpg"
import XpTimeline from "./XpTimeline"
import ChangePasswordPopup from "components/Dashboard/ChangePasswordPopup"
import WelcomeSliderPopup from "./WelcomeSliderPopup"

const xpLevel = [
  {
    level: 0,
    xpLow: 0,
    xpUp: 100
  },
  {
    level: 1,
    xpLow: 100,
    xpUp: 280
  }
]

function Dashboard(props) {
  let history = useHistory()
  let userToken = localStorage.getItem("user-token")
  let search = props.location.search
  let params = new URLSearchParams(search)
  let isShowUserInterest = params.get("isShow")

  const dispatch = useDispatch()

  const steps = [
    {
      title: "See your level",
      // content: "View your profile, update details, or change email addess.",
      placement: "auto",
      target: ".dashboard-user-info",
      disableBeacon: true
    },
    {
      title: "See your Xp time line",
      // content: "View your profile, update details, or change email addess.",
      placement: "auto",
      target: ".right-box-wrapper  .graph-box",
      disableBeacon: true
    },
    {
      title: "See your skills",
      //content: "View you available work space list.",
      placement: "auto",
      target: ".dashboard-skill-and-improve-details .joyride-2"
      // offset: "0"
    },
    {
      title: "Create a new workspace",
      // content: "hello 3 step 3 title 3 content 3",
      placement: "auto",
      target: ".create-section-joyride .joyride-3"
      // offset: ""
    }
  ]
  const [run, setStateRun] = useState(false)
  const [isShowInterestPopup, setIsShowInterestPopup] = useState(false)
  const [interestUpdate, setInterestUpdate] = useState("")

  const [isShowSelectUserTypePopup, setIsShowSelectUserTypePopup] = useState(
    false
  )
  // const [stepIndex, setStepIndex] = useState(1)
  const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState(
    false
  )
  const { dashboardUserReport, dashboardUserReportForXpTimeline } = useSelector(
    ({ dashboard }) => dashboard
  )

  const { userDetails, isShowUpdateLevelPopup, userXp } = useSelector(
    ({ user }) => user
  )
  let location = useLocation()

  let pathArray = location.pathname.split("/")

  const userInterestedLangList = userDetails && userDetails.interested_languages

  const languagesList = useSelector(({ common }) => common.languagesList)
  const { companiesAndRolesList } = useSelector(({ job }) => job)
  const xpCount = userXp
  const levelCount = xpLevel.find(
    xp => xp.xpLow <= xpCount && xpCount <= xp.xpUp
  )
  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    } catch (error) {
      window.scrollTo(0, 0)
    }
  }, [pathArray.length])
  useEffect(() => {
    userToken &&
      !companiesAndRolesList.length &&
      dispatch(getCompaniesAndRolesList())
  }, [dispatch, companiesAndRolesList.length, userToken])

  useEffect(() => {
    !languagesList.length && dispatch(getLanguageList())
  }, [dispatch, languagesList.length])

  useEffect(() => {
    if (
      isShowUserInterest ||
      (userInterestedLangList && userInterestedLangList.length <= 0)
    ) {
      // setIsShowInterestPopup(true)
      setInterestUpdate("next")
    }
  }, [isShowUserInterest, userInterestedLangList])

  useEffect(() => {
    dispatch(getDashboardUserReport())
  }, [dispatch, Object.values(dashboardUserReport).join(",")]) //eslint-disable-line

  useEffect(() => {
    dashboardUserReport &&
      dashboardUserReport.workspace_count > 0 &&
      dispatch(getDashboardUserReportForXpTimeline())
  }, [dispatch, dashboardUserReport && dashboardUserReport.workspace_count]) //eslint-disable-line

  const handleCloseInterestPopup = () => {
    setIsShowInterestPopup(false)
  }

  const handleOpenSelectUserTypePopup = () => {
    setIsShowSelectUserTypePopup(true)
  }
  const handleCloseSelectUserTypePopup = () => {
    setIsShowSelectUserTypePopup(false)
  }

  const handleOpenInterestPopup = () => {
    setIsShowInterestPopup(true)
    setInterestUpdate("update")
  }

  // const handelRedirectToJobList = () => {
  //   Event(
  //     "GET_STARTED",
  //     "Redirect to work space page successfully",
  //     "DASHBOARD_PAGE"
  //   )
  //   history.push("/companies-and-role-list")
  // }

  // let filteredCompaniesAndRolesList =
  //   companiesAndRolesList &&
  //   companiesAndRolesList.filter(job => job.is_user_begin)
  // const handleClickNextButton = () => {
  //   if (joyRideRun && stepIndex) {
  //     setTimeout(() => {
  //       setStepIndex(stepIndex + 1)
  //     }, 400)
  //   }
  // }

  const handleCloseChangePasswordPopup = () => {
    setIsShowChangePasswordPopup(false)
    if (
      userDetails &&
      userDetails.interested_languages &&
      userDetails.interested_languages.length === 0
    ) {
      setIsShowInterestPopup(true)
    }
  }
  const handleRedirecToCompniesRoleList = () => {
    history.push(`/companies-and-role-list`)
  }
  const handleCloseSliderPopup = () => {
    if (userDetails && userDetails.is_old_user) {
      setIsShowChangePasswordPopup(true)
    }

    if (
      userDetails &&
      userDetails.interested_languages &&
      userDetails.interested_languages.length === 0
    ) {
      setIsShowInterestPopup(true)
    }
  }

  function handleCloseLevelUpPopup() {
    setStateRun(true)

    const body = {
      is_workspace_onboarded: true
    }
    dispatch(updateUserProfile(body))
  }

  // function handleJoyrideCallback(data) {
  //   const { joyride } = props
  //   const { action, index, type } = data
  //   console.log("action", action, "index", index, "type", type)
  //   setStepIndex(index + 1)
  // }

  function handleJoyrideCallback(data = CallBackProps) {
    // const { joyride } = this.props;
    const { index, type } = data

    if (index === 2 && type === EVENTS.TOUR_END) {
      const body = {
        is_workspace_onboarded: true
      }
      setStateRun(false)
      dispatch(updateUserProfile(body))
    }

    // if (type === EVENTS.STEP_AFTER && index === 0) {
    //   // setTimeout(() => {
    //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    //   // }, 1200);
    // } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
    //   // Update state to advance the tour
    //   setStepIndex(index + (action === ACTIONS.PREV ? -1 : 1))
    // } else if (type === EVENTS.TOOLTIP_CLOSE) {
    //   setStepIndex(index + 1)
    // }

    // if (typeof joyride.callback === "function") {
    //   joyride.callback(data);
    // } else {
    //   console.group(type);
    //   console.log(data); //eslint-disable-line no-console
    //   console.groupEnd();
    // }

    // STATUS.SKIPPED
  }

  return (
    <>
      <DashboardLayout>
        {/* <div className="app_joyride"> */}
        {/* {!run ? (
            <JoyRidePopup
              open={false}
              handleStartJoyRide={() => {
                setStateRun(true)
              }}
            />
          ) : null} */}
        <Joyride
          // stepIndex={stepIndex}
          callback={handleJoyrideCallback}
          continuous
          //getHelpers={this.getHelpers}
          run={run}
          scrollToFirstStep
          showProgress={true}
          //showSkipButton
          hideBackButton={true}
          disableCloseOnEsc
          disableOverlayClose
          steps={steps}
          styles={{
            options: {
              zIndex: 100
            },
            buttonClose: {
              display: "none"
            }
          }}
        />
        {/* </div> */}

        <section>
          <div className="container  user-info">
            <div className="dashboard-padding-main">
              <div className="dashboard-user-info">
                <div className="avatar">
                  <img
                    className="img"
                    src={
                      userDetails && userDetails.avatar_image_url
                        ? userDetails.avatar_image_url
                        : // old   : "https://zero-to-career-assets.s3.us-east-2.amazonaws.com/user_icon.png"
                          "https://user-code-zerotocareer-dev.s3.us-east-2.amazonaws.com/user/png/user-icon.png"
                    }
                    //src=""
                    alt="profile"
                  />
                </div>
                <div className="dashboard-user-right-block-info">
                  <h2 className="font-medium ">
                    {userDetails && userDetails.first_name
                      ? `Hi ${userDetails &&
                          userDetails.first_name}, here's your journey so far`
                      : `Hi, here'is your journey so far`}
                  </h2>
                  <div className="current-level-xp-main ">
                    {" "}
                    <div className="current-level text-16">
                      {" "}
                      Level - {levelCount && levelCount.level}{" "}
                    </div>
                    <div className="current-xp text-16">
                      {/* {dashboardUserReport && dashboardUserReport.total_xp}/{levelCount && levelCount.xpUp} XP{" "} */}
                      {xpCount}/{levelCount && levelCount.xpUp} XP{" "}
                    </div>
                  </div>
                  <div
                    className={
                      xpCount === 0
                        ? "current-xp-bar blink-background stat-1 stat-bar"
                        : "current-xp-bar stat-1 stat-bar"
                    }
                  >
                    <div
                      className="fill-bar stat-bar-rating"
                      role="stat-bar"
                      style={{
                        width: `${`${(xpCount / levelCount.xpUp) * 100}%`}`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="dashboard-all-statistics">
              <div className="left-box-wrapper">
                <div className="box">
                  <div className="text-36 number">
                    {dashboardUserReport && dashboardUserReport.total_xp ? (
                      <CountUp
                        end={dashboardUserReport.total_xp}
                        duration={2.75}
                      />
                    ) : (
                      0
                    )}
                  </div>
                  <div className="text-22">Total XP</div>
                  <div className="text-18 hover-text box-action"></div>
                </div>

                <div className="box">
                  <div className="text-36 number">
                    {dashboardUserReport &&
                    dashboardUserReport.workspace_count ? (
                      <CountUp
                        end={dashboardUserReport.workspace_count}
                        duration={2.75}
                      />
                    ) : (
                      0
                    )}
                  </div>
                  <div className="text-22">
                    {" "}
                    {dashboardUserReport &&
                    dashboardUserReport.workspace_count &&
                    dashboardUserReport.workspace_count > 1
                      ? "Workspaces"
                      : "Workspace"}
                  </div>
                  {dashboardUserReport &&
                  dashboardUserReport.workspace_count ? (
                    <a
                      className="text-18 hover-text box-action"
                      href="#workspace-section"
                    >
                      View All
                    </a>
                  ) : (
                    <div
                      className="text-18 hover-text box-action "
                      onClick={() => handleRedirecToCompniesRoleList()}
                    >
                      <div> Create a new workspace</div>
                    </div>
                  )}
                </div>

                <div className="box">
                  <div className="text-36 number">
                    {" "}
                    {userInterestedLangList && userInterestedLangList.length ? (
                      <CountUp
                        end={userInterestedLangList.length}
                        duration={2.75}
                      />
                    ) : (
                      "0"
                    )}
                  </div>
                  <div className="text-22">
                    {userInterestedLangList && userInterestedLangList.length > 1
                      ? "Interests"
                      : "Interest"}
                  </div>
                  <div className="text-18 hover-text box-action">
                    <div onClick={handleOpenInterestPopup}>
                      Update Interests
                    </div>
                  </div>
                </div>
              </div>

              {/* <img src={graphImage} alt="" title="" /> */}
              <XpTimeline
                data={dashboardUserReportForXpTimeline}
                workspaceCount={
                  dashboardUserReport && dashboardUserReport.workspace_count
                }
              />
            </div>
          </div>
        </section>

        <SkillsAndImprove />

        <YourWorkspaces className="joyride-3" />
        {/* No Workspaces Commented */}
        {/* {isCompaniesAndRolesListLoaded &&
        !filteredCompaniesAndRolesList.length ? (
          <section className="w-full employerMain">
            <div className="joyride-1 container">
              <h2 className="h3 font-medium">Your Workspaces</h2>
              <div className="no-data-available">
                <h6>
                  <div className="nav-link " style={{ marginBottom: "8px" }}>
                    Looking a little empty
                  </div>
                </h6>
                <h6 className="nav-link " style={{ marginTop: "8px" }}>
                  <div className="hover-text" onClick={handelRedirectToJobList}>
                    Click here to get started
                  </div>
                </h6>
              </div>
            </div>
          </section>
        ) : (
          ""
        )} */}

        {/* <Slider {...settings}> */}

        {userDetails &&
          (userDetails.is_old_user ||
            (!isShowInterestPopup &&
              userDetails.interested_languages &&
              userDetails.interested_languages.length == 0)) && (
            <WelcomeSliderPopup close={handleCloseSliderPopup} />
          )}

        {/* <div> */}

        {userDetails && !userDetails.is_old_user && isShowInterestPopup && (
          <InterestPopup
            open={isShowInterestPopup}
            close={handleCloseInterestPopup}
            openSelectUserTypePopup={handleOpenSelectUserTypePopup}
            interestUpdate={interestUpdate}
          />
        )}

        {isShowSelectUserTypePopup && (
          <SelectUserTypePopup
            open={isShowSelectUserTypePopup}
            close={handleCloseSelectUserTypePopup}
          />
        )}

        {userDetails &&
          userDetails.is_old_user &&
          isShowChangePasswordPopup && (
            <ChangePasswordPopup
              isShowChangePasswordPopup={userDetails.is_old_user}
              isOldUser={userDetails.is_old_user}
              closed={handleCloseChangePasswordPopup}
            />
          )}

        {!run &&
          Object.keys(userDetails).length > 0 &&
          !userDetails.is_workspace_onboarded &&
          isShowUpdateLevelPopup && (
            <LevelUpSliderPopup close={handleCloseLevelUpPopup} />
          )}
      </DashboardLayout>
    </>
  )
}
export default Dashboard
