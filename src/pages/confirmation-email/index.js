import React from "react"
import Layout from "components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"

function ConfirmationEmail(props) {
  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Confirmation --> */}
            <div className="left-side">
              <div>
                <h1 className="h2">We've sent you a reset link</h1>
                <div className="forms">
                  <ul>
                    <li>
                      <p>
                        If the email address you entered was registered with us,
                        you should receive a password reset link shortly.
                        <br />
                        <br /> Please make sure{" "}
                        <a
                          href="mailto:reset@zerotocareer.com"
                          className="mail"
                        >
                          reset@zerotocareer.com
                        </a>{" "}
                        is added to your safe senders list. If you received the
                        email, you can close this tab now.
                        <br />
                        <br /> If you don't receive the email, please contact
                        <a
                          href="mailto:support@zerotocareer.com"
                          className="mail"
                        >
                          {" "}
                          support@zerotocareer.com
                        </a>{" "}
                        and we'll take care of it.
                      </p>
                    </li>
                    <li>
                      <a
                        href="https://beta.zerotocareer.com/login"
                        className="hover-text"
                      >
                        Click here to login
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

export default ConfirmationEmail
