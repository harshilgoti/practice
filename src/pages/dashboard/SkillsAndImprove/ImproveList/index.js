import React from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { useSelector } from "react-redux"
import emptyIcon from "assets/images/empty.jpg"
import Improve from "./Improve"

function ImproveListList(props) {
  const { dashboardUserReport } = useSelector(({ dashboard }) => dashboard)

  return (
    <div className="details-box">
      <div className="heading">
        <div className="text-22">Where you can improve</div>
        {/* <div className="hover-text">View all</div> */}
      </div>

      <div className="content improve-skill-content">
        <Scrollbars autoHeight autoHeightMin={50} autoHeightMax={196}>
          {dashboardUserReport &&
          dashboardUserReport.improve &&
          !!dashboardUserReport.improve.length ? (
            dashboardUserReport.improve.map((item, i) => {
              return <Improve item={item} key={i} />
            })
          ) : (
            <div className="empty-message-outer">
              <div className="empty-message-inner">
                <img src={emptyIcon} alt="emptyIcon" />
                <p className="text-16 text-center font-opcaity-05">
                  Coming soon
                </p>
                {/* <div
                  className="hover-text text-16 "
                  onClick={() => handleRedirecToCompniesRoleList()}
                >
                  Begin now
                </div> */}
              </div>
            </div>
          )}

          {/* <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="yellow-box" style={{ width: "55%" }}>
                  <div className="text-10 percentage-text">55%</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="yellow-box" style={{ width: "55%" }}>
                  <div className="text-10 percentage-text">55%</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="blue-box" style={{ width: "55%" }}>
                  <div className="text-10 percentage-text">55%</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="blue-box" style={{ width: "80%" }}>
                  <div className="text-10 percentage-text">80%</div>
                </div>
              </div>
            </div>
          </div> */}

          {/* <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="green-box" style={{ width: "55%" }}>
                  <div className="text-10 percentage-text">55%</div>
                </div>
              </div>
            </div>
          </div> */}
          {/* 
          <div className="skill">
            <div className="text-12 skill-title">Python Java</div>
            <div className="improve-skill-percentage-box">
              <div className="gray-box">
                <div className="orange-box" style={{ width: "55%" }}>
                  <div className="text-10 percentage-text">55%</div>
                </div>
              </div>
            </div>
          </div> */}
        </Scrollbars>
      </div>
    </div>
  )
}

export default ImproveListList
