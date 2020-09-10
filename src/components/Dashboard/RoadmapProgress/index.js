import React, { Component } from "react"
import { FrappeGantt } from "frappe-gantt-react"
import "styles/roadmap.scss"

// const tasks = [
//   {
//     id: "Task 1",
//     name: "Redesign website",
//     start: "2016-12-28",
//     end: "2017-1-05",
//     progress: 80,
//     dependencies: ""
//   },
//   {
//     id: "Task 2",
//     name: "Redesign website",
//     start: "2016-12-28",
//     end: "2016-12-31",
//     progress: 20,
//     dependencies: "Task 1"
//   }
// ]
class RoadMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: {
        QuarterDay: "Quarter Day",
        HalfDay: "Half Day",
        Day: "Day",
        Week: "Week",
        Month: "Month"
      }
    }
  }
  render() {
    return (
      <>
        <div className="roadmap-progress">
          {/* <RoadmapProgress milestones={milestones} /> */}

          <FrappeGantt
            tasks={
              (!!this.props.data.length && this.props.data) || [
                {
                  id: "123",
                  name: "",
                  start: "",
                  end: "",
                  progress: 0
                }
              ]
            }
            viewMode={this.state.mode.Day}
          />
        </div>{" "}
      </>
    )
  }
}

export default RoadMap
