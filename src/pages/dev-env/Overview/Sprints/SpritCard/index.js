import React, { useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { Event } from "config/googleAnalytics"
import completedImage from "assets/images/all-new-svg-icons/completed.svg"
import failedImage from "assets/images/all-new-svg-icons/completed-fail.svg"

import {
  getSprintListByProductId
  // handleStoryListBySprintId
} from "redux/action"

function SpritCard(props) {
  let history = useHistory()
  let { upr_id } = useParams()

  const dispatch = useDispatch()

  const { productDetailsById } = props

  const sprintListByProductId = useSelector(
    ({ product }) => product.sprintListByProductId
  )
  const fetchingSprintListByProductIdLoading = useSelector(
    ({ product }) => product.fetchingSprintListByProductIdLoading
  )

  useEffect(() => {
    if (productDetailsById) {
      productDetailsById._id &&
        dispatch(getSprintListByProductId(productDetailsById._id))
    }
  }, [
    dispatch,
    productDetailsById,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    productDetailsById && productDetailsById._id
  ])

  // const handleRedirectToSprintDetails = sprint => {
  //   dispatch(getStoryListBySprintId(sprint._id))
  //   props.handleRedirectToSprintDetails()
  // }

  const handleRedirectToTaskboard = sprint => {
    history.push(`/dev-env/${upr_id}/task-board/${sprint._id}`)
    Event(
      "SPRINT_CLICKED",
      "Redirected to taskboard successfully.",
      "OVERVIEW_PAGE"
    )
    // dispatch(handleStoryListBySprintId())
  }
  return (
    <>
      {sprintListByProductId.length && !fetchingSprintListByProductIdLoading
        ? sprintListByProductId.map(sprint => {
            return (
              <div style={{ padding: "10px 30px" }} key={sprint._id}>
                <div
                  className="product-backlog-box popup-shadow01 flex actvie"
                  // onClick={() => handleRedirectToSprintDetails(sprint)}
                  onClick={() => handleRedirectToTaskboard(sprint)}
                >
                  <div className="sprint-text">
                    <p className="para text-21 font-semibold">{sprint.title}</p>
                  </div>
                  <div className="progress-limit">
                    {sprint.is_completed ? (
                      sprint.completed_perc === 100 ? (
                        <div className="progress-limit-end">
                          {/* <div className="progress-show">
                            <div className="inner-wrap green-color">
                              <span
                                className="progress-rate"
                                style={{ width: `${sprint.completed_perc}%` }}
                              ></span>
                            </div>
                          </div> */}
                          <div className="progress-percent">
                            <p className="text-body">
                              <img src={completedImage} alt="" />
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="progress-limit-end">
                          {/* <div className="progress-show">
                            <div className="inner-wrap red-color ">
                              <span
                                className="progress-rate"
                                style={{ width: `100%` }}
                              ></span>
                            </div>
                          </div> */}
                          <div className="progress-percent">
                            <p className="text-body">
                              <img src={failedImage} alt="" />
                            </p>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="progress-limit">
                        <div className="progress-show">
                          <div className="inner-wrap orange-color">
                            <span
                              className="progress-rate"
                              style={{ width: `${sprint.completed_perc}%` }}
                            ></span>
                          </div>
                        </div>
                        <div className="progress-percent">
                          <p className="text-body">{`${parseInt(
                            sprint.completed_perc
                          )}%`}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })
        : null}
    </>
  )
}

export default SpritCard
