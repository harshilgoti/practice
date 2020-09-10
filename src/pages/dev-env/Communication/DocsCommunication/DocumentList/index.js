import React from "react"
import { useSelector } from "react-redux"

import textImage from "assets/images/all-new-svg-icons/text.svg"
import pdfImage from "assets/images/all-new-svg-icons/pdf-img.png"

// import doc1Image from "assets/images/chatbot/doc01.jpg"
// import doc2Image from "assets/images/chatbot/doc02.jpg"
// import doc3Image from "assets/images/chatbot/doc03.jpg"

function DocumentList(props) {
  const documentList = useSelector(({ product }) => product.documentList)
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "your-upload-content" --> */}
      <div className="your-upload-content flex active " id="style-3">
        {documentList.map(doc => {
          return (
            <div className="upload-content popup-shadow01" key={doc._id}>
              {" "}
              <img
                src={doc.file_type === "pdf" ? pdfImage : doc.url}
                style={{ maxHeight: "150px" }}
              />
              {/* <abbr className="text-10 file-sprint">
                Sprint1/Story3/Ticket2
              </abbr> */}
              <span className="text-body">
                <img src={textImage} /> {doc.file_name}
              </span>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default DocumentList
