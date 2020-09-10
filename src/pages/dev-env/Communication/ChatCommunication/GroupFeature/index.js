import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { userInvite } from "redux/action"

import illustrationVideoCallImage from "assets/images/all-new-svg-icons/illustrationVideoCall.svg"

function GroupChatFeature(props) {
  const dispatch = useDispatch()

  const [userTo, setUserTo] = useState("")

  function handleChange(e) {
    setUserTo(e.target.value)
  }

  function handleSuccess() {
    setUserTo("")
  }
  function handleUserInvite(ev) {
    ev.preventDefault()
    const body = {
      to: userTo
    }
    dispatch(userInvite(body, handleSuccess))
  }
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "video-call-wrap" --> */}
      <div
        className="video-call-wrap flex active group-feature"
        style={{ width: "70%" }}
      >
        <h2 className="font-medium">
          Group Chat is a team feature. Invite a teammate.
        </h2>
        <img
          src={illustrationVideoCallImage}
          className="videoimg"
          alt="next-feature"
        />
        <form id="invite" name="invite" onSubmit={handleUserInvite}>
          <div className="invite-box flex">
            <input
              type="email"
              name="to"
              placeholder="email@example.com"
              className="popup-shadow text-14"
              onChange={handleChange}
              value={userTo}
            />
            {userTo ? (
              <button
                className="text-center text-14 font-semibold"
                type="submit"
              >
                Invite
              </button>
            ) : (
              <button className="text-center text-14 font-semibold" disabled>
                Invite
              </button>
            )}
          </div>
        </form>
        <p className="teams-coming text-12">Teams Coming Soon.</p>
      </div>
    </>
  )
}

export default GroupChatFeature
