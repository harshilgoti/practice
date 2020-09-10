import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import DashboardLayout from "components/Dashboard/Layout"
import ChangePasswordPopup from "components/Dashboard/ChangePasswordPopup"

function UserAccount() {
  const { userDetails } = useSelector(({ user }) => user)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState(
    false
  )

  useEffect(() => {
    if (Object.keys(userDetails)) {
      setFirstName(userDetails.first_name)
      setEmail(userDetails.email)

      setLastName(userDetails.last_name)
      setPassword("********")
    }
  }, [userDetails]) // eslint-disable-line

  const handleShowChangePasswordPopup = () => {
    setIsShowChangePasswordPopup(true)
  }
  const handleCloseChangePasswordPopup = () => {
    setIsShowChangePasswordPopup(false)
  }
  return (
    <>
      <DashboardLayout>
        <section className="w-full account-main space">
          <div className="container">
            <h2 className="h3">Your Account</h2>

            <div className="profileDetails">
              <form action="">
                <div className="form-row two-col">
                  <div>
                    <ul>
                      <div
                        className="name-main-flex"
                        // style={{
                        //   display: "flex",
                        //   justifyContent: "space-between"
                        // }}
                      >
                        <li>
                          <div className="form-group">
                            <input
                              disabled={true}
                              type="text"
                              name="firstName"
                              value={firstName}
                              className={firstName ? "active" : ""}
                              id=""
                            />
                            <label htmlFor="">First Name </label>
                          </div>
                        </li>
                        <li>
                          <div className="form-group">
                            <input
                              disabled={true}
                              type="text"
                              name="lastName"
                              value={lastName}
                              className={lastName ? "active" : ""}
                              id=""
                            />
                            <label htmlFor=""> Last name </label>
                          </div>
                        </li>
                      </div>

                      <li>
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            value={email}
                            disabled={true}
                            className={email ? "active" : ""}
                            id=""
                          />
                          <label htmlFor=""> Email </label>
                        </div>
                      </li>
                      <div className="password-main-flex">
                        <li>
                          <div className="form-group">
                            <input
                              type="text"
                              disabled={true}
                              name="password"
                              value={password}
                              //disabled={true}
                              className={password ? "active" : ""}
                              id=""
                            />
                            <label htmlFor=""> Password </label>
                          </div>
                        </li>
                        <li>
                          <div
                            className="hover-text text-16 "
                            onClick={handleShowChangePasswordPopup}
                          >
                            Change Password
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {isShowChangePasswordPopup && (
            <ChangePasswordPopup
              isShowChangePasswordPopup={isShowChangePasswordPopup}
              closed={handleCloseChangePasswordPopup}
            />
          )}
        </section>
      </DashboardLayout>
    </>
  )
}

export default UserAccount
