import React, { Component } from "react"
import { hasPermission } from "utils/helpers"
import { matchRoutes } from "react-router-config"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import AppContext from "AppContext"
import { getUserDetails } from "redux/action"

class FuseAuthorization extends Component {
  constructor(props, context) {
    super(props)
    const { routes } = context
    this.state = {
      accessGranted: false,
      routes,
      redirectUrl: ""
    }
  }

  componentDidMount() {
    if (!this.props.userDetails && localStorage.getItem("user-token")) {
      this.props.getUserDetails()
    }
    if (!this.state.accessGranted) {
      this.redirectRoute()
    }
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute()
    }
  }
  redirectRoute() {
    const { location, history, userDetails } = this.props
    const { pathname, state } = location
    const matched = matchRoutes(this.state.routes, pathname)[0]
    const redirectUrl =
      state && state.redirectUrl && userDetails ? state.redirectUrl : pathname

    if (matched) {
      if (matched.route.isAuth && !localStorage.getItem("user-token")) {
        history.push({
          pathname: "/login"
        })
      }
      if (!matched.route.isAuth && localStorage.getItem("user-token")) {
        history.push({
          pathname: "/dashboard"
        })
      }
    } else {
      history.push({
        pathname: redirectUrl
      })
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { location, userPermissions } = props
    const { pathname } = location

    const matched = matchRoutes(state.routes, pathname)[0]

    const isTokenAvialable = hasPermission(matched.route.auth, userPermissions)
      ? localStorage.getItem("user-token")
        ? false
        : true
      : false

    if (
      (matched && matched.route.isAuth && isTokenAvialable) ||
      (matched && !matched.route.isAuth && !isTokenAvialable)
    ) {
      return {
        accessGranted: false
      }
    } else {
      return {
        accessGranted: matched
          ? hasPermission(matched.route.auth, userPermissions)
          : true
      }
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.accessGranted !== this.state.accessGranted ||
      this.props.fetchingUserDetailsLoading !==
        nextProps.fetchingUserDetailsLoading
    )
  }

  render() {
    return this.state.accessGranted ? (
      <React.Fragment>{this.props.children}</React.Fragment>
    ) : (
      // <AccessDeniedPage />
      <h1>No page for you!</h1>
    )
  }
}

function mapStateToProps({ user }) {
  return {
    userDetails: user.userDetails,
    fetchingUserDetailsLoading: user.fetchingUserDetailsLoading,
    userPermissions: ["admin"]
  }
}

FuseAuthorization.contextType = AppContext

export default withRouter(
  connect(mapStateToProps, {
    getUserDetails
  })(FuseAuthorization)
)
