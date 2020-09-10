import React, { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"

function DevEnvPage(props) {
  let { upr_id } = useParams()
  let history = useHistory()

  useEffect(() => {
    history.push(`/dev-env/${upr_id}/overview`)
  }, [upr_id])

  return <></>
}

export default DevEnvPage
