import React from "react"
import Header from "../Header"
import Snackbar from "../Snackbar"

function Layout(props) {
  return (
    <>
      <Snackbar>
        <Header />
        {props.children}
      </Snackbar>
    </>
  )
}

export default Layout
