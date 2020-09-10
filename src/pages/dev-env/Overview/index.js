import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import DashboardLayout from "components/Dashboard/Layout"
import WorkspaceSliderPopup from "../../dashboard/WorkspaceSliderPopup"
import Loader from "components/Loader"
import Chatbot from "components/Chatbot"
import TabList from "components/TabList"
import ProdcutInfo from "components/ProdcutInfo"
import ProductRoadmap from "./ProductRoadmap"
import ProductBacklog from "./ProductBacklog"
import Sprints from "./Sprints"
import {
  getUserProductDetailsById,
  getProductRoadmap,
  enqueueSnackbar
} from "redux/action"
import { DragDropContext } from "react-beautiful-dnd"

function Overview(props) {
  const isShowProductBacklogPopup = localStorage.getItem(
    "on_boarded_welcome_slider"
  )
  const dispatch = useDispatch()
  let { upr_id } = useParams()
  const productDetailsById = useSelector(
    ({ product }) => product.productDetailsById
  )

  const { productRoadmapList, productRoadmapListLoaded } = useSelector(
    ({ roadmap }) => roadmap
  )
  const [run, setJoyRideRun] = useState(false)
  const [isShowWelcomePopup, setIsShowWelcomePopup] = useState(true)
  const [isShowLoader, setIsShowLoader] = useState(true)
  const [draggedBacklogList, setDraggedBacklogList] = useState([])
  const [productBackloagList, setProductBackloagList] = useState([])

  const sprintListByProductId = useSelector(
    ({ product }) => product.sprintListByProductId
  )
  const { userDetails } = useSelector(({ user }) => user)

  useEffect(() => {
    !productRoadmapListLoaded && dispatch(getProductRoadmap(upr_id))
  }, [dispatch, productRoadmapListLoaded, upr_id])

  useEffect(() => {
    dispatch(getUserProductDetailsById(upr_id))
  }, [dispatch, upr_id])

  // useEffect(() => {
  //   dispatch(getUserProductDetailsById(upr_id))
  // }, [dispatch, upr_id])

  useEffect(() => {
    !!productDetailsById &&
      setProductBackloagList(productDetailsById.product_backlog)
  }, [productDetailsById])

  // useEffect(() => {
  //   !!Object.keys(productDetailsById).length &&
  //     setProductBackloagList(productDetailsById.product_backlog)
  // }, [Object.keys(productDetailsById).length])

  function handleCloseWorkspaceSlider() {
    setIsShowWelcomePopup(false)
    //start joyride
    setJoyRideRun(true)
  }

  const onDragEnd = result => {
    const { source, destination } = result
    if (
      source.droppableId === "backlog" &&
      destination.droppableId === "sprint"
    ) {
      let updateDraggedBacklogList = draggedBacklogList
      const draggedBacklog = productBackloagList.find(
        (backlog, index) => index === source.index
      )
      let updatedProductBacklogList = productBackloagList
      if (draggedBacklog.type === "story") {
        if (updatedProductBacklogList[0]._id === draggedBacklog._id) {
          updatedProductBacklogList.splice(source.index, 1)
          setProductBackloagList(updatedProductBacklogList)
          updateDraggedBacklogList.push(draggedBacklog)

          setDraggedBacklogList(updateDraggedBacklogList)
        } else {
          dispatch(
            enqueueSnackbar({
              message: `Stories need to be added in the order they appear in your product backlog`,
              options: {
                key: new Date().getTime() + Math.random(),
                autoHideDuration: 1000,
                variant: "warning",
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "center"
                }
              }
            })
          )
        }
      } else {
        //snakabr if tries to put epic in sprint creation
        dispatch(
          enqueueSnackbar({
            message: `Epics can't be put into sprints. `,
            options: {
              key: new Date().getTime() + Math.random(),
              autoHideDuration: 1000,
              variant: "warning",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center"
              }
            }
          })
        )
      }
    }

    if (
      source.droppableId === "sprint" &&
      destination.droppableId === "backlog"
    ) {
      let updateDraggedBacklogList = draggedBacklogList
      const draggedBacklog = draggedBacklogList.find(
        (backlog, index) => index === source.index
      )
      let updatedProductBacklogList = productBackloagList
      updatedProductBacklogList.push(draggedBacklog)

      setProductBackloagList(updatedProductBacklogList)
      updateDraggedBacklogList.splice(source.index, 1)
      setDraggedBacklogList(updateDraggedBacklogList)
    }
  }
  const onDragStart = result => {
    //snakbar if trie to create another until last sprint is not completed yet.

    if (
      sprintListByProductId &&
      sprintListByProductId.length &&
      !sprintListByProductId[0].is_completed
    ) {
      dispatch(
        enqueueSnackbar({
          message: `You must complete a sprint before crearing another one`,
          options: {
            key: new Date().getTime() + Math.random(),
            autoHideDuration: 1000,
            variant: "warning",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )
    }
  }

  const handleResetDraggedBacklog = () => {
    setProductBackloagList([...productBackloagList, ...draggedBacklogList])
    setDraggedBacklogList([])
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShowLoader(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  const handleCloseJoyride = () => {
    setJoyRideRun(false)
    localStorage.setItem("on_boarded_welcome_slider", true)
  }

  return (
    <>
      <DashboardLayout>
        {isShowLoader && !productDetailsById ? (
          <Loader />
        ) : (
          <>
            {/* //chat bot & tab start */}
            <Chatbot />
            <section className="w-full main-tab-wrap">
              <div className="container fluid">
                <ProdcutInfo />

                <TabList />
              </div>
            </section>
            {/* //chat bot & tab end */}
            <section className="tab-panel overview">
              <div className="w-full flex justify-center">
                <ProductRoadmap
                  data={productRoadmapList && productRoadmapList}
                />
                <div className="overview-right flex">
                  <DragDropContext
                    onDragEnd={onDragEnd}
                    onDragStart={onDragStart}
                  >
                    <ProductBacklog
                      productDetailsById={
                        productDetailsById && productDetailsById
                      }
                      draggbleTitle={"backlog"}
                      productBackloagList={productBackloagList}
                      run={run}
                      closeJoyride={handleCloseJoyride}
                    />
                    <Sprints
                      productDetailsById={
                        productDetailsById && productDetailsById
                      }
                      draggbleTitle={"sprint"}
                      draggedBacklogList={draggedBacklogList}
                      resetDraggedBackloag={handleResetDraggedBacklog}
                    />
                  </DragDropContext>
                </div>
              </div>
            </section>
          </>
        )}

        {isShowWelcomePopup &&
          !isShowProductBacklogPopup &&
          Object.keys(userDetails).length > 0 &&
          !userDetails.is_workspace_onboarded && (
            <WorkspaceSliderPopup close={handleCloseWorkspaceSlider} />
          )}

        {/* <!-- Overview html --> */}
      </DashboardLayout>
    </>
  )
}

export default Overview
