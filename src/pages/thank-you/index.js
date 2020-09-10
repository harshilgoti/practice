import React from "react"
import { Link } from "react-router-dom"
import Layout from "components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"

function Thankyou() {
  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Thank you --> */}
            <div className="left-side">
              <div>
                <h2 className="h2">Thank You!</h2>
                <div className="forms">
                  <ul>
                    <li>
                      <p>
                        Your password has been reset successfully. Please log in
                        again using your new password.
                      </p>
                    </li>

                    <li>
                      <Link className="hover-text" to="/login">
                        {" "}
                        Click here to Login
                      </Link>
                      {/* <a href="" className="hover-text">
                        Click here to Login
                      </a> */}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Thankyou
