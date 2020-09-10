import React from "react"
import { Redirect } from "react-router-dom"
import { generateRoutesFromConfigs } from "../utils/helpers"

import Error404 from "pages/errors/404/404Config"
import LoginConfig from "../pages/login/loginConfig"
import SignupConfig from "../pages/signup/signupConfig"
import DashboardConfig from "../pages/dashboard/dashboardConfig"
import ConfirmationEmailConfig from "../pages/confirmation-email/confirmationEmailConfig"
import EmailVerificationConfig from "../pages/email-verification/emailVerificationConfig"
import ForgotPasswordConfig from "../pages/forgot-password/forgotPasswordConfig"
import ResetPasswordConfig from "../pages/reset-password/resetPasswordConfig"
import ThankyouConfig from "../pages/thank-you/thankyouConfig"
import UpdateProfile from "../pages/update-profile/updateProfileConfig"
import AccountConfig from "../pages/account/AccountConfig"
import JobListConfig from "../pages/job-list/jobListConfig"
import DevEnvConfig from "../pages/dev-env/devEnvConfig"
import JobDetailsConfig from "../pages/job-details/jobDetailsConfig"

const routeConfigs = [
  LoginConfig,
  SignupConfig,
  DashboardConfig,
  ConfirmationEmailConfig,
  EmailVerificationConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  ThankyouConfig,
  UpdateProfile,
  JobDetailsConfig,
  AccountConfig,
  JobListConfig,
  DevEnvConfig,
  Error404
]

const routes = [
  ...generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/login" />
  },
  {
    component: () => <Redirect to="/error-404" />
  }
]

export default routes
