import ResetPasswordPage from "pages/reset-password"
import authRoles from "config/const/authRoles"

const ResetPasswordConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/reset-password/:id",
      component: ResetPasswordPage,
      isAuth: false
    }
  ]
}
export default ResetPasswordConfig
