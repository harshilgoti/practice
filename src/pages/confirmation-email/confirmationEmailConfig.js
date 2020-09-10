import ConfirmationEmailPage from "pages/confirmation-email"
import authRoles from "config/const/authRoles"

const ConfirmationEmailConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/confirmation",
      component: ConfirmationEmailPage,
      isAuth: false
    }
  ]
}
export default ConfirmationEmailConfig
