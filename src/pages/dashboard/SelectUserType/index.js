import React from "react"
import { Link } from "react-router-dom"

function SelectUserTypePopup(props) {
  const handleCloseSelectUserTypePopup = () => {
    props.close()
  }

  return (
    <>
      {/* <!-- pop up start here (important Note) for what you to do like popup--> */}
      <section className="dialog-container explorePopMain">
        <div className="dialog-box">
          <div className="dialog-content">
            <h1 className="h3">What would you like to do ?</h1>
            <div className="explorePop">
              <div className="explore-col">
                {/* <a href="" className="btn learn explorebtn">
                  Explore and Learn
                </a> */}
                <Link to="/companies-and-role-list" className="btn learn apply">
                  Explore and Lear'n
                </Link>
                <h6 className="nav-link">It's where every journey starts</h6>
                <p className="p">
                  Explore the Zero to Career laerning environment by working on
                  various virtual products identical to those in the real world.
                  The learning environment gives you the opportunity to try
                  different kind of roles, technilogies, and projects to help
                  you either learn and pratice relevant skills or find a
                  fulfilling role with an employer you're interested in.
                </p>
              </div>
              <div className="explore-col center">
                <h3 className="h3 blue">OR</h3>
              </div>
              <div className="explore-col">
                <Link to="/companies-and-role-list" className="btn learn apply">
                  Apply to an Employer
                </Link>

                <h6 className="nav-link">Because you're a pro</h6>
                <p className="p">
                  You'll choose a role and employer, and work on a series of
                  projects of increasing complexity. The tasks you perform in
                  these projects will be identical to those you would perform in
                  the chosen role. As you progress, you will move from doing
                  tasks that test you for the employer's minimum qualifications
                  to the preferred ones.
                </p>
              </div>
            </div>

            <div className="note">
              While it certainly is possible (and tempering) to immediately
              choose the second option, we recommend that you choose the first.
              evev if it is to get a liitle more familiar with how the platform
              works.
            </div>
          </div>
          <div className="close-btn" onClick={handleCloseSelectUserTypePopup}>
            X
          </div>
        </div>
      </section>
    </>
  )
}

export default SelectUserTypePopup
