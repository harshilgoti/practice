import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

function EmailCommunicationPage(props) {
  let { upr_id } = useParams()
  let history = useHistory()

  useEffect(() => {
    history.push(`/dev-env/${upr_id}/communication/email/inbox`)
  }, [upr_id])

  return <></>
}

export default EmailCommunicationPage
