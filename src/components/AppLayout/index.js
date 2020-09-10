import React, { useContext } from "react"
import { renderRoutes } from "react-router-config"
import { withRouter } from "react-router-dom"
import { useSelector } from "react-redux"
import Intercom from "react-intercom"
import AppContext from "../../AppContext"
import Suspense from "../Suspense"
import { PageView, initGA } from "../../config/googleAnalytics"

function AppLayout(props) {
  const appContext = useContext(AppContext)

  const { routes } = appContext

  PageView()
  initGA()
  const userDetails = useSelector(({ user }) => user.userDetails)

  let intercomUser = {}

  if (userDetails && userDetails.id) {
    intercomUser = {
      user_id: userDetails.id,
      email: userDetails.email,
      name: userDetails.first_name + " " + userDetails.last_name
    }
  }

  return (
    <div className="app">
      {userDetails && userDetails.id ? (
        <Intercom
          appID={process.env.REACT_APP_INTERCOM_APP_ID}
          {...intercomUser}
        />
      ) : (
        ""
      )}
      <Suspense>{renderRoutes(routes)}</Suspense>
    </div>
  )
}

export default withRouter(React.memo(AppLayout))
