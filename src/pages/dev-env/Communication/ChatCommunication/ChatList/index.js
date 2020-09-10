import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Event } from "config/googleAnalytics"
import dmImage from "assets/images/all-new-svg-icons/DM.svg"
import dmActiveImage from "assets/images/all-new-svg-icons/DM-active.svg"
import gmImage from "assets/images/all-new-svg-icons/GM.svg"
import gmActiveImage from "assets/images/all-new-svg-icons/GM-active.svg"
import personImage from "assets/images/chatbot/person.png"
import { getChatList } from "redux/action"

function ChatList(props) {
  const { isShowDirectChat } = props
  const dispatch = useDispatch()

  const [activeUserId, setActiveUserId] = useState("")
  const [activeUser, setActiveUser] = useState({})
  const chatUserList = useSelector(({ product }) => product.chatUserList)

  useEffect(() => {
    !!chatUserList.length && setActiveUser(chatUserList[0])
    !!chatUserList.length && setActiveUserId(chatUserList[0].to._id)
  }, [chatUserList.length])

  useEffect(() => {
    activeUserId && dispatch(getChatList(activeUser))
  }, [activeUserId])

  const handleChangeActiveChatUser = user => {
    setActiveUser(user)
    setActiveUserId(user.to._id)
    Event(
      "CHAT_USER_CHANGED",
      "Chat active user changed successfully.",
      "COMMUNICATION_CHAT_PAGE"
    )
  }
  const handleShowDirectChat = () => {
    props.showDirectChatClicked()
  }
  const handleShowGroupChat = () => {
    props.showGroupChatClicked()
  }
  return (
    <>
      <div className="chat-wrapper-left">
        <div className="chat-wrapper-tab flex">
          <div
            className={
              isShowDirectChat
                ? "chat-tab-single text-14 flex active"
                : "chat-tab-single text-14 flex "
            }
            onClick={handleShowDirectChat}
          >
            <img src={dmImage} className="default-icon" />
            <img src={dmActiveImage} className="active-icon" />
            Direct messages
          </div>
          <div
            className={
              !isShowDirectChat
                ? "chat-tab-single text-14 flex active"
                : "chat-tab-single text-14 flex "
            }
            onClick={handleShowGroupChat}
          >
            <img src={gmImage} className="default-icon" />
            <img src={gmActiveImage} className="active-icon" />
            Group Messages
          </div>
        </div>
        {isShowDirectChat && (
          <div className="chat-multiple-sec" id="style-3">
            {chatUserList.map(user => {
              return (
                <div
                  className={
                    activeUserId === user.to._id
                      ? "chat-multiple-signle-sec active flex"
                      : "chat-multiple-signle-sec  flex"
                  }
                  key={user._id}
                  onClick={() => handleChangeActiveChatUser(user)}
                >
                  <div className="person-details">
                    <img src={personImage} className="person-icon" />
                    <div className="personal-details text-18">
                      {user.to.name}
                      {/* <span className="text-12">Suspendisse suscipit</span> */}
                    </div>
                  </div>
                  <div className="person-time text-caption">
                    {/* <span>2</span> */}
                    04:31 PM
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

export default ChatList
