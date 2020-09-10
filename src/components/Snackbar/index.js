import React from "react"
import Notifier from "../Notifier"

function Snakbar(props) {
  return (
    <>
      <Notifier />
      {props.children}
    </>
  )
}

export default Snakbar
