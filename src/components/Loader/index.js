import React from "react"
import logoImg from "assets/images/logomark.svg"

const Loader = () => {
  return (
    <div className="loader-section">
      <div className="loader-div">
        <img src={logoImg}></img>
        {/* <h2 className="h4">Loading...</h2> */}
      </div>
    </div>
  )
}

export default Loader
