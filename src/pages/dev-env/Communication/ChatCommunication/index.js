import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import CommunicationLayout from "../CommunicationLayout"
import ChatDetails from "./ChatDetails"
import ChatList from "./ChatList"
import GroupChatFeature from "./GroupFeature"

import { getChatUserList } from "redux/action"

function CommunicationPage(props) {
  const [isShowDirectChat, setIsShowDirectChat] = useState(true)
  const dispatch = useDispatch()
  let { upr_id } = useParams()

  useEffect(() => {
    dispatch(getChatUserList(upr_id))
  }, [upr_id])

  const handleShowDirectChat = () => {
    setIsShowDirectChat(true)
  }
  const handleShowGroupChat = () => {
    setIsShowDirectChat(false)
  }
  return (
    <>
      <CommunicationLayout>
        <div className="communication-right">
          <div className="chat-wrapper flex active">
            <ChatList
              showDirectChatClicked={handleShowDirectChat}
              showGroupChatClicked={handleShowGroupChat}
              isShowDirectChat={isShowDirectChat}
            />
            {isShowDirectChat ? <ChatDetails /> : <GroupChatFeature />}
          </div>
        </div>
      </CommunicationLayout>
    </>
  )
}

export default CommunicationPage
