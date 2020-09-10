import React from "react"
import { useSelector } from "react-redux"

import chatbotCloseImage from "assets/images/all-new-svg-icons/close.svg"
import Topic from "./Topic"
import chatbotImage from "assets/images/all-new-svg-icons/Chatbot.svg"

function TopicList(props) {
  const handleCloseChatBot = () => {
    props.close()
  }
  const topicList = useSelector(({ bot }) => bot.topicList)

  const handleTopicShow = topic => {
    props.onShowTopicClicked(topic)
  }

  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "chatbot-wrapper" --> */}
      <div
        className={
          props.open
            ? "chatbot-wrapper active  popup-shadow "
            : "chatbot-wrapper popup-shadow"
        }
      >
        <div className="chatbot-close">
          <img
            src={chatbotCloseImage}
            alt="chatbot-close"
            onClick={handleCloseChatBot}
          />
        </div>
        <div className="chatbot-profile">
          <div className="profileimg popup-shadow">
            <img src={chatbotImage} alt="chatbot-profile" />
          </div>
          <div className="bottext font-medium">Bot</div>
        </div>
        <div className="chatbot-sections">
          {topicList.length
            ? topicList.map(topic => {
                return (
                  <Topic
                    topic={topic}
                    onTopicShow={handleTopicShow}
                    key={topic._id}
                  />
                )
              })
            : null}
        </div>
      </div>
    </>
  )
}

export default TopicList
