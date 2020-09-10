import React from "react"
import Layout from "../../../components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"

function ErrorPage() {
  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Thank you --> */}
            <div className="left-side">
              <div>
                <h2 className="h2">Page Not Found!</h2>
                <div className="forms">
                  <ul>
                    <li>
                      {/* <Link className="hover-text" to="/login">
                        {' '}
                        Click here to Homepage
                      </Link> */}
                      <a
                        href="https://beta.zerotocareer.com"
                        className="hover-text"
                      >
                        Click here to Homepage
                      </a>
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

export default ErrorPage
