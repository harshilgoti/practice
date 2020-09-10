import React from "react"
import VersionControlHeading from "./VersionControlHeading"
import VersionControlDetails from "./VersionControlDetails"
import DevEnvLayout from "components/DevEnvLayout"

function VersionControl(props) {
  return (
    <>
      <DevEnvLayout>
        <section className="tab-panel versioncontrol">
          <div className="w-full">
            <VersionControlHeading />
            <VersionControlDetails />
          </div>
        </section>
      </DevEnvLayout>
    </>
  )
}

export default VersionControl
