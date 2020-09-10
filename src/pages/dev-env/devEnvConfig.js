import DevEnvPage from "pages/dev-env/"

import authRoles from "config/const/authRoles"
import Taskboard from "pages/dev-env/Taskboard"
import Overview from "pages/dev-env/Overview"
import VersionControl from "pages/dev-env/VersionControl"
import Communication from "pages/dev-env/Communication"
import ChatCommunication from "pages/dev-env/Communication/ChatCommunication"
import EmailCommunication from "pages/dev-env/Communication/EmailCommunication"
import EmailList from "pages/dev-env/Communication/EmailCommunication/EmailList"

import EmailDetails from "pages/dev-env/Communication/EmailCommunication/EmailDetails"
import EmailCompose from "pages/dev-env/Communication/EmailCommunication/ComposeEmail"
import VideoCommunication from "pages/dev-env/Communication/VideoCommunication"
import DocsCommunication from "pages/dev-env/Communication/DocsCommunication"
const DevEnvConfig = {
  auth: authRoles.admin,

  routes: [
    {
      path: "/dev-env/:upr_id/overview",
      component: Overview,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/task-board",
      component: Taskboard,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/version-control",
      component: VersionControl,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/code-review",
      component: Overview,
      isAuth: true
    },

    {
      path: "/dev-env/:upr_id/communication/chat",
      component: ChatCommunication,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/email/inbox",
      component: EmailList,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/email/sent",
      component: EmailList,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/email/compose",
      component: EmailCompose,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/email/:eml_id",
      component: EmailDetails,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/email",
      component: EmailCommunication,
      isAuth: true
    },

    {
      path: "/dev-env/:upr_id/communication/video",
      component: VideoCommunication,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication/file",
      component: DocsCommunication,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id/communication",
      component: Communication,
      isAuth: true
    },
    {
      path: "/dev-env/:upr_id",

      isAuth: true,
      component: DevEnvPage
    }
  ]
}
export default DevEnvConfig
