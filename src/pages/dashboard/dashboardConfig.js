import Dashboard from "pages/dashboard"
import authRoles from "config/const/authRoles"

const DashboardConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/dashboard",
      component: Dashboard,
      isAuth: true
    }
  ]
}
export default DashboardConfig
