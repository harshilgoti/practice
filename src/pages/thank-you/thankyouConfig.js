import ThankyouPage from "pages/thank-you"
import authRoles from "config/const/authRoles"

const ThankyouConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/thankyou",
      component: ThankyouPage
    }
  ]
}
export default ThankyouConfig
