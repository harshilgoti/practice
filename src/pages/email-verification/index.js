import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { confirmMail } from "redux/action"

function EmailVerification() {
  const dispatch = useDispatch()
  let { id } = useParams()

  useEffect(() => {
    id && dispatch(confirmMail(id))
  }, [id]) // eslint-disable-line

  return (
    <>
      <header className="w-full header">
        <div className="container">
          <div className="logo">
            <img src="images/logo2.png" alt="" />
          </div>
          <div className="arrows">
            <img src="images/arrow.png" alt="" />
          </div>
        </div>
      </header>
      <section className="w-full sign-banner">
        <div className="container">
          <img src="images/signbanner.jpg" alt="" />
          {/* <!-- Thank you --> */}
          <div className="left-side">
            <div>
              <h1 className="h1">Thank You!</h1>
              <div className="forms">
                <ul>
                  <li>
                    <p>
                      Your email verification process has been done complete
                      successfully.
                    </p>
                  </li>
                  <li>
                    <Link to="/login"> Click here to Login</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
export default EmailVerification
