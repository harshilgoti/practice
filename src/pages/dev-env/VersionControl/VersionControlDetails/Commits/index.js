import React from "react"

import CommitList from "./CommitList"
function VersionControl(props) {
  return (
    <>
      <div className="versioncontrolrightbottom popup-shadow01">
        <div className="versioncontrolrighthead font-semibold text-20">
          Commits
        </div>
        <CommitList />
      </div>
    </>
  )
}

export default VersionControl
