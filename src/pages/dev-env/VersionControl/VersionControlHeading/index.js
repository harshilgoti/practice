import React from "react"
// import { useSelector } from "react-redux"
import VersionControlClonePopup from "./VersionControlClonePopup"
import useComponentVisible from "../../../../components/ComponentVisible"

function VersionControlHeading(props) {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)

  // const git_repo_url = useSelector(
  //   ({ product: { productDetailsById } }) =>
  //     productDetailsById && productDetailsById.git_repo_url
  // )

  return (
    <>
      <div className="versionhead flex" ref={ref}>
        <h2 className="font-medium">Repository Name</h2>
        {/* <!-- NOTE : Add "active" className on click to parent div which is "clonebtn" --> */}
        <div
          className="clonebtn text-center font-semibold text-15"
          onClick={() => setIsComponentVisible(true)}
        >
          Clone
        </div>
        {isComponentVisible && (
          <VersionControlClonePopup
            isComponentVisible={isComponentVisible}
            // componentVisible={(val) => setIsComponentVisible(val)}
          />
        )}
      </div>
    </>
  )
}
export default VersionControlHeading
