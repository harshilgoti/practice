import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import Layout from "components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"
import { resetPassword } from "redux/action"

function ResetPassword(props) {
  let { id } = useParams()
  const { register, handleSubmit, watch, errors } = useForm()
  const dispatch = useDispatch()

  const { resetPasswordLoading, resetPasswordError } = useSelector(
    ({ auth }) => auth
  )

  function handleResetPasswordSuccess() {
    props.history.push(`/thankyou`)
  }

  const handleSubmitResetPassword = data => {
    const body = {
      token: id,
      new_password: data.password
    }

    dispatch(resetPassword(body, id, handleResetPasswordSuccess))
  }

  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Reset Password --> */}
            <div className="left-side">
              <div>
                <h2 className="h2">Reset Password</h2>
                <div className="forms">
                  <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
                    <ul>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="password"
                            id="password"
                            name="password"
                            className={watch("password") ? "active" : ""}
                            ref={register({ required: true, minLength: 8 })}
                          />
                          <label htmlFor=""> Password </label>
                          {errors.password &&
                            errors.password.type === "required" && (
                              <div className="error-line">
                                Please enter a password
                              </div>
                            )}
                          {errors.password &&
                            errors.password.type === "minLength" && (
                              <div className="error-line">
                                Password length should be 8 or more
                              </div>
                            )}
                        </div>
                      </li>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            ref={register({ required: true })}
                            className={watch("confirmPassword") ? "active" : ""}
                          />
                          <label htmlFor=""> Confirm Password </label>
                          {errors.confirmPassword &&
                            errors.confirmPassword.type === "required" && (
                              <div className="error-line">
                                Please confirm the password
                              </div>
                            )}
                          {errors &&
                            watch("confirmPassword") &&
                            watch("password") &&
                            watch("confirmPassword") !== watch("password") && (
                              <div className="error-line">
                                Please make sure the passwords match
                              </div>
                            )}
                        </div>
                      </li>
                      {resetPasswordError && (
                        <div className="err">{resetPasswordError}</div>
                      )}
                      <li className="form-group">
                        {resetPasswordLoading ? (
                          <div>
                            <button className="btn">
                              <abbr>Reset</abbr>
                            </button>
                          </div>
                        ) : (
                          <div>
                            <button type="submit" className="btn">
                              <abbr>Reset</abbr>
                            </button>
                          </div>
                        )}
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
export default ResetPassword
