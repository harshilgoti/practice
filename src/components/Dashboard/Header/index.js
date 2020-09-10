import React, { useEffect, useState } from "react"
import { Link, withRouter } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router"
import logoImg from "assets/images/logo.png"
import useComponentVisible from "../../ComponentVisible"
import ChangePasswordPopup from "../ChangePasswordPopup"
import NotificationComponentVisible from "../NotificationComponentVisible"
import {
  logout,
  getUserDetails,
  userUpdateStaticXpOnBoardedSuccess
} from "redux/action"
import { useHistory } from "react-router-dom"

import "styles/main.scss"

function Header(props) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  let history = useHistory()
  let userToken = localStorage.getItem("user-token")
  const dispatch = useDispatch()
  const userDetails = useSelector(({ user }) => user.userDetails)
  const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState(
    false
  )
  // const [isShowNotificationPopup, setIsShowNotificationPopup] = useState(false)
  let location = useLocation()
  const currentPath = location.pathname.split("/")[1]

  useEffect(() => {
    userToken && dispatch(getUserDetails())
  }, [dispatch, userToken])

  const handleUserLogout = () => {
    userToken && dispatch(logout(handleLogoutSuccess))
  }

  const handleLogoutSuccess = () => {
    // changed to window for removing intercom after logout
    window.location.replace(`/login`)

    localStorage.removeItem("on_boarded_welcome_slider")
    localStorage.removeItem("user-token")
    localStorage.removeItem("is_epic_onboarded")
  }

  const handleCloseChangePasswordPopup = () => {
    setIsShowChangePasswordPopup(false)
  }
  const handleRedirectedToDashboard = () => {
    if (location.pathname.includes("task-board")) {
      dispatch(userUpdateStaticXpOnBoardedSuccess())
    }

    history.push(`/dashboard`)
  }
  return (
    <div className="dashboard-header-main">
      <header className="dashboard-header shadow" ref={ref}>
        <div
          className={
            currentPath.startsWith("dev-env") ? "container fluid" : "container"
          }
        >
          <Link
            onClick={() => handleRedirectedToDashboard()}
            className={currentPath === "dashboard" ? "active" : ""}
          >
            <div className="logo">
              <img alt="logo" src={logoImg} />
            </div>
          </Link>

          <div className="headerRight">
            <ul>
              <li className="links">
                {/* <a href="#TODO" className="">
                  Dashboard
                </a> */}
                <Link
                  to="/dashboard"
                  className={currentPath === "dashboard" ? "active" : ""}
                >
                  Dashboard
                </Link>{" "}
              </li>
              {/* <li className="search">
                <img src={researchImg} alt="" />
              </li>*/}

              <NotificationComponentVisible />
              <li
                className="menus user_menu_joyride_start"
                onClick={() => setIsComponentVisible(true)}
              >
                <div className="pro-pic">
                  <img
                    alt="profile"
                    src={
                      (userDetails && userDetails.avatar_image_url) ||
                      // "https://zero-to-career-assets.s3.us-east-2.amazonaws.com/user_icon.png"
                      "https://user-code-zerotocareer-dev.s3.us-east-2.amazonaws.com/user/png/user-icon.png"
                    }
                    // || (userDetails && userDetails.profile_image_url)
                  />
                </div>
                <div className="pro-menu">
                  Hi {userDetails && userDetails.first_name}
                </div>
                {isComponentVisible && (
                  <div className="sub-menu">
                    <ul>
                      <li>
                        <Link to="/update-profile">My Profile</Link>
                      </li>
                      <li>
                        <Link to="/user-account">Account</Link>
                      </li>
                      {/* <li>
                        <a onClick={handleShowChangePasswordPopup}>
                          Change Password
                        </a>
                      </li> */}
                      {/* <li>
                        <Link to="/dashboard?isShow=true">
                          Update your Interests
                        </Link>
                      </li> */}
                      <li>
                        <a onClick={handleUserLogout}>Logout</a>
                      </li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </header>
      {props.children}

      {isShowChangePasswordPopup && (
        <ChangePasswordPopup
          isShowChangePasswordPopup={isShowChangePasswordPopup}
          closed={handleCloseChangePasswordPopup}
          isOldUser={false}
        />
      )}
    </div>
  )
}

const DashboardHeader = withRouter(React.memo(Header))
export default withRouter(DashboardHeader)
