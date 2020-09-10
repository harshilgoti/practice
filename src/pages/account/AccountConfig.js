import AccountPage from "pages/account"
import authRoles from "config/const/authRoles"

const UserAccountConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/user-account",
      component: AccountPage,
      isAuth: true
    }
  ]
}
export default UserAccountConfig
