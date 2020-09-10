import SignupPage from "pages/signup"
import authRoles from "config/const/authRoles"

const SignupConfig = {
  auth: authRoles.admin,
  routes: [
    {
      path: "/signup",
      component: SignupPage
    }
  ]
}
export default SignupConfig
