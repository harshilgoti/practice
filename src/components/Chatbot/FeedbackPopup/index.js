import React, { useState, useEffect } from "react"
// import closeImage from "assets/images/all-new-svg-icons/close.svg"
import { useDispatch, useSelector } from "react-redux"
import { updateSectionFeedback } from "redux/action"
function FeedbackPopup(props) {
  const dispatch = useDispatch()
  const topicDetailsById = useSelector(({ bot }) => bot.topicDetailsById)

  const [feedBack, setFeedBack] = useState("")
  const [dislikedTabList, setDislikedTabList] = useState([])

  useEffect(() => {
    topicDetailsById &&
      topicDetailsById.section &&
      setFeedBack(topicDetailsById.section.feedBack)

    topicDetailsById &&
      topicDetailsById.section &&
      topicDetailsById.section.feedBackTabs &&
      topicDetailsById.section.feedBackTabs.length > 0 &&
      setDislikedTabList(topicDetailsById.section.feedBackTabs)
  }, [topicDetailsById])
  const handleSubmitFeedback = e => {
    e.preventDefault()

    if (dislikedTabList.length > 0 && feedBack) {
      const body = {
        isLiked: false,
        feedBack: feedBack,
        feedBackTabs: dislikedTabList
      }
      dispatch(
        updateSectionFeedback(
          topicDetailsById.section._id,
          body,
          handleCloseFeedBackPopup
        )
      )
    }
  }
  const handleChangeFeedback = e => {
    setFeedBack(e.target.value)
  }
  const handleChangeTab = id => {
    if (dislikedTabList.includes(id)) {
      const filteredDislikeTabList = dislikedTabList.filter(item => item !== id)
      setDislikedTabList(filteredDislikeTabList)
    } else {
      setDislikedTabList([...dislikedTabList, id])
    }
  }

  function canBeSubmit() {
    return dislikedTabList.length && feedBack
  }

  function handleCloseFeedBackPopup() {
    setFeedBack("")
    setDislikedTabList([])
    props.closed()
  }
  useEffect(() => {
    return () => {
      handleCloseFeedBackPopup()
    }
  }, [props.isShowFeedbackPopup])

  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "clonepopup" --> */}
      <div
        className={
          props.isShowFeedbackPopup
            ? "clonepopup popup-shadow01 active"
            : "clonepopup popup-shadow01"
        }
      >
        {/* <span className="close-icon" onClick={() => handleCloseFeedBackPopup()}>
          <img src={closeImage} alt="" />
        </span> */}

        <div className="forms">
          <form>
            <ul>
              {topicDetailsById &&
                topicDetailsById.section &&
                topicDetailsById.section.curr_section_tabs &&
                !!topicDetailsById.section.curr_section_tabs.length &&
                topicDetailsById.section.curr_section_tabs.map((fb, i) => {
                  return (
                    <li
                      className="checks small-box"
                      style={{ padding: "24px 0px 0px" }}
                      key={i}
                    >
                      <div className="form-group checkbox signup">
                        <input
                          type="checkbox"
                          value={fb._id}
                          name={`feedBackTabs_${fb._id}`}
                          id={`feedBackTabs_${fb._id}`}
                          checked={dislikedTabList.includes(fb._id)}
                          onChange={() => handleChangeTab(fb._id)}
                        />
                        <label htmlFor={`feedBackTabs_${fb._id}`}>
                          {fb.title}
                        </label>
                      </div>
                    </li>
                  )
                })}

              <li style={{ padding: "24px 0px 0px" }}>
                <div className="form-group">
                  <textarea
                    name="feedBack"
                    value={feedBack}
                    className={feedBack ? " feedBack active" : "feedBack"}
                    id="feedBack"
                    cols="30"
                    rows="3"
                    onChange={handleChangeFeedback}
                  />
                  <label htmlFor="feedBack">Your Feedback</label>
                </div>
              </li>
              {/* <h6
                className="nav-link "
                style={{ marginTop: "8px" }}
                onClick={handleSubmitFeedback}
              >
                <button className="btn" type="submit" disabled={!canBeSubmit()}>
                  Submit
                </button>

               
              </h6> */}
              <li style={{ padding: "24px 0px 0px" }}>
                <a
                  onClick={handleSubmitFeedback}
                  className={
                    canBeSubmit()
                      ? "feedback-btn text-center text-14"
                      : "feedback-btn-disabled text-center text-14"
                  }
                >
                  Submit
                </a>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </>
  )
}
export default FeedbackPopup
