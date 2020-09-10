import EmailVerificationPage from "pages/email-verification"
import authRoles from "config/const/authRoles"

const EmailVerificationConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/verify/email/:id",
      component: EmailVerificationPage,
      isAuth: false
    }
  ]
}
export default EmailVerificationConfig
