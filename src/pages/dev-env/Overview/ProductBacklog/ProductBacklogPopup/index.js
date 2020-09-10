import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ticketsByStory, handleTicketsByStory } from "redux/action"
import closeImage from "assets/images/all-new-svg-icons/close.svg"

function ProductBacklogPopup(props) {
  const dispatch = useDispatch()

  const ticketListByStory = useSelector(
    ({ product }) => product.ticketListByStory
  )
  const { backlog } = props
  useEffect(() => {
    backlog._id &&
      !ticketListByStory.length &&
      dispatch(ticketsByStory(backlog._id))
  }, [dispatch, ticketListByStory, backlog._id])

  function handleCloseProductBacklogPopup() {
    props.close()
    dispatch(handleTicketsByStory())
  }
  return (
    <>
      <section className="dialog-container explorePopMain">
        <div
          className="dialog-box-product-backlog"
          style={{ maxWidth: "600px" }}
        >
          <span className="close-icon">
            <img
              src={closeImage}
              alt=""
              onClick={handleCloseProductBacklogPopup}
            />
          </span>
          <div className="dialog-content">
            <h2 className="h2">{backlog.title}</h2>
            <div className="text-18" style={{ marginTop: "24px" }}>
              {backlog.description}
            </div>
            <div style={{ margin: "24px 0 50px" }}>
              {ticketListByStory &&
                !!ticketListByStory.length &&
                ticketListByStory.map((tic, i) => {
                  return (
                    <div className="text-18" key={i}>
                      {`Ticket - ${i} : ${tic.title}`}
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductBacklogPopup
