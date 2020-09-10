import React, { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import DashboardLayout from "components/Dashboard/Layout"
import CameraIcon from "assets/images/camera.png"
import axios from "config/axios"
import { enqueueSnackbar } from "redux/action"
import { profileTipsList } from "config/const"
import {
  updateUserProfile,
  craeteExtraField,
  getUserDetails
} from "redux/action/index"

function UpdateProfile() {
  const dispatch = useDispatch()
  const inputFileRef = useRef(null)
  const {
    userDetails,
    updateUserProfileError,
    userCreateExtraFieldError
    // updateUserProfileLoading
  } = useSelector(({ user }) => user)

  //text field value

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const [isImageUploadLoading, setImageUploadLoading] = useState(false)
  const [email, setEmail] = useState("")

  const [locationCity, setLocationCity] = useState("")
  const [locationState, setLocationState] = useState("")

  const [locationStreet, setLocationStreet] = useState("")

  const [locationZip, setLocationZip] = useState("")

  const [primaryCellPhoneNumber, setPrimaryCellPhoneNumber] = useState("")
  const [secondaryCellPhoneNumber, setSecondaryCellPhoneNumber] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [linkedInProfile, setLinkedInProfile] = useState("")
  const [personalWebsite, setPersonalWebsite] = useState("")
  const [heading, setHeading] = useState("")
  const [headingBody, setHeadingBody] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [imageFileURL, setImageFileURL] = useState()
  const [isDisabled, setIsDisabled] = useState(false)
  // text field error
  const [isShowError, setIsShowError] = useState(false)
  //user extra text field error
  const [isShowUserExtraFieldError, setShowUserExtraFieldError] = useState(
    false
  )

  useEffect(() => {
    if (Object.keys(userDetails)) {
      setFirstName(userDetails.first_name)
      setLastName(userDetails.last_name)

      setEmail(userDetails.email)
      setLocationCity(
        (userDetails.address &&
          userDetails.address.city &&
          userDetails.address.city) ||
          ""
      )
      setLocationState(
        (userDetails.address &&
          userDetails.address.state &&
          userDetails.address.state) ||
          ""
      )
      setLocationStreet(
        (userDetails.address &&
          userDetails.address.street &&
          userDetails.address.street) ||
          ""
      )
      setLocationZip(
        (userDetails.address &&
          userDetails.address.zip &&
          userDetails.address.zip) ||
          ""
      )
      setPrimaryCellPhoneNumber(userDetails.primary_phone)
      setSecondaryCellPhoneNumber(userDetails.secondary_phone)
      setTitle(userDetails.profile_title)
      setDescription(userDetails.profile_description)
      setLinkedInProfile(userDetails.linkedIn_url)
      setPersonalWebsite(userDetails.personal_website)
      setProfileImage(userDetails.avatar_image_url)
    }
  }, [userDetails]) // eslint-disable-line

  const handleChangeFirstName = event => {
    setFirstName(event.target.value)
  }

  const handleChangeLastName = event => {
    setLastName(event.target.value)
  }
  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }
  const handleChangeLocationCity = event => {
    setLocationCity(event.target.value)
  }
  const handleChangeLocationState = event => {
    setLocationState(event.target.value)
  }
  const handleChangeLocationStreet = event => {
    setLocationStreet(event.target.value)
  }
  const handleChangeLocationZip = event => {
    setLocationZip(event.target.value)
  }

  const handleChangePrimaryCellPhoneNumber = event => {
    setPrimaryCellPhoneNumber(event.target.value)
  }
  const handleChangeSecondaryCellPhoneNumber = event => {
    setSecondaryCellPhoneNumber(event.target.value)
  }
  const handleChangeTitle = event => {
    setTitle(event.target.value)
  }
  const handleChangeDescription = event => {
    setDescription(event.target.value)
  }
  const handleChangeLinkedInProfile = event => {
    setLinkedInProfile(event.target.value)
  }
  const handleChangePersonalWebsite = event => {
    setPersonalWebsite(event.target.value)
  }

  const handleChangeHeading = event => {
    setHeading(event.target.value)
  }
  const handleChangeBody = event => {
    setHeadingBody(event.target.value)
  }

  const handleEditUserProfile = e => {
    e.preventDefault()
    setIsDisabled(false)
  }

  // const handleDisabledUserProfile = () => {
  //   setIsDisabled(true)
  // }
  function userCreateExtraFieldSuccessCallBack() {
    setHeading("")
    setHeadingBody("")
    dispatch(getUserDetails())
  }

  function handleChangeImage(e) {
    e.preventDefault()

    let file = e.target.files[0]

    if (file) {
      setImageUploadLoading(true)
      const reader = new FileReader()

      reader.onload = () => {
        setImageFileURL(reader.result)
      }
      reader.readAsDataURL(file)

      let fileNameArray = file.name.split(".")
      let fileType = fileNameArray[fileNameArray.length - 1]

      var formData = new FormData()
      formData.append("file", file)
      formData.append("key", "user")
      formData.append("type", fileType)
      axios
        .post(`/upload`, formData)
        .then(res => {
          setProfileImage(res.data.data.url)
          setImageUploadLoading(false)
          // dispatch(
          //   enqueueSnackbar({
          //     message: `Looking good! Your profile picture has been updated`,
          //     options: {
          //       key: new Date().getTime() + Math.random(),
          //       variant: "success",
          //       autoHideDuration: 1000,
          //       anchorOrigin: {
          //         vertical: "top",
          //         horizontal: "center"
          //       }
          //     }
          //   })
          // )
        })
        .catch(error => {})
    }
  }

  const handleAddUserExtraField = e => {
    e.preventDefault()
    if (heading && headingBody) {
      const body = {
        heading: heading,
        body: headingBody,
        index: userDetails.extra_fields.length
      }
      setShowUserExtraFieldError(false)
      dispatch(craeteExtraField(body, userCreateExtraFieldSuccessCallBack))
    } else {
      setShowUserExtraFieldError(true)
    }
  }
  function updateUserProfileSuccess() {
    dispatch(
      enqueueSnackbar({
        message: `Your profile has been updated`,
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
  const handleSubmitForm = e => {
    e.preventDefault()
    if (firstName) {
      const body = {
        first_name: firstName,
        ...(userDetails.address !==
          {
            city: locationCity,
            state: locationState,
            street: locationStreet,
            zip: locationZip
          } && {
          address: {
            city: locationCity,
            state: locationState,
            street: locationStreet,
            zip: locationZip
          }
        }),
        ...(userDetails.linkedIn_url !== linkedInProfile && {
          linkedIn_url: linkedInProfile
        }),
        ...(userDetails.primary_phone !== primaryCellPhoneNumber && {
          primary_phone: primaryCellPhoneNumber
        }),
        ...(userDetails.avatar_image_url !== profileImage && {
          avatar_image_url: profileImage
        }),
        ...(userDetails.secondary_phone !== secondaryCellPhoneNumber && {
          secondary_phone: secondaryCellPhoneNumber
        }),
        ...(userDetails.personal_website !== personalWebsite && {
          personal_website: personalWebsite
        }),
        ...(userDetails.profile_title !== title && { profile_title: title }),
        ...(userDetails.profile_description !== description && {
          profile_description: description
        })
      }
      setIsShowError(false)
      dispatch(updateUserProfile(body, updateUserProfileSuccess))
    } else {
      setIsShowError(true)
    }
  }
  const handleInputIconClick = () => {
    /*Collecting node-element and performing click*/
    inputFileRef.current.click()
  }
  return (
    <>
      <DashboardLayout>
        <section className="w-full profileMain space">
          <div className="container">
            <div className="profileMain-title-main">
              {" "}
              <div>
                <h2 className="h3 text-primary-color">
                  Your Profile
                  {/* Fill out the details to help us keep your profile up to date */}
                </h2>
                <span className="text-18">
                  Please save your edits before leaving the page
                </span>
              </div>
              {isDisabled ? (
                <button
                  className="btn bg-white"
                  onClick={e => handleEditUserProfile(e)}
                >
                  <abbr>Edit</abbr>
                </button>
              ) : (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <button className="btn bg-white" onClick={handleSubmitForm}>
                    <abbr>Save</abbr>
                  </button>
                  {/* <button
                    className="btn bg-white"
                    onClick={handleDisabledUserProfile}
                    style={{ marginLeft: "24px" }}
                  >
                    <abbr>Cancel</abbr>
                  </button> */}
                </div>
              )}
            </div>

            {/* <h5 className="h4">Dont worry you can make it changes anytime</h5> */}
            <div className="profileDetails">
              <form action="">
                <div className="profile-picture-box-main">
                  <div className="avatar-box">
                    <div className="avatar-div">
                      <img
                        className="avatar"
                        src={
                          imageFileURL ||
                          profileImage ||
                          "https://user-code-zerotocareer-dev.s3.us-east-2.amazonaws.com/user/png/user-icon.png"
                        }
                        alt="avatar"
                      />
                      {isImageUploadLoading && (
                        <div className="spinning-loader"></div>
                      )}
                    </div>

                    <div
                      className={
                        isImageUploadLoading
                          ? "upload-image-icon disable"
                          : "upload-image-icon "
                      }
                    >
                      {isDisabled ? (
                        ""
                      ) : (
                        <>
                          <img
                            src={CameraIcon}
                            alt="edit"
                            onClick={handleInputIconClick}
                            className=""
                          />
                          <input
                            ref={inputFileRef}
                            id="myInput"
                            style={{ display: "none" }}
                            type="file"
                            onChange={handleChangeImage}
                            accept="image/*"
                          />{" "}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="avatar-tips">
                    <h3 className="tips-heading h2 ">
                      Some tips for your profile picture:
                    </h3>
                    <ul>
                      {profileTipsList.map((tip, i) => {
                        return <li key={i}>{tip}</li>
                      })}
                    </ul>
                  </div>
                </div>

                <div className="form-row two-col">
                  <div>
                    <ul>
                      <div>
                        <h3 className="first-thing-heading h2 ">
                          First things first
                        </h3>
                        <div className="first-thing-main-flex">
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="firstName"
                                value={firstName}
                                className={firstName ? "active" : ""}
                                id=""
                                onChange={handleChangeFirstName}
                                disabled={isDisabled}
                              />
                              <label htmlFor="">First Name </label>
                              {isShowError && !firstName && (
                                <div className="error-line">
                                  Please enter name
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="lastName"
                                value={lastName}
                                className={lastName ? "active" : ""}
                                id=""
                                onChange={handleChangeLastName}
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Last Name </label>
                              {isShowError && !lastName && (
                                <div className="error-line">
                                  Please enter name
                                </div>
                              )}
                            </div>
                          </li>
                        </div>
                        <div className="first-thing-main-flex">
                          <li>
                            <div className="form-group">
                              <input
                                type="email"
                                name="email"
                                value={email}
                                disabled={true}
                                className={email ? "active" : ""}
                                id=""
                                onChange={handleChangeEmail}
                                style={{ opacity: "0.5" }}
                              />
                              <label htmlFor=""> Email </label>
                              {/* {isShowError && !email && (
                            <div className="error-line">Please enter your email address</div>
                          )} */}
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="title"
                                value={title}
                                className={title ? "active" : ""}
                                onChange={handleChangeTitle}
                                id=""
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Current Title (if any)</label>
                            </div>
                          </li>
                        </div>
                      </div>
                      <div>
                        <h3 className="second-heading h2 ">In a nutshell</h3>
                        <div>
                          <li>
                            <div className="form-group">
                              <textarea
                                name="description"
                                value={description}
                                className={description ? "active" : ""}
                                onChange={handleChangeDescription}
                                id=""
                                cols="30"
                                rows="10"
                                disabled={isDisabled}
                              />
                              <label htmlFor="">
                                Describe yourself professionally ,in a tweet
                              </label>
                            </div>
                          </li>
                        </div>
                      </div>
                      <div>
                        <div className="second-heading text-16">
                          Your online profiles (if any)
                        </div>
                        <div className="nutshell-main-flex">
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="linkedInProfile"
                                value={linkedInProfile}
                                className={linkedInProfile ? "active" : ""}
                                onChange={handleChangeLinkedInProfile}
                                id=""
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Linkedin</label>
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="linkedInProfile"
                                value={linkedInProfile}
                                className={linkedInProfile ? "active" : ""}
                                onChange={handleChangeLinkedInProfile}
                                id=""
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Facebook</label>
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="linkedInProfile"
                                value={linkedInProfile}
                                className={linkedInProfile ? "active" : ""}
                                onChange={handleChangeLinkedInProfile}
                                id=""
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Twiiter</label>
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="personalWebsite"
                                value={personalWebsite}
                                className={personalWebsite ? "active" : ""}
                                onChange={handleChangePersonalWebsite}
                                id=""
                                disabled={isDisabled}
                              />
                              <label htmlFor="">Personal website</label>
                            </div>
                          </li>
                        </div>
                      </div>
                      <div>
                        <h3 className="contact-heading h2 ">Contact</h3>
                        <div className="w-full">
                          <div>
                            <li>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="locationStreet"
                                  value={locationStreet}
                                  //disabled={true}
                                  className={locationStreet ? "active" : ""}
                                  id=""
                                  onChange={handleChangeLocationStreet}
                                  disabled={isDisabled}
                                />
                                <label htmlFor="">
                                  {" "}
                                  Street Address Line 1{" "}
                                </label>
                              </div>
                            </li>
                            <li>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="locationStreet"
                                  value={locationStreet}
                                  //disabled={true}
                                  className={locationStreet ? "active" : ""}
                                  id=""
                                  onChange={handleChangeLocationStreet}
                                  disabled={isDisabled}
                                />
                                <label htmlFor="">
                                  {" "}
                                  Street Address Line 2{" "}
                                </label>
                              </div>
                            </li>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="locationCity"
                                    value={locationCity}
                                    //disabled={true}
                                    className={locationCity ? "active" : ""}
                                    id=""
                                    onChange={handleChangeLocationCity}
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor=""> City </label>
                                </div>
                              </li>
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="locationState"
                                    value={locationState}
                                    //disabled={true}
                                    className={locationState ? "active" : ""}
                                    id=""
                                    onChange={handleChangeLocationState}
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor=""> State </label>
                                </div>
                              </li>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="locationZip"
                                    value={locationZip}
                                    //disabled={true}
                                    className={locationZip ? "active" : ""}
                                    id=""
                                    onChange={handleChangeLocationZip}
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor=""> Zip </label>
                                </div>
                              </li>
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="locationState"
                                    value={locationState}
                                    //disabled={true}
                                    className={locationState ? "active" : ""}
                                    id=""
                                    onChange={handleChangeLocationState}
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor=""> Country </label>
                                </div>
                              </li>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="primaryCellPhoneNumber"
                                    value={primaryCellPhoneNumber}
                                    className={
                                      primaryCellPhoneNumber ? "active" : ""
                                    }
                                    onChange={
                                      handleChangePrimaryCellPhoneNumber
                                    }
                                    id=""
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor=""> Primary cell phone </label>
                                </div>
                              </li>
                              <li style={{ width: "47%" }}>
                                <div className="form-group">
                                  <input
                                    type="text"
                                    name="secondaryCellPhoneNumber"
                                    value={secondaryCellPhoneNumber}
                                    className={
                                      secondaryCellPhoneNumber ? "active" : ""
                                    }
                                    onChange={
                                      handleChangeSecondaryCellPhoneNumber
                                    }
                                    id=""
                                    disabled={isDisabled}
                                  />
                                  <label htmlFor="">
                                    {" "}
                                    Secondary cell phone{" "}
                                  </label>
                                </div>
                              </li>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="second-heading h2 ">
                          The Nitty-Gritties
                        </h3>
                        <div className="copy-head">
                          The following section is very similar to what you
                          would fill out in the 'past experience' or
                          'achievements' section of your resume.{" "}
                        </div>
                        <div>
                          <li>
                            <div className="form-group">
                              <input
                                type="text"
                                name="heading"
                                value={heading}
                                className={heading ? "active" : ""}
                                onChange={handleChangeHeading}
                                id=""
                              />
                              <label htmlFor="">Heading</label>
                              {isShowUserExtraFieldError && !heading && (
                                <div className="error-line">
                                  Please enter heading
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <textarea
                                name="headingBody"
                                value={headingBody}
                                className={headingBody ? "active" : ""}
                                onChange={handleChangeBody}
                                id=""
                                cols="30"
                                rows="10"
                              />
                              <label htmlFor="">Body</label>
                              {isShowUserExtraFieldError && !headingBody && (
                                <div className="error-line">
                                  Please enter Body
                                </div>
                              )}
                            </div>
                          </li>
                          <li>
                            <div className="form-group">
                              <div
                                className="add-section"
                                onClick={handleAddUserExtraField}
                              >
                                Add Section
                              </div>
                            </div>
                          </li>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>

                <div className="form-row one-col">
                  <ul>
                    <li>
                      {userDetails &&
                        userDetails.extra_fields &&
                        userDetails.extra_fields.length > 0 &&
                        userDetails.extra_fields.map((user, i) => {
                          return (
                            <li key={i}>
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="location"
                                  value={user.body}
                                  //disabled={true}
                                  className={user.body ? "active" : ""}
                                  id=""
                                  //onChange={handleChangeLocation}
                                />
                                <label htmlFor=""> {user.heading} </label>
                              </div>
                            </li>
                          )
                        })}
                      <p />
                    </li>
                    {userCreateExtraFieldError && (
                      <div className="error-line">
                        {userCreateExtraFieldError}
                      </div>
                    )}

                    {updateUserProfileError && (
                      <div className="err">{updateUserProfileError}</div>
                    )}

                    {/* <li>
                      {!isDisabled ? (
                        updateUserProfileLoading ? (
                          <button className="btn bg-white">
                            <abbr>Save</abbr>
                          </button>
                        ) : (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <button
                              className="btn bg-white"
                              onClick={handleSubmitForm}
                            >
                              <abbr>Save</abbr>
                            </button>
                            <button
                              className="btn bg-white"
                              onClick={handleDisabledUserProfile}
                              style={{ marginLeft: "24px" }}
                            >
                              <abbr>Cancel</abbr>
                            </button>
                          </div>
                        )
                      ) : null}
                    </li> */}
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </section>
      </DashboardLayout>
    </>
  )
}

export default UpdateProfile
