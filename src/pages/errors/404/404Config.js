import Error404 from "pages/errors/404"
import authRoles from "config/const/authRoles"

const Error404Config = {
  auth: authRoles.admin,
  routes: [
    {
      path: "/error-404",
      component: Error404,
      isAuth: false
    }
  ]
}
export default Error404Config
