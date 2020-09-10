import React, { useEffect } from "react"
import { Event } from "config/googleAnalytics"

import { Link, useLocation } from "react-router-dom"
import DashboardLayout from "components/Dashboard/Layout"
// import pinImg from "assets/images/pin.svg"
// import clockImg from "assets/images/clock.svg"
// import correctImg from "assets/images/correct.jpg"
import { useDispatch, useSelector } from "react-redux"
import {
  getCompaniesAndRolesList,
  getLanguageList
  // userBeginProject
} from "redux/action"
import { staticJobList } from "config/const"

function JobsList(props) {
  // let history = useHistory()
  let location = useLocation()
  let pathArray = location.pathname.split("/")
  const dispatch = useDispatch()
  const { companiesAndRolesList, isCompaniesAndRolesListLoaded } = useSelector(
    ({ job }) => job
  )
  const { userLevel } = useSelector(({ user }) => user)
  const languagesList = useSelector(({ common }) => common.languagesList)

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      })
    } catch (error) {
      window.scrollTo(0, 0)
    }
  }, [pathArray.length])
  useEffect(() => {
    dispatch(getCompaniesAndRolesList())
  }, [dispatch])

  useEffect(() => {
    !languagesList.length && dispatch(getLanguageList())
  }, [dispatch, languagesList.length])

  // const handleSuccessBeginProject = job_id => {
  //   window.location.replace(`/project-details/${job_id}`)
  // }
  // const handleBeginProject = (e, job) => {
  //   e.preventDefault()
  //   const body = {
  //     employer_id: job.employer_id,
  //     job_id: job.id
  //   }
  //   dispatch(userBeginProject(body))
  // }

  const handleRedirectToJObDetails = (e, job) => {
    Event(
      "PRODUCT_DETAILS",
      "Redirect to wordspace details page successfully",
      "WORKSHOP_LIST_PAGE"
    )
    props.history.push(`/companies-and-role-list/job/${job._id}`)
  }
  // const handelRedirectToDashboard = () => {
  //   history.push("/dashboard")
  // }

  let filteredCompaniesAndRolesList = []
  filteredCompaniesAndRolesList =
    companiesAndRolesList &&
    companiesAndRolesList.filter(job => !job.is_user_begin)
  filteredCompaniesAndRolesList = [
    ...filteredCompaniesAndRolesList,
    ...staticJobList
  ]
  filteredCompaniesAndRolesList.sort((a, b) => {
    let fa = +a.index,
      fb = +b.index

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
  return (
    <>
      <DashboardLayout>
        <section className="w-full employerMain">
          <div className="container">
            <h2 className="h3 font-medium">Select a workspace</h2>
            <ul>
              {isCompaniesAndRolesListLoaded &&
              filteredCompaniesAndRolesList.length
                ? filteredCompaniesAndRolesList.map(job => {
                    // const jobRequiredLangList = job.required_languages

                    return (
                      <li
                        className={!job.active ? "employer-box-disabled" : ""}
                        key={job._id}
                      >
                        {/* //condition on static level by on boarded now  */}
                        {job.index >= 3 && userLevel === 0 ? (
                          <div className="lock-message">
                            Unlock on Level - 2
                          </div>
                        ) : (
                          ""
                        )}
                        {/* {!job.active ? (
                          <div className="lock-message">
                            Unlock on Level - 2
                          </div>
                        ) : (
                          ""
                        )} */}
                        <div
                          className="employer-box "
                          onClick={e => handleRedirectToJObDetails(e, job)}
                        >
                          <div className="employer-name">
                            <div className="employer-logo">
                              <img src={job.company_logo_url} alt="" />
                            </div>
                            <div className="employer-details">
                              <div
                                className="h4"
                                style={{ marginBottom: "0px" }}
                              >
                                {job.company_name}
                              </div>
                              <div className="h5">{job.role_title}</div>
                            </div>
                            {/* <div className="select">
                      <img src={correctImg} alt="" />
                    </div> */}
                          </div>
                          <h4 className="h4">{job.title}</h4>

                          {/* <h6>{job.product_includes}</h6> */}
                          <p>
                            {" "}
                            {job.required_languages.length
                              ? job.required_languages.map((lang, i) => {
                                  return i !== job.required_languages.length - 1
                                    ? lang.title + " | "
                                    : lang.title
                                })
                              : null}
                          </p>

                          {job.is_user_begin ? (
                            <Link
                              to={`/project-details/${job.id}`}
                              className="nav-link"
                            >
                              <div className="hover-text">Resume</div>
                            </Link>
                          ) : (
                            ""
                          )}
                        </div>
                      </li>
                    )
                  })
                : ""}
            </ul>
          </div>
        </section>
      </DashboardLayout>
    </>
  )
}
export default JobsList
