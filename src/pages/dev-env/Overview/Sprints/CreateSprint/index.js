import React from "react"
import { useParams, useHistory } from "react-router-dom"
import { Droppable } from "react-beautiful-dnd"
import { Scrollbars } from "react-custom-scrollbars"
import Sprint from "./Sprint"
import { useSelector, useDispatch } from "react-redux"
import { createSprints } from "redux/action"
import backArrow from "assets/images/all-new-svg-icons/backArrow.svg"
import { Event } from "config/googleAnalytics"

function CreateSprint(props) {
  let history = useHistory()

  const dispatch = useDispatch()
  let { upr_id } = useParams()
  const { draggbleTitle, draggedBacklogList } = props
  const productDetailsById = useSelector(
    ({ product }) => product.productDetailsById
  )
  const sprintListByProductId = useSelector(
    ({ product }) => product.sprintListByProductId
  )

  const handleCreateSprints = e => {
    const storyIdList = draggedBacklogList.map(backlog => {
      return backlog._id
    })
    const handleCreateSprintSuccess = createdSprint => {
      history.push(`/dev-env/${upr_id}/task-board/${createdSprint._id}`)
      Event(
        "CREATE_SPRINT",
        "Redirecte to taskboard successfully.",
        "OVERVIEW_PAGE"
      )
    }

    const body = {
      title: `sprint ${sprintListByProductId.length + 1} `,
      index: sprintListByProductId.length + 1,
      user_product_id: productDetailsById._id,
      stories: storyIdList
    }
    dispatch(createSprints(body, handleCreateSprintSuccess))
    e.stopPropagation()
  }
  const handleRedirectToSprintList = () => {
    props.handleRedirectToSprintList()
  }

  return (
    <div className="product-backlog popup-shadow01 product-backlog-with-btn active">
      {sprintListByProductId.length > 0 ? (
        <div>
          <div className="product-backlog-head create-sprint-head">
            <span className="left-arrow">
              <img
                src={backArrow}
                alt="backArrow"
                onClick={handleRedirectToSprintList}
              />
            </span>
            <h2 className="font-medium title-with-icon">Create Sprint</h2>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              lineHeight: "1.3"
            }}
          >
            <div>Duration of upcoming sprint:</div>

            <div style={{ fontWeight: "700" }}>
              00 days : 00 hours :
              {` ${productDetailsById &&
                productDetailsById.sprints_duration_mins[
                  sprintListByProductId.length
                ]}
             minutes`}
            </div>
            <div>Choose you tasks accordingly</div>
          </div>
        </div>
      ) : (
        <div className="product-backlog-head create-sprint-head">
          <h2 className="font-medium ">Create Sprint</h2>
        </div>
      )}

      <Droppable droppableId={draggbleTitle} type="CARD">
        {(provided, snapshot) => (
          <>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="product-backlog-box-wrapper"
              style={{ padding: "0px" }}
            >
              <Scrollbars autoHeight autoHeightMin={"calc(100vh - 333px)"}>
                {!draggedBacklogList.length ? (
                  <div className="drag-and-drop-area flex">
                    <p className="para text-center text-13">
                      Drag and drop items from the Product Backlog Column to
                      create a Sprint
                    </p>
                  </div>
                ) : (
                  draggedBacklogList.map((backlog, index) => {
                    return (
                      <Sprint
                        key={backlog._id}
                        backlog={backlog}
                        backlogIndex={index}
                        draggbleTitle={draggbleTitle}
                      />
                    )
                  })
                )}
              </Scrollbars>
              {provided.placeholder}
            </div>
            {draggedBacklogList.length ? (
              <div
                className="create-button text-center font-semibold text-15"
                onClick={e => handleCreateSprints(e)}
              >
                Create Sprint
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </Droppable>
    </div>
  )
}

export default CreateSprint
