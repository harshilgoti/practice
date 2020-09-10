import React from "react"
import ProuductRoadMap from "components/Dashboard/RoadmapProgress"

function Roadmap(props) {
  return (
    <>
      <div className="overview-left popup-shadow01">
        <h2 className="font-medium product-head">Product Roadmap</h2>

        <ProuductRoadMap data={props.data} />
      </div>
    </>
  )
}

export default Roadmap
