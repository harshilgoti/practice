import React from "react"
import { useSelector } from "react-redux"

import Commit from "./Commit"

function CommitList(props) {
  const commits = useSelector(({ product: { gitCommits } }) => gitCommits)

  // console.log(commits, "commits")

  return (
    <>
      <div className="rightbottomdevelopwrap" id="style-3">
        {(commits || []).map(commit => {
          return <Commit key={commit.short_id} commit={commit} />
        })}
      </div>
    </>
  )
}

export default CommitList
