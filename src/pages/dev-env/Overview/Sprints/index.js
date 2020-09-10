import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import addSprintsSvg from "assets/images/all-new-svg-icons/addSprint.svg"
import backArrow from "assets/images/all-new-svg-icons/backArrow.svg"
import completedImage from "assets/images/all-new-svg-icons/completed.svg"

import CreateSprit from "./CreateSprint"
import SpritCard from "./SpritCard"
import { Scrollbars } from "react-custom-scrollbars"
import { getSprintListByProductId } from "redux/action"

function Sprints(props) {
  const dispatch = useDispatch()

  const { productDetailsById, draggbleTitle, draggedBacklogList } = props
  const [isShowCreateSprint, setIsShowCreateSprint] = useState(false)
  const [isShowSprintList, setIsShowSprintList] = useState(true)
  const [isShowSprintDetails, setIsShowSprintDetails] = useState(false)
  const storyListBySprintId = useSelector(
    ({ product }) => product.storyListBySprintId
  )

  const sprintListByProductId = useSelector(
    ({ product }) => product.sprintListByProductId
  )
  const fetchingSprintListByProductIdLoading = useSelector(
    ({ product }) => product.fetchingSprintListByProductIdLoading
  )
  const currentSprint = useSelector(({ product }) => product.currentSprint)
  const handleRedirectToCreateSprint = () => {
    setIsShowCreateSprint(true)
    setIsShowSprintList(false)
    setIsShowSprintDetails(false)
  }

  const handleRedirectToSprintList = () => {
    setIsShowCreateSprint(false)
    setIsShowSprintList(true)
    setIsShowCreateSprint(false)
    setIsShowSprintDetails(false)
    props.resetDraggedBackloag()
  }

  const handleRedirectToSprintDetails = () => {
    setIsShowSprintDetails(true)
    setIsShowCreateSprint(false)
    setIsShowSprintList(false)
  }

  useEffect(() => {
    productDetailsById &&
      productDetailsById._id &&
      dispatch(getSprintListByProductId(productDetailsById._id))
  }, [
    dispatch,
    productDetailsById,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    productDetailsById && productDetailsById._id
  ])
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "product-backlog" --> */}
      {(!(sprintListByProductId.length > 0) &&
        !fetchingSprintListByProductIdLoading) ||
      isShowCreateSprint ? (
        <CreateSprit
          productDetailsById={productDetailsById}
          handleRedirectToSprintList={handleRedirectToSprintList}
          draggbleTitle={draggbleTitle}
          draggedBacklogList={draggedBacklogList}
        />
      ) : (
        ""
      )}

      {/* <!-- NOTE : Add "active" className on click to parent div which is "product-backlog" --> */}
      {sprintListByProductId.length && isShowSprintList ? (
        <div className="product-backlog popup-shadow01 active">
          {!fetchingSprintListByProductIdLoading && (
            <div className=" product-backlog-head create-sprint-head create-sprint-head-plus-icon">
              <h2 className="font-medium">Sprints</h2>

              {sprintListByProductId[0].is_completed ? (
                <span className="plus-icon">
                  <img
                    src={addSprintsSvg}
                    alt="addSprintsSvg"
                    onClick={handleRedirectToCreateSprint}
                  />
                </span>
              ) : null}
            </div>
          )}
          <Scrollbars
            autoHeight
            autoHeightMin={50}
            autoHeightMax={"calc(100vh - 276px)"}
            className="product-backlog-box-wrapper backlog-sprint"
          >
            <div>
              <SpritCard
                productDetailsById={productDetailsById}
                handleRedirectToSprintDetails={handleRedirectToSprintDetails}
              />{" "}
            </div>
          </Scrollbars>
        </div>
      ) : (
        ""
      )}

      {/* <!-- NOTE : Add "active" className on click to parent div which is "product-backlog" --> */}
      {isShowSprintDetails && (
        <div className="product-backlog popup-shadow01 sprint-details active">
          <div className="product-backlog-head create-sprint-head-plus-icon">
            <div className="title-with-icon">
              <img
                className="left-arrow"
                onClick={handleRedirectToSprintList}
                src={backArrow}
                alt="backArrow"
              />
              <h2 className="title">{currentSprint && currentSprint.title}</h2>
            </div>
            {currentSprint && currentSprint.is_completed ? (
              <span
                className="plus-icon"
                onClick={handleRedirectToCreateSprint}
              >
                <img src={addSprintsSvg} alt="addSprintsSvg" />
              </span>
            ) : null}
          </div>
          <div className="progress-limit">
            <div className="progress-show">
              <div className="inner-wrap orange-color">
                <span
                  className="progress-rate"
                  style={{
                    width: `${currentSprint && currentSprint.completed_perc}%`
                  }}
                ></span>
              </div>
            </div>
            <div className="progress-percent">
              <p className="text-body">
                {" "}
                {currentSprint && currentSprint.completed_perc}%
              </p>
            </div>
          </div>
          <div className="product-backlog-box-wrapper">
            {storyListBySprintId.length
              ? storyListBySprintId.map(story => {
                  return (
                    <div style={{ padding: "10px 30px" }} key={story._id}>
                      <div className="product-backlog-box popup-shadow01">
                        <p className="para text-body">{story.description}</p>
                        <div className="progress-limit">
                          <div className="progress-show">
                            <div className="inner-wrap green-color">
                              <span
                                className="progress-rate"
                                style={{ width: `${story.completed_perc}` }}
                              ></span>
                            </div>
                          </div>
                          <div className="progress-percent">
                            {story.completed_perc === 100 ? (
                              <p className="text-body">
                                <img src={completedImage} alt="" />
                              </p>
                            ) : (
                              <p className="text-body">
                                {story.completed_perc}%
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
        </div>
      )}
    </>
  )
}

export default Sprints
