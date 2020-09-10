import React, { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import CommunicationLayout from "../CommunicationLayout"
import DocumentList from "./DocumentList"
import Emptylist from "./EmptyList"
import { getDocumentList, addUserProductDocument } from "redux/action"
import axios from "config/axios"
import { enqueueSnackbar } from "redux/action"

function VersionControl(props) {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  let { upr_id } = useParams()

  const documentList = useSelector(({ product }) => product.documentList)

  useEffect(() => {
    dispatch(getDocumentList(upr_id))
  }, [dispatch, upr_id])

  const handleSuccess = () => {
    dispatch(
      enqueueSnackbar({
        message: `Your file has been sucessfully uploaded`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      })
    )
  }
  function handleUploadDocument(e) {
    e.preventDefault()
    let file = e.target.files[0]
    let fileNameArray = file.name.split(".")
    let fileType = fileNameArray[fileNameArray.length - 1]
    if (file) {
      if (file.size <= 10485760) {
        var formData = new FormData()
        formData.append("file", file)
        formData.append("key", "docs")
        formData.append("type", fileType)

        axios
          .post(`/upload`, formData)
          .then(res => {
            const body = {
              user_product_id: upr_id,
              url: res.data.data.url,
              file_type: fileType,
              file_name: file.name
            }
            dispatch(addUserProductDocument(body, handleSuccess))
          })
          .catch(error => {})
      } else {
        //alert("You cant upload more then 10mb")
        dispatch(
          enqueueSnackbar({
            message: `Files must be under 10MB`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "warning",
              autoHideDuration: 3000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center"
              }
            }
          })
        )
      }
    }
  }

  const handleInputIconClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }

  return (
    <>
      <CommunicationLayout>
        {" "}
        <div className="communication-right">
          {/* <!-- NOTE : Add "active" className on click to parent div which is "your-uploads" --> */}
          <div className="your-uploads active">
            <div className="your-uploads-head flex">
              <h2 className="font-medium">Your file uploads</h2>
              <div
                style={{ position: "relative", cursor: "pointer" }}
                onClick={handleInputIconClick}
              >
                <abbr className="upload-new">Upload new</abbr>
                <input
                  ref={inputFileRef}
                  id="myInput"
                  style={{ display: "none" }}
                  type="file"
                  onChange={handleUploadDocument}
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
                />
              </div>
            </div>
            {documentList.length > 0 ? <DocumentList /> : <Emptylist />}
          </div>
        </div>
      </CommunicationLayout>
    </>
  )
}

export default VersionControl
