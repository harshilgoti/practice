import React from "react"
import moment from "moment"
// import dots3Image from "assets/images/chatbot/3dots.png"

function Commit(props) {
  const { commit } = props
  return (
    <>
      <div className="rightbottomdevelop flex">
        <div className="rightdevelopleft text-body font-semibold">
          <div className="rightdeveloplefttopcontent text-body font-semibold">
            {/* Merge pull request <span>#142</span> from Pellentesque
            Scelerisque/staging <img src={dots3Image} /> */}

            {commit.message}
          </div>
          <div className="rightdevelopleftbottomcontent text-12">
            {commit.committer_name}{" "}
            <span>{`committed ${moment(commit.created_at).fromNow()}`}</span>
          </div>
        </div>
        <div className="rightdevelopright text-body">{commit.short_id}</div>
      </div>
    </>
  )
}

export default Commit
