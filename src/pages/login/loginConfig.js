import LoginPage from "pages/login"
import authRoles from "config/const/authRoles"

const LoginConfig = {
  auth: authRoles.admin,
  routes: [
    {
      path: "/login",
      component: LoginPage,
      isAuth: false
    }
  ]
}
export default LoginConfig
