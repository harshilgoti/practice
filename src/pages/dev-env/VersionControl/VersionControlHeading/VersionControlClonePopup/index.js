import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { enqueueSnackbar } from "redux/action"

function VersionControlClonePopup(props) {
  const dispatch = useDispatch()

  const [isCopied, setIsCopied] = useState(false)
  const git_repo_url = useSelector(
    ({ product: { productDetailsById } }) =>
      productDetailsById && productDetailsById.git_repo_url
  )

  const handleCopyUrl = url => {
    setIsCopied(true)
    // props.componentVisible(false)
    dispatch(
      enqueueSnackbar({
        message: `Link copied successfully`,
        options: {
          key: new Date().getTime() + Math.random(),
          variant: "success"
        }
      })
    )
  }
  return (
    <>
      {/* <!-- NOTE : Add "active" className on click to parent div which is "clonepopup" --> */}
      <div
        className={
          props.isComponentVisible
            ? "clonepopup popup-shadow01 active"
            : "clonepopup popup-shadow01"
        }
      >
        <div className="clonebtnhead text-20 font-semibold">
          Clone With HTTPS
        </div>
        <div className="cloneinput">
          <input type="text" placeholder={git_repo_url} className="text-12" />
          <CopyToClipboard
            text={git_repo_url}
            onCopy={git_repo_url => handleCopyUrl(git_repo_url)}
          >
            <button className="copylink">
              {isCopied ? "Copied" : "Copy Link"}
            </button>
          </CopyToClipboard>
        </div>
        <p className="para text-body">
          Please use same Zero To Careeer credentials for git operations.
        </p>
      </div>
    </>
  )
}
export default VersionControlClonePopup
