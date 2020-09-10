import React from "react"

import DashboardLayout from "components/Dashboard/Layout"
import Chatbot from "components/Chatbot"
import TabList from "components/TabList"
import ProdcutInfo from "components/ProdcutInfo"

function DevEnvLayout(props) {
  return (
    <>
      <DashboardLayout>
        <Chatbot />
        <section className="w-full main-tab-wrap">
          <div className="container fluid">
            <ProdcutInfo />

            <TabList />
          </div>
        </section>
        {props.children}
      </DashboardLayout>
    </>
  )
}

export default DevEnvLayout
