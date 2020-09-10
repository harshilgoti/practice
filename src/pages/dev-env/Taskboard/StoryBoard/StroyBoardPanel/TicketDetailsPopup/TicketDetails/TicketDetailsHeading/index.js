import React from "react"
import { useSelector, useDispatch } from "react-redux"
import stroyImage from "assets/images/chatbot/backlogicon01.png"
// import ticketPopupImage4 from "assets/images/all-new-svg-icons/Ticket.svg"
import taskBoardActiveImage from "assets/images/chatbot/backlogicon02.png"

import dropdownImage from "assets/images/down-arrow.svg"
import chatbotImage from "assets/images/all-new-svg-icons/Chatbot.svg"
import { openChatBotWithTopicIds } from "redux/action"

function TicketDetailsHeading(props) {
  const dispatch = useDispatch()

  const ticketDetailsById = useSelector(
    ({ product }) => product.ticketDetailsById
  )

  // const { isOpenChatBot, chatBotTopicsIdList } = useSelector(({ bot }) => bot)
  // console.log("ticketDetailsById", ticketDetailsById, isOpenChatBot, chatBotTopicsIdList)

  const currentSprint = useSelector(({ product }) => product.currentSprint)

  const currentStory = useSelector(({ product }) => product.currentStory)

  function handleOpenChatBot() {
    dispatch(openChatBotWithTopicIds(ticketDetailsById.associated_topics))
  }
  const totalXp =
    ticketDetailsById &&
    ticketDetailsById.skills_xp.reduce((acc, cur) => {
      const values = cur.level_xp
      return acc + values
    }, 0)

  return (
    <>
      <div className="w-full ticket-details--x-padding ticket-path-bot-icon">
        <div className="text-18 ticket-path">
          <span>{`${currentSprint.title} →`} </span>
          {/* <img src={ticketPopupImage4} alt="" /> */}
          <div className="flex align-center">
            <img src={stroyImage} alt="" className="story-icon" />
            <span>{`Story ${currentStory.index + 1} →`}</span>
          </div>

          {/* <img src={ticketPopupImage4} alt="" /> */}
          <div className="flex align-center">
            <img src={taskBoardActiveImage} alt="" className="taskBoard-icon" />
            <span>{`Ticket ${ticketDetailsById.index}`}</span>
          </div>
        </div>

        <abbr className="bot-icon" onClick={handleOpenChatBot}>
          <img src={chatbotImage} alt="" />
        </abbr>
      </div>
      <div className="w-full ticket-details--x-padding ticket-title-status-wrap">
        <h2 className="text-28 ticket-title font-medium ">
          {ticketDetailsById.title}
        </h2>
        <div
          onClick={() =>
            props.handleOpenXpPopup(
              ticketDetailsById && ticketDetailsById.skills_xp
            )
          }
          className={`text-18 ticket-status status-${ticketDetailsById.title}`}
        >
          <span>{`+${totalXp} XP`}</span>
          <img alt="" src={dropdownImage} />
        </div>
      </div>
      {/* rest api commented */}
      {/* <div className="w-full ticket-details--x-padding">
        <div className="text-14 font-semibold ticket-type">
          <span className="title">Rest - API / Communication</span>
        </div>
      </div> */}
    </>
  )
}

export default TicketDetailsHeading
