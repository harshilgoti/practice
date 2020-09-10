import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Layout from "components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"
import { forgotPassword } from "redux/action"
import { useForm } from "react-hook-form"

function ForgotPassword(props) {
  const dispatch = useDispatch()

  const { register, handleSubmit, watch, errors } = useForm()

  const { forgotPasswordLoading, forgotPasswordError } = useSelector(
    ({ auth }) => auth
  )

  function handleForgotPasswordSuccess() {
    props.history.push(`/confirmation`)
  }

  const handleSubmitForgotPassword = data => {
    if (forgotPasswordLoading) return

    dispatch(forgotPassword(data, handleForgotPasswordSuccess))
  }

  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Forgot Password --> */}
            <div className="left-side">
              <div>
                <h2 className="h2">Forgot Password</h2>
                <div className="forms">
                  <form onSubmit={handleSubmit(handleSubmitForgotPassword)}>
                    <ul>
                      <li>
                        <p>Please enter your email address address below.</p>
                      </li>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            ref={register({
                              required: true,
                              pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                            })}
                            className={watch("email") ? "active" : ""}
                          />
                          <label htmlFor=""> Email </label>
                          {errors.email && errors.email.type === "required" && (
                            <div className="error-line">
                              Please enter your email address
                            </div>
                          )}
                          {errors.email && errors.email.type === "pattern" && (
                            <div className="error-line">
                              Please Enter valid email
                            </div>
                          )}
                        </div>
                      </li>
                      <li>
                        <p>
                          If your email is registered with us, we'll send you a
                          link to reset your password.
                        </p>
                      </li>
                      {forgotPasswordError && (
                        <div className="err">{forgotPasswordError}</div>
                      )}
                      <li className="form-group">
                        {forgotPasswordLoading ? (
                          <div>
                            <button className="btn">
                              <abbr>Send Reset Link</abbr>
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button type="submit" className="btn">
                              <abbr>Send Reset Link</abbr>
                            </button>
                          </div>
                        )}
                      </li>
                      <li>
                        <Link to="/login" className="hover-text">
                          Login Instead
                        </Link>
                      </li>
                    </ul>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
export default ForgotPassword
