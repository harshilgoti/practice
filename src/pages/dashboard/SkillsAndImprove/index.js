import React from "react"
import SkillList from "./SkillList"
import ImproveList from "./ImproveList"

function SkillsAndImprove(props) {
  return (
    <section>
      <div className="container">
        <div className="dashboard-skill-and-improve-details">
          <SkillList />
          <ImproveList />
        </div>
      </div>
    </section>
  )
}

export default SkillsAndImprove
