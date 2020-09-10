import React from "react"
import completedImage from "assets/images/all-new-svg-icons/completed.svg"

function Story(props) {
  const { story, isStoryActive } = props
  const handleFetchTicketList = story => {
    props.fetchTicketList(story)
  }

  return (
    <>
      <div
        className={
          isStoryActive ? "w-full progress-col active" : "w-full progress-col"
        }
        key={story.story_id}
        onClick={() => handleFetchTicketList(story)}
      >
        <p className="text-body">{story.description}</p>
        <div className="progress-limit">
          {story.completed_perc == 100 ? (
            <div className="progress-limit">
              <div className="progress-show">
                <div className="inner-wrap green-color">
                  <span
                    className="progress-rate"
                    style={{ width: "100%" }}
                  ></span>
                </div>
              </div>
              <div className="progress-percent">
                <p className="text-body">
                  <img src={completedImage} alt="" />
                </p>
              </div>
            </div>
          ) : (
            <div className="progress-limit">
              <div className="progress-show">
                <div className="inner-wrap orange-color">
                  <span
                    className="progress-rate"
                    style={{ width: `${story.completed_perc.toFixed()}%` }}
                  ></span>
                </div>
              </div>
              <div className="progress-percent">
                <p className="text-body">{`${story.completed_perc.toFixed()}%`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Story
