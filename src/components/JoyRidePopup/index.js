import React from "react"

function JoyRidePopup(props) {
  return (
    <>
      {/* <!-- pop up start here (important Note) for what you to do like popup--> */}
      <section className="dialog-container explorePopMain">
        <div className="dialog-box" style={{ width: "500px !important" }}>
          <div className="dialog-content">
            <h2 className="h2">Welcome! Let's have a tour.</h2>

            <h3 className="h3 blue">
              Let's see the features and how you can use it. If you need, you
              can skip it now and it will show up the next time you access ZTC.
            </h3>
            <button
              className="btn"
              onClick={props.handleStartJoyRide}
              style={{ marginBottom: "20px" }}
            >
              <abbr>Start</abbr>
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default JoyRidePopup
