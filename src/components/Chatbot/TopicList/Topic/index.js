import React from "react"
import documentImage from "assets/images/all-new-svg-icons/Document.svg"

function Topic(props) {
  const { topic } = props
  return (
    <>
      {" "}
      <div
        key={topic._id}
        className="chatbotsection-wrap popup-shadow font-semibold text-16"
        onClick={() => props.onTopicShow(topic)}
      >
        <img src={documentImage} alt="documentImage" />
        {topic.title}
      </div>
    </>
  )
}

export default Topic
