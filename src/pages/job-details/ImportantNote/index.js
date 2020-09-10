import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"

import { userBeginProject } from "../../../redux/action"

function ProjectDetailsPopup(props) {
  let history = useHistory()
  const { projectDetails } = props
  const dispatch = useDispatch()

  const handleCloseProjectDetailsPopup = () => {
    props.close()
  }

  const beginProjectLoading = useSelector(({ job }) => job.beginProjectLoading)

  const handleSuccessBeginProject = projectId => {
    history.push(`/project-details/${projectId}`)
  }
  const handleBeginProject = () => {
    const body = {
      employer_id: projectDetails.employer_id,
      job_id: projectDetails.id
    }
    dispatch(userBeginProject(body, handleSuccessBeginProject))
  }
  return (
    <>
      {/* <!-- pop up start here (important Note) for what you to do like popup--> */}
      <section className="dialog-container">
        <div className="dialog-box no-padding projectDetailsPop">
          <div className="popHeader">
            <h2 className="h3">An Important Note</h2>
          </div>
          <div className="dialog-content no-bottom">
            <div className="popconBox">
              <p className="p">{projectDetails.description}</p>
              <h6 className="nav-link">
                <a href="#TODO" onClick={handleCloseProjectDetailsPopup}>
                  Click Here
                </a>
                to return to explore
              </h6>
              <h6 className="nav-link">
                If you feel Confident, we wish you all the best
              </h6>
            </div>

            {beginProjectLoading ? (
              <button className="btn">
                <abbr>Begin</abbr>
              </button>
            ) : (
              <button className="btn" onClick={() => handleBeginProject()}>
                <abbr>Begin</abbr>
              </button>
            )}
          </div>
          <div className="close-btn" onClick={handleCloseProjectDetailsPopup}>
            X
          </div>
        </div>
      </section>
    </>
  )
}

export default ProjectDetailsPopup
