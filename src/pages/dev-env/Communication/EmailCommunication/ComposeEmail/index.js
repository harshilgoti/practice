import React, { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import EmailLayout from "../EmailLayout"
import axios from "config/axios"
import CKEditor from "components/Dashboard/CkEditor"
import attachementImage from "assets/images/all-new-svg-icons/attachement.svg"
import { composeEmail } from "redux/action"
import xlsImage from "assets/images/all-new-svg-icons/xls.svg"

function ComposeEmail(props) {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  let { upr_id } = useParams()
  let history = useHistory()

  const [subject, setSubject] = useState("")
  const [messageBodyHtml, setMessageBodyHtml] = useState("")

  const [recipientMail, setRecipientMail] = useState("")
  const [attachmentList, setAttachmentList] = useState([])
  const [canBeSubmitted, setcanBeSubmitted] = useState(false)

  const handleChangeRecipientEmail = e => {
    if (e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setRecipientMail(e.target.value)

      setcanBeSubmitted(true)
    } else {
      setRecipientMail(e.target.value)

      setcanBeSubmitted(false)
    }
  }
  const handleChangeSubject = e => {
    setSubject(e.target.value)
  }

  const handleChangeMessageDataHtml = data => {
    setMessageBodyHtml(data)
  }

  const handleSuccess = () => {
    history.push(`/dev-env/${upr_id}/communication/email/sent`)
  }
  const handleSendMail = () => {
    if (canBeSubmitted && messageBodyHtml) {
      let messageBodyText = messageBodyHtml.replace(/<\/?[^>]+(>|$)/g, "")
      const body = {
        user_product_id: upr_id,
        to: recipientMail,
        message_body_text: messageBodyText,
        message_body_html: messageBodyHtml,
        attachment: attachmentList,
        subject: subject
      }
      dispatch(composeEmail(body, handleSuccess))
    }
  }
  const handleUpdateAttchmentList = (url, type, name) => {
    let updatedAttchmentList = attachmentList
    updatedAttchmentList.push({ url: url, file_type: type, file_name: name })
    setAttachmentList([...updatedAttchmentList])
  }
  function handleUploadAttachementImage(e) {
    e.preventDefault()

    let file = e.target.files[0]
    let fileNameArray = file.name.split(".")
    let fileType = fileNameArray[fileNameArray.length - 1]
    if (file) {
      var formData = new FormData()
      formData.append("file", file)
      formData.append("key", "mail")
      formData.append("type", fileType)
      axios
        .post(`/upload`, formData)
        .then(res => {
          handleUpdateAttchmentList(res.data.data.url, fileType, file.name)
        })
        .catch(error => {})
    }
  }
  const handleInputIconClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }
  return (
    <>
      <EmailLayout>
        {/* <!-- NOTE : Add "active" className on click to parent div which is "email-compose" --> */}
        <div className="email-compose active">
          <div className="email-compose-body">
            <div className="compose-to text-13">
              <input
                placeholder="Recipients"
                type="email"
                value={recipientMail}
                onChange={e => handleChangeRecipientEmail(e)}
              />
            </div>
            <div className="compose-to text-13">
              <input
                placeholder="Subject"
                type="email"
                onChange={e => handleChangeSubject(e)}
                value={subject}
              />
            </div>
          </div>
          <div className="email-content">
            {/* <p className="para text-12">Hi Adi,</p> */}
            <CKEditor onChanged={handleChangeMessageDataHtml} />

            {/* <p className="para text-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              nisi felis, consequat ac enim ut, aliquet tincidunt ipsum.{" "}
            </p>
            <p className="para text-12">
              Proin et porttitor lectus. Vestibulum commodo in nisl vitae
              vehicula. Vivamus egestas, risus vitae posuere luctus, quam nulla
              faucibus leo, ac finibus purus diam vitae quam. Praesent mauris
              diam, lacinia et vehicula egestas, sagittis id quam. Integer ut
              efficitur arcu. Duis vehicula consequat sem sit amet ultrices. In
              interdum quam ac odio volutpat lobortis.{" "}
            </p> */}
            {/* <p className="para text-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              ipsum purus, luctus vitae lectus ut, ornare pharetra orci.
              Phasellus at lacus bibendum, blandit diam eu, feugiat nunc. Donec
              ut purus augue.
            </p>

            <p className="para text-12">
              Thanks,
              <br />
              Rujuta
            </p> */}

            <p className="text-12">
              {attachmentList &&
                attachmentList.length > 0 &&
                attachmentList.map(attchment => {
                  return (
                    <div className="attachements" key={attchment.url}>
                      <span>
                        <a href={attchment.url} download>
                          <img src={xlsImage} alt={attchment.file_name} />
                          {attchment.file_name}
                        </a>
                      </span>
                    </div>
                  )
                })}
            </p>

            <div className="send-wrap flex" style={{ position: "relative" }}>
              <img
                src={attachementImage}
                alt="attachement"
                onClick={handleInputIconClick}
                style={{ cursor: "pointer" }}
              />
              <input
                ref={inputFileRef}
                id="myInput"
                style={{ display: "none" }}
                type="file"
                onChange={handleUploadAttachementImage}
                accept="image/*"
              />

              <a
                onClick={() => handleSendMail()}
                className={
                  canBeSubmitted && messageBodyHtml
                    ? "send-btn text-center text-14"
                    : "send-btn-disabled text-center text-14"
                }
              >
                send
              </a>
              <a
                href="javascript:void(0);"
                rel="noopener noreferrer"
                className="cancel-btn text-center text-14"
              >
                cancel
              </a>
            </div>
          </div>
        </div>
      </EmailLayout>
    </>
  )
}

export default ComposeEmail
