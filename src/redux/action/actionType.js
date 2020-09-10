//auth
export const AUTH_SIGN_UP = "AUTH_SIGN_UP"
export const AUTH_SIGN_UP_SUCCESS = "AUTH_SIGN_UP_SUCCESS"
export const AUTH_SIGN_UP_FAILURE = "AUTH_SIGN_UP_FAILURE"

export const AUTH_LOGIN = "AUTH_LOGIN"
export const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS"
export const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE"

export const AUTH_FORGOT_PASSWORD = "AUTH_FORGOT_PASSWORD"
export const AUTH_FORGOT_PASSWORD_SUCCESS = "AUTH_FORGOT_PASSWORD_SUCCESS"
export const AUTH_FORGOT_PASSWORD_FAILURE = "AUTH_FORGOT_PASSWORD_FAILURE"

export const AUTH_CHANGE_PASSWORD = "AUTH_CHANGE_PASSWORD"
export const AUTH_CHANGE_PASSWORD_SUCCESS = "AUTH_CHANGE_PASSWORD_SUCCESS"
export const AUTH_CHANGE_PASSWORD_FAILURE = "AUTH_CHANGE_PASSWORD_FAILURE"

export const AUTH_RESET_PASSWORD = "AUTH_RESET_PASSWORD"
export const AUTH_RESET_PASSWORD_SUCCESS = "AUTH_RESET_PASSWORD_SUCCESS"
export const AUTH_RESET_PASSWORD_FAILURE = "AUTH_RESET_PASSWORD_FAILURE"

export const AUTH_MAIL_CONFIRM = "AUTH_MAIL_CONFIRM"
export const AUTH_MAIL_CONFIRM_SUCCESS = "AUTH_MAIL_CONFIRM_SUCCESS"
export const AUTH_MAIL_CONFIRM_FAILURE = "AUTH_MAIL_CONFIRM_FAILURE"

export const AUTH_USER_LOGOUT = "AUTH_USER_LOGOUT"
export const AUTH_USER_LOGOUT_SUCCESS = "AUTH_USER_LOGOUT_SUCCESS"
export const AUTH_USER_LOGOUT_FAILURE = "AUTH_USER_LOGOUT_FAILURE"

// common
export const GET_LANGUAGE_LIST = "GET_LANGUAGE_LIST"
export const GET_LANGUAGE_LIST_SUCCESS = "GET_LANGUAGE_LIST_SUCCESS"
export const GET_LANGUAGE_LIST_FAILURE = "GET_LANGUAGE_LIST_FAILURE"

//user
export const UPDATE_USER_PROFILE = "UPDATE_USER_PROFILE"
export const UPDATE_USER_PROFILE_SUCCESS = "UPDATE_USER_PROFILE_SUCCESS"
export const UPDATE_USER_PROFILE_FAILURE = "UPDATE_USER_PROFILE_FAILURE"

export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS"
export const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS"
export const FETCH_USER_DETAILS_FAILURE = "FETCH_USER_DETAILS_FAILURE"

export const USER_CREATE_EXTRA_FIELD = "USER_CREATE_EXTRA_FIELD"
export const USER_CREATE_EXTRA_FIELD_SUCCESS = "USER_CREATE_EXTRA_FIELD_SUCCESS"
export const USER_CREATE_EXTRA_FIELD_FAILURE = "USER_CREATE_EXTRA_FIELD_FAILURE"

export const UPDATE_USER_STATIC_XP_SUCCESS = "UPDATE_USER_STATIC_XP_SUCCESS"
export const TOGGLE_PRODUCT_BACKLOG_WELCOME_POPUP =
  "TOGGLE_PRODUCT_BACKLOG_WELCOME_POPUP"

//job

export const FETCH_COMPANIES_AND_ROLES_LIST = "FETCH_COMPANIES_AND_ROLES_LIST"
export const FETCH_COMPANIES_AND_ROLES_LIST_SUCCESS =
  "FETCH_COMPANIES_AND_ROLES_LIST_SUCCESS"
export const FETCH_COMPANIES_AND_ROLES_LIST_FAILURE =
  "FETCH_COMPANIES_AND_ROLES_LIST_FAILURE"

export const FETCH_ACTIVE_WORKSPACES_LIST = "FETCH_ACTIVE_WORKSPACES_LIST"
export const FETCH_ACTIVE_WORKSPACES_LIST_SUCCESS =
  "FETCH_ACTIVE_WORKSPACES_LIST_SUCCESS"
export const FETCH_ACTIVE_WORKSPACES_LIST_FAILURE =
  "FETCH_ACTIVE_WORKSPACES_LIST_FAILURE"

export const FETCH_ROLE_DETAILS_BY_ID = "FETCH_ROLE_DETAILS_BY_ID"
export const FETCH_ROLE_DETAILS_BY_ID_SUCCESS =
  "FETCH_ROLE_DETAILS_BY_ID_SUCCESS"
export const FETCH_ROLE_DETAILS_BY_ID_FAILURE =
  "FETCH_ROLE_DETAILS_BY_ID_FAILURE"

export const USER_BEGIN_PROJECT = "USER_BEGIN_PROJECT"
export const USER_BEGIN_PROJECT_SUCCESS = "USER_BEGIN_PROJECT_SUCCESS"

export const USER_BEGIN_PROJECT_FAILURE = "USER_BEGIN_PROJECT_FAILURE"

export const USER_UPDATE_TICKET = "USER_UPDATE_TICKET"
export const USER_UPDATE_TICKET_SUCCESS = "USER_UPDATE_TICKET_SUCCESS"
export const USER_UPDATE_TICKET_FAILURE = "USER_UPDATE_TICKET_FAILURE"

export const USER_UPDATE_PROJECT = "USER_UPDATE_PROJECT"
export const USER_UPDATE_PROJECT_SUCCESS = "USER_UPDATE_PROJECT_SUCCESS"
export const USER_UPDATE_PROJECT_FAILURE = "USER_UPDATE_PROJECT_FAILURE"

export const USER_CODE_UPLOAD = "USER_CODE_UPLOAD"
export const USER_CODE_UPLOAD_SUCCESS = "USER_CODE_UPLOAD_SUCCESS"
export const USER_CODE_UPLOAD_FAILURE = "USER_CODE_UPLOAD_FAILURE"

export const FETCH_TICKET_SUBMISSION_LIST = "FETCH_TICKET_SUBMISSION_LIST"
export const FETCH_TICKET_SUBMISSION_LIST_SUCCESS =
  "FETCH_TICKET_SUBMISSION_LIST_SUCCESS"
export const FETCH_TICKET_SUBMISSION_LIST_FAILURE =
  "FETCH_TICKET_SUBMISSION_LIST_FAILURE"

//notifications

export const NOTIFICATIONS_ENQUEUE_SNACKBAR = "NOTIFICATIONS_ENQUEUE_SNACKBAR"
export const NOTIFICATIONS_CLOSE_SNACKBAR = "NOTIFICATIONS_CLOSE_SNACKBAR"
export const NOTIFICATIONS_REMOVE_SNACKBAR = "NOTIFICATIONS_REMOVE_SNACKBAR"

export const FETCH_ALL_NOTIFICATIONS_LIST = "FETCH_ALL_NOTIFICATIONS_LIST"
export const FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS =
  "FETCH_ALL_NOTIFICATIONS_LIST_SUCCESS"
export const FETCH_ALL_NOTIFICATIONS_LIST_FAILURE =
  "FETCH_ALL_NOTIFICATIONS_LIST_FAILURE"

export const MARK_ALL_NOTIFICATIONS_AS_READ = "MARK_ALL_NOTIFICATIONS_AS_READ"
export const MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS =
  "MARK_ALL_NOTIFICATIONS_AS_READ_SUCCESS"
export const MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE =
  "MARK_ALL_NOTIFICATIONS_AS_READ_FAILURE"

export const UPDATE_NOTIFICATION_LIST_ON_SOCKET =
  "UPDATE_NOTIFICATION_LIST_ON_SOCKET"

//product

export const FETCH_PROJECT_DETAILS_BY_ID = "FETCH_PROJECT_DETAILS_BY_ID"
export const FETCH_PROJECT_DETAILS_BY_ID_SUCCESS =
  "FETCH_PROJECT_DETAILS_LIST_SUCCESS"
export const FETCH_PROJECT_DETAILS_BY_ID_FAILURE =
  "FETCH_PROJECT_DETAILS_LIST_FAILURE"

export const HANDLE_PROJECT_DETAILS_BY_ID = "HANDLE_PROJECT_DETAILS_BY_ID"

export const CREATE_SPRINTS = "CREATE_SPRINTS"
export const CREATE_SPRINTS_SUCCESS = "CREATE_SPRINTS_SUCCESS"
export const CREATE_SPRINTS_FAILURE = "CREATE_SPRINTS_FAILURE"

export const FETCH_SPRINT_LIST_BY_PRODUCT_ID = "FETCH_SPRINT_LIST_BY_PRODUCT_ID"
export const FETCH_SPRINT_LIST_BY_PRODUCT_ID_SUCCESS =
  "FETCH_SPRINT_LIST_BY_PRODUCT_ID_SUCCESS"
export const FETCH_SPRINT_LIST_BY_PRODUCT_ID_FAILURE =
  "FETCH_SPRINT_LIST_BY_PRODUCT_ID_FAILURE"

export const FETCH_STORY_LIST_BY_SPRINT = "FETCH_STORY_LIST_BY_SPRINT"
export const FETCH_STORY_LIST_BY_SPRINT_SUCCESS =
  "FETCH_STORY_LIST_BY_SPRINT_SUCCESS"
export const FETCH_STORY_LIST_BY_SPRINT_FAILURE = "FETCH_STORY_LIST_BY_SPRINT"

export const FETCH_TICKET_LIST_BY_STORY = "FETCH_TICKET_LIST_BY_STORY"
export const FETCH_TICKET_LIST_BY_STORY_SUCCESS =
  "FETCH_TICKET_LIST_BY_STORY_SUCCESS"

export const FETCH_TICKET_LIST_BY_STORY_FAILURE =
  "FETCH_TICKET_LIST_BY_STORY_FAILURE"

export const FETCH_TICKET_DETAILS_BY_ID = "FETCH_TICKET_DETAILS_BY_ID"
export const FETCH_TICKET_DETAILS_BY_ID_SUCCESS =
  "FETCH_TICKET_DETAILS_BY_ID_SUCCESS"
export const FETCH_TICKET_DETAILS_BY_ID_FAILURE =
  "FETCH_TICKET_DETAILS_BY_ID_FAILURE"

export const UPDATE_CURRENT_SPRINT_AND_STORY = "UPDATE_CURRENT_SPRINT_AND_STORY"

// Version control

export const FETCH_GIT_BRANCHES_BY_GIT_REPO_ID =
  "FETCH_GIT_BRANCHES_BY_GIT_REPO_ID"
export const FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_SUCCESS =
  "FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_SUCCESS"

export const FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_FAILURE =
  "FETCH_GIT_BRANCHES_BY_GIT_REPO_ID_FAILURE"

export const FETCH_GIT_COMMITS_BY_GIT_REPO_ID =
  "FETCH_GIT_COMMITS_BY_GIT_REPO_ID"
export const FETCH_GIT_COMMITS_BY_GIT_REPO_ID_SUCCESS =
  "FETCH_GIT_COMMITS_BY_GIT_REPO_ID_SUCCESS"

export const FETCH_GIT_COMMITS_BY_GIT_REPO_ID_FAILURE =
  "FETCH_GIT_COMMITS_BY_GIT_REPO_ID_FAILURE"

export const UPDATE_TICKET_STATUS = "UPDATE_TICKET_STATUS"
export const UPDATE_TICKET_STATUS_SUCCESS = "UPDATE_TICKET_STATUS_SUCCESS"
export const UPDATE_TICKET_STATUS_FAILURE = "UPDATE_TICKET_STATUS_FAILURE"

//communication

//email

export const FETCH_ALL_EMAIL_LIST_BY_STATUS = "FETCH_ALL_EMAIL_LIST_BY_STATUS"
export const FETCH_ALL_EMAIL_LIST_BY_STATUS_SUCCESS =
  "FETCH_ALL_EMAIL_LIST_BY_STATUS_SUCCESS"
export const FETCH_ALL_EMAIL_LIST_BY_STATUS_FAILURE =
  "FETCH_ALL_EMAIL_LIST_BY_STATUS_FAILURE"

export const FETCH_EMAIL_DETAILS_BY_ID = "FETCH_EMAIL_DETAILS_BY_ID"
export const FETCH_EMAIL_DETAILS_BY_ID_SUCCESS =
  "FETCH_EMAIL_DETAILS_BY_ID_SUCCESS"
export const FETCH_EMAIL_DETAILS_BY_ID_FAILURE =
  "FETCH_EMAIL_DETAILS_BY_ID_FAILURE"

export const COMPOSE_EMAIL = "FETCH__EMAIL_DETAILS_BY_ID"
export const COMPOSE_EMAIL_SUCCESS = "FETCH__EMAIL_DETAILS_BY_ID_SUCCESS"
export const COMPOSE_EMAIL_FAILURE = "FETCH__EMAIL_DETAILS_BY_ID_FAILURE"

//docs

export const FETCH_ALL_DOCUMENT_LIST = "FETCH_ALL_DOCUMENT_LIST"
export const FETCH_ALL_DOCUMENT_LIST_SUCCESS = "FETCH_ALL_DOCUMENT_LIST_SUCCESS"
export const FETCH_ALL_DOCUMENT_LIST_FAILURE = "FETCH_ALL_DOCUMENT_LIST_FAILURE"

export const USER_PRODUCT_ADD_DOCUMENT = "USER_PRODUCT_ADD_DOCUMENT"
export const USER_PRODUCT_ADD_DOCUMENT_SUCCESS =
  "USER_PRODUCT_ADD_DOCUMENT_SUCCESS"
export const USER_PRODUCT_ADD_DOCUMENT_FAILURE =
  "USER_PRODUCT_ADD_DOCUMENT_FAILURE"

export const USER_PRODUCT_UPLOAD = "USER_PRODUCT_UPLOAD"
export const USER_PRODUCT_UPLOAD_SUCCESS = "USER_PRODUCT_UPLOAD_SUCCESS"
export const USER_PRODUCT_UPLOAD_FAILURE = "USER_PRODUCT_UPLOAD_FAILURE"

//CHAT
export const FETCH_ALL_CHAT_USER_LIST = "FETCH_ALL_CHAT_USER_LIST"
export const FETCH_ALL_CHAT_USER_LIST_SUCCESS =
  "FETCH_ALL_CHAT_USER_LIST_SUCCESS"
export const FETCH_ALL_CHAT_USER_LIST_FAILURE =
  "FETCH_ALL_CHAT_USER_LIST_FAILURE"

export const FETCH_ALL_CHAT_LIST = "FETCH_ALL_CHAT_LIST"
export const FETCH_ALL_CHAT_LIST_SUCCESS = "FETCH_ALL_CHAT_LIST_SUCCESS"
export const FETCH_ALL_CHAT_LIST_FAILURE = "FETCH_ALL_CHAT_LIST_FAILURE"

export const USER_PRODUCT_ADD_CHAT = "USER_PRODUCT_ADD_CHAT"
export const USER_PRODUCT_ADD_CHAT_SUCCESS = "USER_PRODUCT_ADD_CHAT_SUCCESS"
export const USER_PRODUCT_ADD_CHAT_FAILURE = "USER_PRODUCT_ADD_CHAT_FAILURE"

//bot

//topic
export const FETCH_BOT_TOPIC_LIST = "FETCH_BOT_TOPIC_LIST"
export const FETCH_BOT_TOPIC_LIST_SUCCESS = "FETCH_BOT_TOPIC_LIST_SUCCESS"
export const FETCH_BOT_TOPIC_LIST_FAILURE = "FETCH_BOT_TOPIC_LIST_FAILURE"

export const FETCH_BOT_TOPIC_DETAILS_BY_ID = "FETCH_BOT_TOPIC_DETAILS_BY_ID"
export const FETCH_BOT_TOPIC_DETAILS_BY_ID_SUCCESS =
  "FETCH_BOT_TOPIC_DETAILS_BY_ID_SUCCESS"
export const FETCH_BOT_TOPIC_DETAILS_BY_ID_FAILURE =
  "FETCH_BOT_TOPIC_DETAILS_BY_ID_FAILURE"

//section tab

export const FETCH_BOT_SECTION_DETAILS_BY_ID = "FETCH_BOT_SECTION_DETAILS_BY_ID"
export const FETCH_BOT_SECTION_DETAILS_BY_ID_SUCCESS =
  "FETCH_BOT_SECTION_DETAILS_BY_ID_SUCCESS"
export const FETCH_BOT_SECTION_DETAILS_BY_ID_FAILURE =
  "FETCH_BOT_SECTION_DETAILS_BY_ID_FAILURE"

export const FETCH_BOT_SECTION_TAB_DETAILS_BY_ID =
  "FETCH_BOT_SECTION_TAB_DETAILS_BY_ID"
export const FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_SUCCESS =
  "FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_SUCCESS"
export const FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_FAILURE =
  "FETCH_BOT_SECTION_TAB_DETAILS_BY_ID_FAILURE"
//UPLOAD COMMON

export const PRODUCT_UPLOAD_FILE = "PRODUCT_UPLOAD_FILE"
export const PRODUCT_UPLOAD_FILE_SUCCESS = "PRODUCT_UPLOAD_FILE_SUCCESS"
export const PRODUCT_UPLOAD_FILE_FAILURE = "PRODUCT_UPLOAD_FILE_FAILURE"

//dashboard

export const DASHBOARD_GET_USER_REPORT = "DASHBOARD_GET_USER_REPORT"
export const DASHBOARD_GET_USER_REPORT_SUCCESS =
  "DASHBOARD_GET_USER_REPORT_SUCCESS"
export const DASHBOARD_GET_USER_REPORT_FAILURE =
  "DASHBOARD_GET_USER_REPORT_FAILURE"

export const DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE =
  "DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE"
export const DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS =
  "DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_SUCCESS"
export const DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE =
  "DASHBOARD_GET_USER_REPORT_FOR_XP_TIMELINE_FAILURE"

//roadmap

export const ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT =
  "ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT"
export const ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS =
  "ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS"
export const ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE =
  "ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE"

export const OPEN_CHATBOT_WITH_TOPICS_ID = "OPEN_CHATBOT_WITH_TOPICS_ID"
export const CLOSE_CHATBOT_WITH_TOPICS_ID = "CLOSE_CHATBOT_WITH_TOPICS_ID"

//Section feedback
export const UPDATE_SECTION_UPDATE_FEEDBACK = "UPDATE_SECTION_UPDATE_FEEDBACK"
export const UPDATE_SECTION_UPDATE_FEEDBACK_SUCCESS =
  "UPDATE_SECTION_UPDATE_FEEDBACK_SUCCESS"
export const UPDATE_SECTION_UPDATE_FEEDBACK_FAILURE =
  "UPDATE_SECTION_UPDATE_FEEDBACK_FAILURE"

//user invites

export const USER_INVITE_USER = "USER_INVITE_USER"
export const USER_INVITE_USER_SUCCESS = "USER_INVITE_USER_SUCCESS"
export const USER_INVITE_USER_FAILURE = "USER_INVITE_USER_FAILURE"

export const FETCH_TICKETS_BY_STORY = "FETCH_TICKETS_BY_STORY"
export const FETCH_TICKETS_BY_STORY_SUCCESS = "FETCH_TICKETS_BY_STORY_SUCCESS"
export const FETCH_TICKETS_BY_STORY_FAILURE = "FETCH_TICKETS_BY_STORY_FAILURE"

export const HANDLE_TICKETS_BY_STORY = "HANDLE_TICKETS_BY_STORY"

export const CLEAR_CURRENT_SPRINT = "CLEAR_CURRENT_SPRINT"

export const HANDLE_STORY_LIST_BY_SPRINT_ID = "HANDLE_STORY_LIST_BY_SPRINT_ID"
