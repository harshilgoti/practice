import React from "react"
import { useSelector } from "react-redux"

function TicketDescription(props) {
  const ticketDetailsById = useSelector(
    ({ product }) => product.ticketDetailsById
  )

  return (
    <>
      <div className="w-full description-wrap">
        <div className="text-16 ticket-details--x-padding font-semibold description-heading">
          Description
        </div>
        <div
          className="body_html_render"
          style={{ padding: "0 12px" }}
          id="style-popup"
        >
          <div
            className="w-full"
            dangerouslySetInnerHTML={{
              __html: ticketDetailsById.description_body_html
            }}
          />
        </div>
      </div>
    </>
  )
}

export default TicketDescription
