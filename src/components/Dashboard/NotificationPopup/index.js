import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getNotificationsList, markReadAllNotifications } from "redux/action"

import moment from "moment"
function NotificationPopup(props) {
  const dispatch = useDispatch()

  const { notificationList, isShowViewMoreButton } = useSelector(
    ({ notification }) => notification
  )
  const [pageCount, setPageCount] = useState(1)
  useEffect(() => {
    dispatch(getNotificationsList(pageCount, 5))
  }, [dispatch])

  const handleClickMarkReadAllNotitfications = () => {
    dispatch(markReadAllNotifications())
  }

  const handleViewMoreNotificationList = () => {
    dispatch(getNotificationsList(pageCount + 1, 5))
    setPageCount(pageCount + 1)
  }
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "clonepopup" --> */}
      <div
        className={
          props.isShowFeedbackPopup
            ? "notification-popup popup-shadow01 active"
            : "notification-popup popup-shadow01"
        }
      >
        {/* <span className="close-icon" onClick={() => handleCloseFeedBackPopup()}>
          <img src={closeImage} alt="" />
        </span> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px"
          }}
        >
          {" "}
          <div className="text-14" style={{ opacity: 0.6, fontWeight: "600" }}>
            NOTIFICATIONS{" "}
          </div>
          <div
            onClick={() => handleClickMarkReadAllNotitfications()}
            className="text-14"
            style={{ color: "#008afc", cursor: "pointer" }}
          >
            Mark all as read
          </div>
        </div>

        <div style={{ maxHeight: "300px", overflowY: "auto" }} id="style-popup">
          {notificationList.length ? (
            notificationList.map((notification, i) => {
              return (
                <div key={i} style={{ margin: "0 0 4px" }}>
                  {" "}
                  {/* <div className="pro-pic">
                    <img
                      alt="profile"
                      src={
                        // "https://zero-to-career-assets.s3.us-east-2.amazonaws.com/user_icon.png"
                        "https://user-code-zerotocareer-dev.s3.us-east-2.amazonaws.com/user/png/user-icon.png"
                      }
                      // || (userDetails && userDetails.profile_image_url)
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div> */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      padding: "8px",
                      backgroundColor: !notification.isRead
                        ? "#fc002f08"
                        : "#fff"
                    }}
                  >
                    <div className="text-14">
                      <span style={{ fontWeight: "600" }}>
                        {notification.title}{" "}
                      </span>
                      <span style={{ opacity: 0.6 }}>
                        {" "}
                        {notification.message}
                      </span>{" "}
                    </div>
                    <div className="text-14" style={{ opacity: 0.6 }}>
                      {moment(notification.created_at).fromNow()}
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "150px"
              }}
            >
              {/* <img
                src={notificationEmptyImg}
                alt="notificationEmptyImg"
                style={{ width: "100px", height: "100px" }}
              /> */}
              <div
                className="text-14"
                style={{ opacity: 0.6, fontWeight: "600" }}
              >
                No unread notifications{" "}
              </div>
            </div>
          )}
          {isShowViewMoreButton && (
            <div
              className="text-16"
              style={{
                color: "#008afc",
                fontWeight: "600",
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
                marginTop: "16px"
              }}
              onClick={() => handleViewMoreNotificationList()}
            >
              View All
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default NotificationPopup
