import JobDetailsPage from "pages/job-details"
import authRoles from "config/const/authRoles"

const JobDetailsConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/companies-and-role-list/job/:id",
      component: JobDetailsPage,
      isAuth: true
    }
  ]
}
export default JobDetailsConfig
