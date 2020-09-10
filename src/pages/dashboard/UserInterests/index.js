import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { withRouter } from "react-router"
import { useHistory } from "react-router-dom"
import { enqueueSnackbar } from "redux/action"

import Loader from "components/Loader"
import { updateUserProfile } from "redux/action"

function InterestPopup(props) {
  const dispatch = useDispatch()
  let history = useHistory()
  const [selectedLangList, setSelectedLangList] = useState([])
  const [isShowError, setIsShowError] = useState(false)
  const [isShowSelectError, setIsShowSelectError] = useState(false)
  const updateUserProfileLoading = useSelector(
    ({ user }) => user.updateUserProfileLoading
  )

  // const handleCloseInterestPopup = () => {
  //   props.close()
  // }
  const { languagesList, fetchLanguageListLoading } = useSelector(
    ({ common }) => common
  )

  const sortedLanguagesList = languagesList.sort((a, b) => {
    let fa = a.index,
      fb = b.index

    if (fa < fb) {
      return -1
    }
    if (fa > fb) {
      return 1
    }
    return 0
  })
  const userDetails = useSelector(({ user }) => user.userDetails)

  useEffect(() => {
    userDetails &&
      userDetails.interested_languages.length &&
      setSelectedLangList(
        userDetails.interested_languages.map(lan => lan._id) || []
      )
  }, [userDetails])

  const handleUpdateUserProfile = () => {
    if (selectedLangList.length === 0) {
      setIsShowSelectError(true)

      props.interestUpdate === "update" &&
        dispatch(
          enqueueSnackbar({
            message: `Please select at least one technology you're interested in`,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "warning",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center"
              }
            }
          })
        )
    } else {
      const body = {
        interested_languages: selectedLangList
      }

      dispatch(updateUserProfile(body, handleRedirectToJobList))
    }
  }

  const handleRedirectToJobList = () => {
    props.interestUpdate === "next" && history.push("/companies-and-role-list")

    props.interestUpdate === "update" &&
      dispatch(
        enqueueSnackbar({
          message: `Your interests have been updated`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"
            }
          }
        })
      )

    props.close()
  }
  // const handleOpenSelectUserType = () => {
  //   props.openSelectUserTypePopup()
  // }

  // const handleUpdateLanguages = lang => {
  //   setIsShowSelectError(false)
  //   if (selectedLangList.includes(lang)) {
  //     const filteredLangList = selectedLangList.filter(item => item !== lang)
  //     setIsShowError(false)
  //     setSelectedLangList(filteredLangList)
  //   } else {
  //     if (selectedLangList.length === 5) {
  //       setIsShowError(true)
  //     } else {
  //       setSelectedLangList([...selectedLangList, lang])
  //       setIsShowError(false)
  //     }
  //   }
  // }

  const handleUpdateLanguages = lang => {
    setIsShowSelectError(false)
    if (selectedLangList.includes(lang)) {
      const filteredLangList = selectedLangList.filter(item => item !== lang)
      setIsShowError(false)
      setSelectedLangList(filteredLangList)
    } else {
      setSelectedLangList([...selectedLangList, lang])
      setIsShowError(false)
    }
  }
  return (
    <>
      {/* <!-- pop up start here (important Note) --> */}
      <section className="dialog-container signupThanks">
        <div className="dialog-box">
          <div className="dialog-content no-bottom">
            <div className="popconBox">
              {props.interestUpdate === "next" ? (
                ""
              ) : (
                <h1 className="h3">Update your interests</h1>
              )}
              <div className="text-36 subTitle">
                {props.interestUpdate === "next"
                  ? "Select the technologies you're interested in"
                  : "Please select the technologies you're interested in"}
              </div>

              {/* <h5 className="h4">
                Select upto 5 technologies you are interested in pursuing. We'll
                keep your interest in mind.
              </h5> */}

              <div
                className="includes"
                // style={
                //   props.interestUpdate === "next"
                //     ? { height: "calc(68vh - 36px)", overflow: "auto" }
                //     : { height: "calc(68vh - 170px)", overflow: "auto" }
                // }
              >
                {fetchLanguageListLoading ? (
                  <Loader />
                ) : (
                  <ul>
                    {sortedLanguagesList &&
                      sortedLanguagesList.map(lang => {
                        return (
                          <li
                            key={lang.title}
                            className={
                              selectedLangList.includes(lang._id)
                                ? "active"
                                : ""
                            }
                          >
                            <div
                              className="img-box"
                              onClick={() => handleUpdateLanguages(lang._id)}
                            >
                              {/* <a
                                href={lang.source_url}
                                target="_blank"
                                alt={lang.title}
                                rel="noopener noreferrer"
                              > */}
                              <img src={lang.icon_url} alt={lang.title} />
                              {/* </a> */}
                            </div>
                            <p>{lang.title}</p>
                          </li>
                        )
                      })}
                  </ul>
                )}
              </div>

              {isShowSelectError && (
                <div className="middle-next">
                  <h5 className="error-h4">
                    Please select at least one technology you're interested in
                  </h5>
                </div>
              )}
              {isShowError && (
                <div className="middle-next">
                  <h5 className="error-h4">
                    Please select up to 5 technologies
                  </h5>{" "}
                </div>
              )}
              {props.interestUpdate === "next" && (
                <div className="middle-next">
                  {updateUserProfileLoading ? (
                    <button className="btn">
                      <abbr>Next</abbr>
                    </button>
                  ) : (
                    <button className="btn" onClick={handleUpdateUserProfile}>
                      <abbr>Next</abbr>
                    </button>
                  )}
                </div>
              )}
              {props.interestUpdate === "update" && (
                <div className="middle-next">
                  {updateUserProfileLoading ? (
                    <button className="btn" style={{ marginTop: "36px" }}>
                      <abbr>Update</abbr>
                    </button>
                  ) : (
                    <button
                      className="btn"
                      style={{ marginTop: "36px" }}
                      onClick={handleUpdateUserProfile}
                    >
                      <abbr>Update</abbr>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* close button commented */}
          {props.interestUpdate === "update" ? (
            <div className="close-btn" onClick={props.close}>
              X
            </div>
          ) : (
            ""
          )}
        </div>
      </section>
    </>
  )
}

export default withRouter(InterestPopup)
