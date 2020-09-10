import React from "react"
import DashboardHeader from "../Header"
import Snakbar from "../../Snackbar"

function DashboardLayout(props) {
  return (
    <>
      <Snakbar>
        <DashboardHeader />
        {props.children}
      </Snakbar>
    </>
  )
}

export default DashboardLayout
