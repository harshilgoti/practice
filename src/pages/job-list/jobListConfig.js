import JobListPage from "pages/job-list"
import authRoles from "config/const/authRoles"

const JobListConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/companies-and-role-list",
      component: JobListPage,
      isAuth: true
    }
  ]
}
export default JobListConfig
