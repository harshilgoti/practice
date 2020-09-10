import React from "react"
import { Line } from "react-chartjs-2"

const legend = {
  display: false,
  position: "bottom"
  // labels: {
  //   fontColor: "#008afc",
  //   fontSize: 14
  // }
}
const options = {
  // title: {
  //   display: true,
  //   fontSize: 18,
  //   fontFamily: "Assistant,sans-serif",
  //   text: " Complete your first task to start tracking your progress."
  // },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100,
          beginAtZero: true
        }
      }
    ]
  },
  maintainAspectRatio: false,
  layout: {
    padding: {
      top: 32,
      left: 16,
      right: 16,
      bottom: 16
    }
  }
}

class XpTimeline extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  // componentWillMount() {
  //   this.setState(initialState)
  // }
  // componentDidMount() {
  //   var _this = this

  //   setInterval(function() {
  //     var oldDataSet = _this.state.datasets[0]
  //     var newData = []

  //     for (var x = 0; x < _this.state.labels.length; x++) {
  //       newData.push(Math.floor(Math.random() * 100))
  //     }

  //     var newDataSet = {
  //       ...oldDataSet
  //     }

  //     newDataSet.data = newData

  //     var newState = {
  //       ...initialState,
  //       datasets: [newDataSet]
  //     }

  //     _this.setState(newState)
  //   }, 5000)
  // }

  // handleRedirecToCompniesRoleList = () => {
  //   this.props.history.push(`/companies-and-role-list`)
  // }
  render() {
    const { workspaceCount, data } = this.props
    const filterDataSetList = data.datasets[0].data.filter(
      dataValue => dataValue
    )
    return (
      <div className="right-box-wrapper">
        {workspaceCount > 0 ? (
          <>
            <div className="graph-container ">
              {filterDataSetList.length <= 0 ? (
                <div className="no-data-available-outer">
                  <div className="no-data-available-inner">
                    <p className="text-16 text-center font-opcaity-05 ">
                      Complete your first task to start tracking your progress
                    </p>
                  </div>
                </div>
              ) : null}
              <div className="active-date-bullet">
                <span className="dot"></span>
              </div>
              <div className="graph-box " style={{ borderRadius: "4px" }}>
                <Line data={data} options={options} legend={legend} />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="no-data-graph-container joyride-1">
              <div className="no-data-available-outer">
                <div className="no-data-available-inner">
                  <p className="text-16 text-center font-opcaity-05 ">
                    Complete your first task to start tracking your progress
                  </p>
                  {/* <div
                    className="hover-text text-16 "
                    onClick={() => this.handleRedirecToCompniesRoleList()}
                  >
                    Begin now
                  </div> */}
                </div>
              </div>
              <div className="active-date-bullet">
                <span className="dot"></span>
              </div>
              <div
                className="no-data-graph-box joyride-1"
                style={{ borderRadius: "4px" }}
              >
                <Line data={data} options={options} legend={legend} />
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default XpTimeline

//graph code as per labels
// {this.props.data && this.props.data.labels.length ? (
//   <Line data={this.props.data} options={options} legend={legend} />
// ) : (
//   <div className="no-data-available-outer">
//     <div className="no-data-available-inner">
//       <p className="text-16 text-center font-opcaity-05 ">
//         Complete your first task to start tracking your progress
//       </p>
//       <div
//         className="hover-text text-16 "
//         onClick={() => this.handleRedirecToCompniesRoleList()}
//       >
//         Begin now
//       </div>
//     </div>
//   </div>
// )}
