import React from "react"

import illustrationDocsImage from "assets/images/all-new-svg-icons/illustrationDocs.svg"

function Emptylist(props) {
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "your-upload-empty" --> */}
      <div className="your-upload-empty flex ">
        <img src={illustrationDocsImage} alt="no-data-available" />
        <p className="para text-13">Your file folder is empty</p>
      </div>
    </>
  )
}

export default Emptylist
