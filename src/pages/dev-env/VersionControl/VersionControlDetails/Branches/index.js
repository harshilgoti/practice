import React from "react"
import BranchList from "./BranchList"
function Branches(props) {
  return (
    <>
      <div className="versioncontrolrighttop popup-shadow01">
        <div className="versioncontrolrighthead font-semibold text-20">
          Branches
        </div>
        <BranchList />
      </div>
    </>
  )
}

export default Branches
