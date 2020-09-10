import UpdateProfilePage from "pages/update-profile"
import authRoles from "config/const/authRoles"

const UpdateProfileConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/update-profile",
      component: UpdateProfilePage,
      isAuth: true
    }
  ]
}
export default UpdateProfileConfig
