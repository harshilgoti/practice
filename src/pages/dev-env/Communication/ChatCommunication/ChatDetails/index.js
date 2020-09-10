import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
import personImage from "assets/images/chatbot/person.png"
import sendImage from "assets/images/all-new-svg-icons/send.svg"
import { sendChatMessage } from "redux/action"
import { Event } from "config/googleAnalytics"

function ChatDetails(props) {
  const dispatch = useDispatch()

  const [sendMessage, setSendMessage] = useState("")
  const chatList = useSelector(({ product }) => product.chatList)
  const userDetails = useSelector(({ user }) => user.userDetails)

  const activeChatUser = useSelector(({ product }) => product.activeChatUser)

  let chatWithDefaultMessage

  if (
    activeChatUser &&
    activeChatUser.to &&
    activeChatUser.to.name === "Scrum Master"
  ) {
    chatWithDefaultMessage = {
      chat_id: activeChatUser._id,
      from: activeChatUser.to._id,
      message:
        "Hi, I'm the Scrum Master. I'm the member of the Scrum team responsible for streamlining your Agile development process. It is my job to ensure that you can smoothly do yours without being interrupted by things not related to it. Since this is a solo workspace, I won't be responsive, but you can report any issues related to your workspace here."
    }
  }

  if (
    activeChatUser &&
    activeChatUser.to &&
    activeChatUser.to.name === "Project Manager"
  ) {
    chatWithDefaultMessage = {
      chat_id: activeChatUser._id,
      from: activeChatUser.to._id,
      message:
        "Hi, I'm the Product Owner. I'm the member of the Scrum team responsible for making and prioritizing the Product Roadmap and Backlog and defining user stories- basically your Overview tab. Since this is a solo workspace, I won't be responsive, but you can log in your updates here."
    }
  }

  const handleChangeSendMessage = e => {
    setSendMessage(e.target.value)
  }
  const handleSuccess = () => {
    Event(
      "SEND_MESSAGE",
      "Send message successfully",
      "COMMUNICATION_CHAT_PAGE"
    )
    setSendMessage("")
  }
  const handleSendMessage = e => {
    const body = {
      to: activeChatUser.to._id,
      message: sendMessage
    }

    dispatch(sendChatMessage(activeChatUser._id, body, handleSuccess))
  }

  const handleEnterKeyPress = target => {
    if (sendMessage && target.charCode == 13) {
      const body = {
        to: activeChatUser.to._id,
        message: sendMessage
      }

      dispatch(sendChatMessage(activeChatUser._id, body, handleSuccess))
    }
  }

  const updateChatList = chatWithDefaultMessage
    ? [...chatList, chatWithDefaultMessage]
    : chatList
  return (
    <>
      <div className="chat-wrapper-right">
        <div className="chat-right-top">
          <div className="person-details">
            <img src={personImage} className="person-icon" />
            <div className="personal-details text-20">
              {activeChatUser && activeChatUser.to && activeChatUser.to.name}
              {/* <span className="text-12">Suspendisse suscipit</span> */}
            </div>
          </div>
          <div className="text-qustion-wrap-content" id="style-4">
            {updateChatList.map(chat => {
              return (
                <div key={chat.id}>
                  <div className="text-qustion-wrap">
                    <div
                      style={{ transform: "scale(1,-1" }}
                      className={
                        userDetails && userDetails._id === chat.from
                          ? "text-answer text-left width-75"
                          : "text-qustion text-left width-75"
                      }
                    >
                      <div
                        className={
                          userDetails && userDetails._id === chat.from
                            ? "text-answer-box text-13"
                            : "text-qustion-box text-13"
                        }
                      >
                        {chat.message}
                      </div>
                      <span className="text-caption">
                        {/* Pelntesque, */}
                        {moment(chat.created_at).format("LT")}
                      </span>
                    </div>
                  </div>
                  <div className="clearboth"></div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="chat-btn-wrap">
          <input
            type="text"
            onChange={e => handleChangeSendMessage(e)}
            placeholder="Send a message..."
            className="text-14"
            value={sendMessage}
            onKeyPress={handleEnterKeyPress}
          />

          <img src={sendImage} onClick={() => handleSendMessage()} />
        </div>
      </div>
    </>
  )
}

export default ChatDetails
