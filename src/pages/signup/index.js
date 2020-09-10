import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import Layout from "components/Layout"
import signBannerImg from "assets/images/signbanner.jpg"
import { Event } from "config/googleAnalytics"

//with auth part commented
// import socialFbImg from 'assets/images/social-fb.png'
// import socialLinkedImg from 'assets/images/social-linked.png'
// import socialGitImg from 'assets/images/social-git.png'
// import socialGoogleImg from 'assets/images/social-google.png'
import { signup } from "redux/action"

function Signup(props) {
  let history = useHistory()
  const dispatch = useDispatch()
  const { register, handleSubmit, watch, errors } = useForm()
  const { signupLoading, signupError } = useSelector(({ auth }) => auth)

  function handleSignUpSuccess() {
    Event("SIGNUP", "User sing up successfully", "SIGNUP_PAGE")
    history.push("/dashboard")
  }

  const handleSubmitSignupForm = data => {
    if (signupLoading) return
    const body = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password
    }
    dispatch(signup(body, handleSignUpSuccess))
  }

  return (
    <>
      <Layout>
        <section className="w-full sign-banner">
          <img src={signBannerImg} alt="" />
          <div className="container">
            {/* <!-- Login --> */}
            <div className="left-side">
              <div>
                <h2 className="h2">Sign Up</h2>
                <div className="forms">
                  <form onSubmit={handleSubmit(handleSubmitSignupForm)}>
                    <ul>
                      <li className="requires">
                        <p>All fields required</p>
                      </li>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="text"
                            name="firstName"
                            className={watch("firstName") ? "active" : ""}
                            ref={register({ required: true })}
                          />
                          <label htmlFor=""> First Name </label>
                          {errors.firstName &&
                            errors.firstName.type === "required" && (
                              <div className="error-line">
                                Please enter your first name
                              </div>
                            )}
                        </div>
                      </li>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="text"
                            name="lastName"
                            id=""
                            ref={register({ required: true })}
                            className={watch("lastName") ? "active" : ""}
                          />
                          <label htmlFor=""> Last Name </label>
                          {errors.lastName &&
                            errors.lastName.type === "required" && (
                              <div className="error-line">
                                Please enter your last name
                              </div>
                            )}
                        </div>
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
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="password"
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
                      <li className="checks small-box">
                        <div className="form-group checkbox signup">
                          {/* <p>All field is required</p> */}
                          <input
                            type="checkbox"
                            name="conditions"
                            id="conditions"
                            ref={register({ required: true })}
                          />
                          <label htmlFor="conditions">
                            By signing up you're agreeing with our{" "}
                            <a
                              className="hover-text"
                              href="https://www.zerotocareer.com/terms-of-service"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                              className="hover-text"
                              rel="noopener noreferrer"
                              target="_blank"
                              href="https://www.zerotocareer.com/privacy-policy"
                            >
                              Privacy policy
                            </a>
                            .
                          </label>
                          {errors.conditions && (
                            <div className="error-line">
                              Please agree to our terms of service and privacy
                              policy
                            </div>
                          )}
                        </div>
                      </li>
                      {signupError && <div className="err">{signupError}</div>}
                      <li className="form-group small-box">
                        <div>
                          <button type="submit" className={"btn"}>
                            <abbr>Sign Up</abbr>
                          </button>
                        </div>

                        <div className="alreadyAccount">
                          Already have account?{" "}
                          <Link to="/login" className="hover-text">
                            Login
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </form>
                </div>
                {/* <div className="dividers">
                  <span>or</span>
                </div>
                <div className="social-login">
                  <p>quick login with</p>
                  <ul>
                    <li>
                      <a href="">
                        <img src={socialGoogleImg} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src={socialLinkedImg} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src={socialFbImg} alt="" />
                      </a>
                    </li>
                    <li>
                      <a href="">
                        <img src={socialGitImg} alt="" />
                      </a>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default Signup
