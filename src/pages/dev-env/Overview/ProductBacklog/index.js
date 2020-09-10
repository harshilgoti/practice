import React, { useState } from "react"
// import { Scrollbars } from "react-custom-scrollbars"
// import backlogicon01Image from "assets/images/chatbot/backlogicon01.png"
// import backlogicon02Image from "assets/images/chatbot/backlogicon02.png"
import ProductBacklogCard from "./ProductBacklogCard"
import ProductBacklogPopup from "./ProductBacklogPopup"
import ProductEpicBacklogPopup from "./ProductEpicBacklogPopup"
import Joyride from "react-joyride"
import { EVENTS } from "react-joyride"
import CallBackProps from "react-joyride"

import { Scrollbars } from "react-custom-scrollbars"
import { Droppable } from "react-beautiful-dnd"
import { useSelector } from "react-redux"

function ProductBacklog(props) {
  const steps = [
    {
      title: "The Product Backlog",
      content: "Click on the first card in the product backlog column.",
      placement: "auto",
      target: ".product-backlog-info .product-backlog-box",
      disableBeacon: true
    }
  ]
  const [isProductBacklogPopup, setProductBacklogPopup] = useState(false)
  const [isProductEpicBacklogPopup, setIsProductEpicBacklogPopup] = useState(
    false
  )

  const [currentBacklog, setCurrentBacklog] = useState({})

  const { draggbleTitle, productBackloagList, run } = props
  const fetchingProjectDetailsByIdLoading = useSelector(
    ({ product }) => product.fetchingProjectDetailsByIdLoading
  )
  function handleOpenProductBacklogPopup(backlog) {
    if (backlog.type === "epic") {
      setIsProductEpicBacklogPopup(true)
      setProductBacklogPopup(false)
    } else {
      setIsProductEpicBacklogPopup(false)
      setProductBacklogPopup(true)
    }

    setCurrentBacklog(backlog)
  }
  function handleCloseProductBacklogPopup() {
    setProductBacklogPopup(false)
    setCurrentBacklog({})
  }

  function handleCloseEpicProductBacklogPopup() {
    setIsProductEpicBacklogPopup(false)
    setProductBacklogPopup(false)
    setCurrentBacklog({})
  }

  function handleJoyrideCallback(data = CallBackProps) {
    // const { joyride } = this.props;
    const { index, type } = data

    if (index === 0 && type === EVENTS.TOUR_END) {
      props.closeJoyride()
    }
  }

  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "product-backlog" --> */}

      <div className="product-backlog popup-shadow01 active product-backlog-info">
        <Joyride
          // stepIndex={stepIndex}
          callback={handleJoyrideCallback}
          continuous
          //getHelpers={this.getHelpers}

          run={run}
          locale={{ last: "Go" }}
          scrollToFirstStep
          //showSkipButton
          hideBackButton={true}
          disableCloseOnEsc
          disableOverlayClose
          steps={steps}
          showProgress={false}
          styles={{
            options: {
              zIndex: 100
            },
            buttonClose: {
              display: "none"
            }
          }}
        />
        {!fetchingProjectDetailsByIdLoading && (
          <div>
            <h2 className="font-medium product-backlog-head ">
              Product Backlog
            </h2>

            <Droppable droppableId={draggbleTitle} type="CARD">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="product-backlog-box-wrapper"
                  style={{ padding: "0px" }}
                >
                  {productBackloagList.length ? (
                    <Scrollbars
                      autoHeight
                      autoHeightMin={50}
                      autoHeightMax={"calc(100vh - 276px)"}
                      className={"joyride-5"}
                    >
                      <div>
                        {productBackloagList.map((backlog, index) => {
                          return (
                            <div
                              style={{ padding: "10px 30px" }}
                              key={backlog._id}
                            >
                              <ProductBacklogCard
                                openProductBacklogPopup={
                                  handleOpenProductBacklogPopup
                                }
                                backlog={backlog}
                                backlogIndex={index}
                                draggbleTitle={draggbleTitle}
                              />{" "}
                            </div>
                          )
                        })}{" "}
                      </div>
                    </Scrollbars>
                  ) : null}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}

        <div></div>

        {/* <div className="product-backlog-box-wrapper" style={{ padding: "0px" }}>
          <Scrollbars>
            {productDetailsById.product_backlog &&
              productDetailsById.product_backlog.map((backlog, index) => {
                return (
                  <div style={{ padding: "10px 30px" }} key={backlog._id}>
                    <ProductBacklogCard
                      backlog={backlog}
                      backlogIndex={index}
                      title={title}
                    />{" "}
                  </div>
                )
              })}{" "}
          </Scrollbars>
        </div> */}
        {isProductBacklogPopup && (
          <ProductBacklogPopup
            backlog={currentBacklog}
            close={handleCloseProductBacklogPopup}
          />
        )}
        {isProductEpicBacklogPopup && (
          <ProductEpicBacklogPopup
            backlog={currentBacklog}
            close={handleCloseEpicProductBacklogPopup}
          />
        )}
      </div>
    </>
  )
}

export default ProductBacklog
