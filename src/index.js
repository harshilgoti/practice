import React from "react"
import { SnackbarProvider } from "notistack"
import history from "@history"
import { Router } from "react-router-dom"
import Authorization from "./components/Authorization"
import AppLayout from "./components/AppLayout"
import AppContext from "./AppContext"
import { Provider } from "react-redux"
import store from "./redux/store"
import ReactDOM from "react-dom"
import routes from "./config/routesConfig"
ReactDOM.render(
  <AppContext.Provider
    value={{
      routes
    }}
  >
    <Provider store={store}>
      <Router history={history}>
        <Authorization>
          <SnackbarProvider
            anchorOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            maxSnack={5}
          >
            <AppLayout />
          </SnackbarProvider>
        </Authorization>
      </Router>
    </Provider>
  </AppContext.Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
