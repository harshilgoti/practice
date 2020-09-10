import { combineReducers } from "redux"

import user from "./user.reducer"
import auth from "./auth.reducer"
import common from "./common.reducer"
import job from "./jobs.reducer"
import notification from "./notifications.reducer"
import product from "./product.reducer"
import bot from "./bot.reducer"
import dashboard from "./dashboard.reducer"
import roadmap from "./roadmap.reducer"

const appReducer = combineReducers({
  user,
  auth,
  common,
  job,
  notification,
  product,
  bot,
  dashboard,
  roadmap
})

const rootReducer = (state, action) => {
  if (action.type === "AUTH_LOGOUT") {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
