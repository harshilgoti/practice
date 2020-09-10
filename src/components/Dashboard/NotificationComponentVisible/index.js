import React from "react"
// import closeImage from "assets/images/all-new-svg-icons/close.svg"
import useComponentVisible from "../../ComponentVisible"
import notificationImg from "assets/images/all-new-svg-icons/notification.svg"
import NotificationPopup from "../NotificationPopup"
import { useSelector } from "react-redux"

function NotificationIcon(props) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const { unReadNotificationsCount } = useSelector(
    ({ notification }) => notification
  )

  return (
    <>
      <li ref={ref}>
        <div
          className="notification-icon"
          onClick={() => setIsComponentVisible(true)}
        >
          <img src={notificationImg} alt="notification" />
          {unReadNotificationsCount > 0 ? (
            <abbr className="count">{unReadNotificationsCount}</abbr>
          ) : null}
        </div>
        {isComponentVisible && (
          <NotificationPopup
            isShowFeedbackPopup={isComponentVisible}
            closed={() => setIsComponentVisible(false)}
          />
        )}
      </li>
    </>
  )
}
export default NotificationIcon
