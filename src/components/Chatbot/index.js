import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Event } from "config/googleAnalytics"
import chatbotImage from "assets/images/all-new-svg-icons/Chatbot.svg"
import documentImage from "assets/images/all-new-svg-icons/Document.svg"
// import tutorialImage from "assets/images/all-new-svg-icons/tutorial.svg"
import dropdownImage from "assets/images/all-new-svg-icons/dropdown.svg"
import documentActiveImage from "assets/images/all-new-svg-icons/Document-active.svg"
// import tutorialActiveImage from "assets/images/all-new-svg-icons/tutorial-active.svg"
// import presentationImage from "assets/images/all-new-svg-icons/Presentation.svg"
import dropdowndownImage from "assets/images/chatbot/dropdowndown.png"
import TopicList from "./TopicList"
import FeedbackPopup from "./FeedbackPopup"

import {
  getTopicDetailsById,
  getSectionDetailsById,
  getSectionTabDetailsById,
  getBotTopicList,
  closeChatBotWithTopicIds,
  updateSectionFeedback
} from "redux/action"
import useComponentVisible from "../../components/ComponentVisible"

import UpLike from "assets/images/up-like.svg"
import UpLikeActive from "assets/images/up-like-active.svg"
import DownLike from "assets/images/down-like.svg"
import DownLikeActive from "assets/images/down-like-active.svg"

function Chatbot(props) {
  const dispatch = useDispatch()
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const [isShowChatbot, setIsShowChatbot] = useState(false)
  const [isShowTopicDetails, setIsShowTopicDetails] = useState(false)

  // const [isShowFeedbackPopup, setIsShowFeedbackPopup] = useState(false)
  const handleOpenChatBot = () => {
    setIsShowChatbot(true)
    setIsShowTopicDetails(false)
    Event("CHAT_BOT_SHOW", "Chat bot pouup show successfully.", "DEV_ENV_PAGE")
  }

  const handleCloseChatBot = () => {
    setIsShowChatbot(false)
    setIsShowTopicDetails(false)
    dispatch(closeChatBotWithTopicIds())
  }
  const topicList = useSelector(({ bot }) => bot.topicList)
  const botActiveTopic = useSelector(({ bot }) => bot.botActiveTopic)
  const topicDetailsById = useSelector(({ bot }) => bot.topicDetailsById)
  const sectionTabDetailsById = useSelector(
    ({ bot }) => bot.sectionTabDetailsById
  )
  const { isOpenChatBot, chatBotTopicsIdList } = useSelector(({ bot }) => bot)

  useEffect(() => {
    setIsShowChatbot(isOpenChatBot)
    isOpenChatBot && dispatch(getBotTopicList(chatBotTopicsIdList))
  }, [dispatch, isOpenChatBot, chatBotTopicsIdList])

  useEffect(() => {
    !isOpenChatBot &&
      isShowChatbot &&
      !topicList.length &&
      dispatch(getBotTopicList())
  }, [dispatch, topicList.length, isShowChatbot, isOpenChatBot])

  const handleShowTopicDetails = topic => {
    dispatch(getTopicDetailsById(topic._id, topic))
    setIsShowChatbot(false)
    setIsShowTopicDetails(true)
    Event(
      "CHAT_BOT_TOPIC_DETAILS_SHOW",
      "Chat bot topic details show successfully.",
      "DEV_ENV_PAGE"
    )
  }
  const handleClickSectionTab = sectionTab => {
    dispatch(getSectionTabDetailsById(sectionTab._id))
  }
  const handleShowRelatedSectionDetails = sectionId => {
    // dispatch(getTopicDetailsById(topic._id, topic))
    dispatch(getSectionDetailsById(sectionId))
  }
  const handleUpdateSectionLike = () => {
    const body = {
      isLiked: true
    }
    dispatch(updateSectionFeedback(topicDetailsById.section._id, body))
  }

  // const handleUpdateSectionDislike = () => {
  //   setIsFeedBackPopupVisible(true)
  // }
  const handleCloseFeedbackPopup = () => {
    setIsComponentVisible(false)
  }

  return (
    <>
      {/* <!-- chatbot start here --> */}
      <div className="chatbot-icon popup-shadow" onClick={handleOpenChatBot}>
        <img
          src={dropdownImage}
          className="drop-right-icon"
          alt="dropdownImage"
        />
        <img src={chatbotImage} alt="chatbot-icon" />
      </div>

      <TopicList
        open={isShowChatbot}
        close={handleCloseChatBot}
        onShowTopicClicked={handleShowTopicDetails}
      />

      {/* <!-- NOTE : Add "active" className on click to parent div which is "chatbot-detail-wrapper" --> */}
      {
        <div
          className={
            isShowTopicDetails
              ? "chatbot-detail-wrapper popup-shadow01 active"
              : "chatbot-detail-wrapper popup-shadow01 "
          }
        >
          <div className="chatbot-overlay"></div>
          <div
            className="chatbot-detail-wrap-close flex"
            onClick={handleCloseChatBot}
          >
            <img
              src={dropdownImage}
              className="droplefticons"
              alt="dropdownImage"
            />
            <img src={chatbotImage} alt="chatbotImage" />
          </div>
          <div className="chatbotm-detail-in-sidewrap flex popup-shadow01">
            <div className="chatbot-detail-inside-wrap-left">
              {topicList.length
                ? topicList.map(topic => {
                    return (
                      <div
                        key={topic._id}
                        onClick={() => handleShowTopicDetails(topic)}
                        className={
                          botActiveTopic && botActiveTopic._id === topic._id
                            ? "chatbot-left-single-section text-18 active"
                            : "chatbot-left-single-section text-18"
                        }
                        data-api="apis"
                      >
                        <img
                          src={documentImage}
                          className="blackicon"
                          alt="documentImage"
                        />
                        <img
                          src={documentActiveImage}
                          className="blueicon"
                          alt="documentActiveImage"
                        />
                        {topic.title}
                      </div>
                    )
                  })
                : null}
            </div>
            <div className="chatbot-detail-inside-wrap-right">
              {topicDetailsById &&
              topicDetailsById.section &&
              topicDetailsById.section.prev_section &&
              topicDetailsById.section.prev_section.length
                ? topicDetailsById.section.prev_section.map(prevSection => {
                    return (
                      <div
                        key={prevSection._id}
                        className="whatisapitop flex"
                        onClick={() =>
                          handleShowRelatedSectionDetails(prevSection._id)
                        }
                      >
                        <img src={dropdowndownImage} alt="dropdowndownImage" />
                        <span className="previous-que-title-text text-14">
                          {prevSection.title}
                        </span>
                      </div>
                    )
                  })
                : null}

              <div className="que-title">
                <h2 className="que-title-text font-medium">
                  {topicDetailsById &&
                    topicDetailsById.section &&
                    topicDetailsById.section.title}
                </h2>
                <div className="feedback" ref={ref}>
                  <img
                    src={
                      topicDetailsById &&
                      topicDetailsById.section &&
                      topicDetailsById.section.isLiked
                        ? UpLikeActive
                        : UpLike
                    }
                    alt="UpLike"
                    className={
                      topicDetailsById &&
                      topicDetailsById.section &&
                      topicDetailsById.section.isLiked
                        ? "disable"
                        : ""
                    }
                    onClick={handleUpdateSectionLike}
                  />

                  <img
                    src={
                      topicDetailsById &&
                      topicDetailsById.section &&
                      topicDetailsById.section.isDisliked
                        ? DownLikeActive
                        : DownLike
                    }
                    alt="DownLike"
                    className={
                      topicDetailsById &&
                      topicDetailsById.section &&
                      topicDetailsById.section.isDisliked
                        ? "disable"
                        : ""
                    }
                    onClick={() => setIsComponentVisible(true)}
                  />
                  {isComponentVisible && (
                    <FeedbackPopup
                      isShowFeedbackPopup={isComponentVisible}
                      closed={handleCloseFeedbackPopup}
                      // componentVisible={(val) => setIsComponentVisible(val)}
                    />
                  )}
                </div>
              </div>

              <div className="tabs">
                {topicDetailsById &&
                topicDetailsById.section &&
                topicDetailsById.section.curr_section_tabs &&
                topicDetailsById.section.curr_section_tabs.length > 0
                  ? topicDetailsById.section.curr_section_tabs.map(
                      sectionTab => {
                        return (
                          <div
                            key={sectionTab._id}
                            data-tab="overview"
                            className={
                              sectionTabDetailsById &&
                              sectionTabDetailsById._id === sectionTab._id
                                ? "tab active text-18"
                                : "tab text-18"
                            }
                            onClick={() => handleClickSectionTab(sectionTab)}
                          >
                            {sectionTab.title}
                          </div>
                        )
                      }
                    )
                  : null}
              </div>

              {sectionTabDetailsById &&
                sectionTabDetailsById.description_body_html && (
                  <div className="tab-panel">
                    {/* <div className="fade-wrap"> */}
                    <p
                      className="para html-render-main"
                      dangerouslySetInnerHTML={{
                        __html:
                          sectionTabDetailsById &&
                          sectionTabDetailsById.description_body_html
                      }}
                    />
                    {/* <p className="para text-body">
                        {sectionTabDetailsById.description_body_html}
                      </p> */}
                    {/* </div> */}
                  </div>
                )}

              {topicDetailsById &&
              topicDetailsById.section &&
              topicDetailsById.section.next_section &&
              topicDetailsById.section.next_section.length
                ? topicDetailsById.section.next_section.map(nextSection => {
                    return (
                      <div
                        key={nextSection._id}
                        className="next-que-title-text flex"
                        onClick={() =>
                          handleShowRelatedSectionDetails(nextSection._id)
                        }
                      >
                        <span className="previous-que-title-text text-14 font-semibold">
                          {nextSection.title}
                        </span>
                        <img src={dropdownImage} alt="dropdownImage" />
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        </div>
      }

      {/* <!-- chatbot end here --> */}
    </>
  )
}

export default Chatbot
