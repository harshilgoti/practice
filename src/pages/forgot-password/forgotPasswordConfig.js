import ForgotPasswordPage from "pages/forgot-password"
import authRoles from "config/const/authRoles"

const ForgotPasswordConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/forget-password",
      component: ForgotPasswordPage,
      isAuth: false
    }
  ]
}
export default ForgotPasswordConfig
