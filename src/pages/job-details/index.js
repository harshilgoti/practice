import React, { useState, useEffect } from "react"
import { useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Event } from "config/googleAnalytics"

import DashboardLayout from "components/Dashboard/Layout"
import ProjectDetailsPopup from "./ImportantNote"
// import correctImg from "assets/images/correct.jpg"
// import pinImg from "assets/images/pin.svg"
import {
  getLanguageList,
  userBeginProject,
  getRoleDetailsById
} from "redux/action"
function JobDetails(props) {
  let { id } = useParams()
  let history = useHistory()

  const dispatch = useDispatch()
  const [isShowProjectDetailsPopup, setIsShowProjectDetailsPopup] = useState(
    false
  )
  const languagesList = useSelector(({ common }) => common.languagesList)

  const currentRoleDetails = useSelector(({ job }) => job.currentRoleDetails)
  useEffect(() => {
    !languagesList.length && dispatch(getLanguageList())
  }, [dispatch, languagesList.length])

  useEffect(() => {
    dispatch(getRoleDetailsById(id))
  }, [id, dispatch])

  const handleSuccessBeginProject = product_id => {
    Event(
      "BEGIN_PRODUCT",
      "Begin product done successfully",
      "WORKSHOP_DETAILS_PAGE"
    )
    history.push(`/dev-env/${product_id}`)
  }
  const handleOpenProjectDetailsPopup = currentRoleDetails => {
    if (currentRoleDetails.is_user_begin === 1) {
      props.history.push(`/dev-env/${currentRoleDetails.user_product_id}`)
    } else {
      const body = {
        employer_id: currentRoleDetails && currentRoleDetails.employer_id,
        workspace_id: currentRoleDetails && currentRoleDetails._id,
        product_id: currentRoleDetails && currentRoleDetails.product_id
      }

      dispatch(userBeginProject(body, handleSuccessBeginProject))

      // setIsShowProjectDetailsPopup(true)
    }
  }
  const handleCloseProjectDetailsPopup = () => {
    setIsShowProjectDetailsPopup(false)
  }

  const currentProjectRequiredLangList =
    currentRoleDetails && currentRoleDetails.required_languages
      ? currentRoleDetails.required_languages
      : []
  return (
    <>
      <DashboardLayout>
        {currentRoleDetails && currentRoleDetails.company_name ? (
          <section className="w-full employerDetailsMain">
            <div className="container employerDetails">
              <div style={{ display: "flex" }}>
                <div className="employer-logo">
                  <img
                    src={
                      currentRoleDetails && currentRoleDetails.company_logo_url
                    }
                    alt=""
                  />
                </div>
                <div className="employer-details">
                  <h2
                    className="h3"
                    style={{ marginBottom: "0", fontSize: "50px" }}
                  >
                    {currentRoleDetails && currentRoleDetails.company_name}
                  </h2>
                  <p
                    style={{
                      margin: "4px",
                      lineHeight: "20px",
                      width: "80%"
                    }}
                  >
                    {currentRoleDetails &&
                      currentRoleDetails.company_description}
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  margin: "50px 0 22px"
                }}
              >
                <h2 className="text-28">
                  {currentRoleDetails && currentRoleDetails.title}
                </h2>
                {/* <div className="text-28" style={{ margin: "0px 4px " }}>
                  :
                </div>
                <div className="text-28">{`${currentRoleDetails.role_title}`}</div> */}
              </div>
            </div>

            <div className="container title-desc">
              <div className="h4">What you'll do</div>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    currentRoleDetails &&
                    currentRoleDetails.description_body_html
                }}
              />
              {/* <pre
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "20px",
                  marginTop: "20px"
                }}
              >
                {currentRoleDetails && currentRoleDetails.description_body_html}{" "}
              </pre> */}
            </div>

            <div className="container title-desc">
              <div className="h4">What you'll need</div>
              <ul>
                {currentProjectRequiredLangList &&
                  currentProjectRequiredLangList.map(lang => {
                    return (
                      <li key={lang.title} style={{ pointerEvents: "none" }}>
                        <div className="img-box">
                          <img src={lang.icon_url} alt={lang.title} />
                        </div>
                        <p>{lang.title}</p>
                      </li>
                    )
                  })}
              </ul>
            </div>

            <div className="container divider"></div>

            <div className="container">
              <h2 className="h3" style={{ margin: "50px 0 34px" }}>
                Ready?
              </h2>
              <div className="actionRow form-group">
                <button
                  type="submit"
                  className="btn"
                  onClick={() =>
                    handleOpenProjectDetailsPopup(
                      currentRoleDetails && currentRoleDetails
                    )
                  }
                >
                  <abbr>Enter Workspace</abbr>
                </button>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}

        {isShowProjectDetailsPopup && (
          <ProjectDetailsPopup
            close={handleCloseProjectDetailsPopup}
            projectDetails={currentRoleDetails}
          />
        )}
      </DashboardLayout>
    </>
  )
}
export default JobDetails
