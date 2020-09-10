import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector, useDispatch } from "react-redux"
import closeImage from "assets/images/all-new-svg-icons/close.svg"
import {
  changePassword,
  enqueueSnackbar,
  updateUserProfile
} from "redux/action"
import { passwordConditionList } from "config/const"

function ChangePasswordPopup(props) {
  // let { id } = useParams()
  const { isOldUser } = props
  const { register, handleSubmit, watch, errors } = useForm()
  const dispatch = useDispatch()
  const [isShowCloseIcon, setIsShowCloseIcon] = useState(false)
  const { changePasswordLoading, changePasswordError } = useSelector(
    ({ auth }) => auth
  )
  const userDetails = useSelector(({ user }) => user.userDetails)
  const handleUpdateProfileSuccess = () => {
    dispatch(
      enqueueSnackbar({
        message: `Thank you! Your account details have been successfully updated.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success",
          autoHideDuration: 1000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      })
    )
  }
  useEffect(() => {
    if (!isOldUser) {
      setIsShowCloseIcon(true)
    }
  }, [dispatch, isOldUser])

  function handleChangePasswordSuccess() {
    setIsShowCloseIcon(true)

    const body = {
      is_old_user: false
    }

    if (isOldUser) {
      dispatch(updateUserProfile(body, handleUpdateProfileSuccess))
    } else {
      props.closed()
      dispatch(
        enqueueSnackbar({
          message: `Your password has been successfully changed. You'll be logged out.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            autoHideDuration: 1000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )
    }

    // props.history.push(`/thankyou`)
  }

  const handleSubmitResetPassword = data => {
    if (
      errors &&
      watch("confirmPassword") &&
      watch("password") &&
      watch("confirmPassword") !== watch("password")
    ) {
      if (isOldUser) {
        dispatch(
          enqueueSnackbar({
            message: `Please make sure your passwords match`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "warning",
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center"
              }
            }
          })
        )
      } else {
        dispatch(
          enqueueSnackbar({
            message: `Your passwords don't match`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "warning",
              autoHideDuration: 2000,
              anchorOrigin: {
                vertical: "top",
                horizontal: "center"
              }
            }
          })
        )
      }
    } else if (errors.password && errors.password.type === "pattern") {
      handleShowPasswordRulesNotifications()
    } else {
      if (isOldUser) {
        const body = {
          new_password: data.password
        }
        dispatch(changePassword(body, handleChangePasswordSuccess))
      } else {
        const body = {
          old_password: data.oldPassword,
          new_password: data.password
        }
        dispatch(
          changePassword(
            body,
            handleChangePasswordSuccess,
            handleShowWrongPasswordNotifications
          )
        )
      }
    }
  }
  function handleCloseProductBacklogPopup() {
    props.closed()
  }
  const handleShowWrongPasswordNotifications = () => {
    dispatch(
      enqueueSnackbar({
        message: `The password you entered does not the match the one we have on file.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      })
    )
  }
  const handleShowPasswordRulesNotifications = () => {
    dispatch(
      enqueueSnackbar({
        message: `Your password must not match your old password, be at least 8 characters long, contain at least one Uppercase leter, one lowercase letter, one number, and one special character ~! @#$%^&*()_-+={[}]|:;"'<,>.?/.`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "warning",
          autoHideDuration: 2000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }
      })
    )
  }
  return (
    <>
      <section className="dialog-container explorePopMain">
        {/* <Scrollbars
         
        > */}
        <div
          className="dialog-box-product-backlog"
          id="style-dailog"
          style={{ maxWidth: "750px", overflowY: "auto" }}
        >
          {isShowCloseIcon && (
            <span className="close-icon">
              <img
                src={closeImage}
                alt=""
                onClick={handleCloseProductBacklogPopup}
              />
            </span>
          )}

          <div
            className="dialog-content"
            style={{ paddingBottom: "50px", overflow: "unset" }}
          >
            {isOldUser ? (
              <>
                <h2 className="text-28 text-primary-color">
                  Welcome back, {userDetails && userDetails.first_name}
                </h2>
                <div
                  style={{
                    margin: "18px 0px",
                    color: "#000000",
                    fontSize: "20px",
                    lineHeight: "24px"
                  }}
                >
                  We've moved to a new system. To help us keep your account
                  secure, please review your account details and reset your
                  password.
                </div>
                <div
                  style={{
                    margin: "18px 0px",
                    color: "#000000",
                    fontSize: "20px",
                    lineHeight: "24px"
                  }}
                >
                  We apologize for the inconvenience.
                </div>
                <div className="forms">
                  <ul>
                    <li className="small-box" style={{ marginBottom: "20px" }}>
                      <div className="form-group">
                        <input
                          style={{ opacity: "0.7", borderColor: "#e1e1e1" }}
                          type="email"
                          id="email"
                          name="email"
                          className="active"
                          // className={
                          //   userDetails && userDetails.email ? "active" : ""
                          // }
                          value={userDetails && userDetails.email}
                          disabled={true}
                        />
                        <label htmlFor="" style={{ color: "#404040" }}>
                          Email{" "}
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

                <div style={{ paddingBottom: "50px" }}>
                  <div>
                    <h2 className="text-16 text-primary-color">
                      Your password must
                    </h2>
                  </div>
                  <div className="password-condition-main">
                    <ul>
                      {passwordConditionList.map((condition, i) => {
                        return <li key={i}>{condition}</li>
                      })}
                    </ul>
                  </div>
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
                              ref={register({
                                required: true,
                                pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
                              })}
                            />
                            <label htmlFor="">New Password </label>
                            {errors.password &&
                              errors.password.type === "required" && (
                                <div className="error-line">
                                  Please enter new password
                                </div>
                              )}
                            {/* {errors.password &&
                              errors.password.type === "minLength" && (
                                <div className="error-line">
                                  Password length should be 8 or more
                                </div>
                              )} */}

                            {errors.password &&
                              errors.password.type === "pattern" && (
                                <div className="error-line">
                                  Password must follow rules.
                                </div>
                              )}
                            {/* {errors.password &&
                              errors.password.type === "pattern" &&
                              handleShowPasswordRulesNotifications()} */}
                          </div>
                        </li>
                        <li className="small-box">
                          <div className="form-group">
                            <input
                              type="password"
                              name="confirmPassword"
                              id="confirmPassword"
                              ref={register({ required: true })}
                              className={
                                watch("confirmPassword") ? "active" : ""
                              }
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
                              watch("confirmPassword") !==
                                watch("password") && (
                                <div className="error-line">
                                  Please make sure the passwords match
                                </div>
                              )}
                          </div>
                        </li>
                        {changePasswordError && (
                          <div className="text-error-message">
                            {changePasswordError}
                          </div>
                        )}

                        <li className="form-group">
                          {changePasswordLoading ? (
                            <div>
                              <button className="btn">
                                <abbr>Set new password</abbr>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button type="submit" className="btn">
                                <abbr>Set new password</abbr>
                              </button>
                            </div>
                          )}
                        </li>
                      </ul>
                    </form>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h2
                  className="h2"
                  style={{ color: "#008afc", margin: "0px 0px 24px" }}
                >
                  {/* It's been long time,Welcome back to ZeroToCareer */}
                  Set new Password
                </h2>
                <div className="forms">
                  <form onSubmit={handleSubmit(handleSubmitResetPassword)}>
                    <ul>
                      <li className="small-box">
                        <div className="form-group">
                          <input
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            className={watch("oldPassword") ? "active" : ""}
                            ref={register({ required: true, minLength: 8 })}
                          />
                          <label htmlFor="">Old Password </label>
                          {errors.oldPassword &&
                            errors.oldPassword.type === "required" && (
                              <div className="error-line">
                                Please enter old password
                              </div>
                            )}
                          {errors.oldPassword &&
                            errors.oldPassword.type === "minLength" && (
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
                            id="password"
                            name="password"
                            className={watch("password") ? "active" : ""}
                            ref={register({
                              required: true,

                              pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/
                            })}
                          />
                          <label htmlFor="">New Password </label>
                          {errors.password &&
                            errors.password.type === "required" && (
                              <div className="error-line">
                                Please enter new password
                              </div>
                            )}

                          {errors.password &&
                            errors.password.type === "pattern" && (
                              <div className="error-line">
                                Password must follow rules.
                              </div>
                            )}

                          {errors.password &&
                            errors.password.type === "pattern" &&
                            handleShowPasswordRulesNotifications()}
                          {/* {errors.password &&
                            errors.password.type === "minLength" && (
                              <div className="error-line">
                                Password length should be 8 or more
                              </div>
                            )} */}
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
                      {changePasswordError && (
                        <div className="text-error-message">
                          {changePasswordError}
                        </div>
                      )}
                      {/* {changePasswordError &&
                        handleShowWrongPasswordNotifications()} */}
                      <li className="form-group">
                        {changePasswordLoading ? (
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
              </>
            )}
          </div>
        </div>
        {/* </Scrollbars> */}
      </section>
    </>
  )
}

export default ChangePasswordPopup
