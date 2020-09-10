import React from "react"

function Skill(props) {
  const { skl } = props

  const pr = (skl.xp * 100) / skl.level_xp

  return (
    <div className="skill">
      <div className="text-12 skill-title">{skl && skl.name}</div>
      <div>
        <div className="text-12 blue-arrow"> level {skl && skl.level}</div>
      </div>
      <div className="main-percentage-box">
        <div className="gray-box">
          <div className="blue-box" style={{ width: `${pr}%` }}>
            <div className="text-10 percentage-text">{pr}%</div>
          </div>
        </div>
      </div>
      <div className="text-12 next-level-wrapper">
        <div> +{skl && skl.level_xp - skl.xp} XP </div>
        <div className="text-12 next-level">for </div>
        <div className="text-12 blue-arrow">level {skl && skl.level + 1}</div>
      </div>
    </div>
  )
}

export default Skill
