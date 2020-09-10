import React from "react"
import moment from "moment"

function Branch(props) {
  const { branch } = props
  return (
    <>
      <div className="righttopdevelop flex">
        <div className="developleft text-body font-semibold">{branch.name}</div>
        <div className="developright text-body">
          {`Updated ${moment(branch.commit.created_at).fromNow()} by ${
            branch.commit.committer_name
          }`}
        </div>
      </div>
    </>
  )
}

export default Branch
