import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useSnackbar } from "notistack"
import {
  removeSnackbar,
  enqueueSnackbar as enqueueSnackbarAction,
  updateNotificationOnSocket,
  clearCurrentSprint,
  updateTicketStatus,
  updateCurrentSprintStory
} from "redux/action"
import io from "socket.io-client"
import axios from "../../config/axios"
import closeImage from "assets/images/all-new-svg-icons/close.svg"

let socket
let displayed = []

const Notifier = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(
    ({ notification }) => notification.notifications || []
  )

  const { enqueueSnackbar, closeSnackbar } = useSnackbar()

  const storeDisplayed = id => {
    displayed = [...displayed, id]
  }

  const removeDisplayed = id => {
    displayed = [...displayed.filter(key => id !== key)]
  }

  React.useEffect(() => {
    notifications.forEach(
      ({
        key,
        message,
        options = {
          key: new Date().getTime() + Math.random(),
          variant: "success",
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        },
        dismissed = false
      }) => {
        if (dismissed) {
          // dismiss snackbar using notistack
          closeSnackbar(key)
          return
        }

        // do nothing if snackbar is already displayed
        if (displayed.includes(key)) return

        // display snackbar using notistack
        enqueueSnackbar(message, {
          key,
          ...options,
          onClose: (event, reason, myKey) => {
            if (options.onClose) {
              options.onClose(event, reason, myKey)
            }
          },
          onExited: (event, myKey) => {
            // removen this snackbar from redux store
            dispatch(removeSnackbar(myKey))
            removeDisplayed(myKey)
          }
        })

        // keep track of snackbars that we've displayed
        storeDisplayed(key)
      }
    )
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch])

  React.useEffect(() => {
    let pingCount = 0
    // let interval;

    socket = io.connect(process.env.REACT_APP_BACKEND_URL)
    socket.on("connect", () => {
      // if (["local", "development"].includes(process.env.NODE_ENV))

      setInterval(() => {
        //console.log("ping emit >> pingCount >>"+pingCount)
        socket.emit("PING", {})
        pingCount++
      }, 8000)
      axios
        .put(`/update-socket`, {
          socket_id: socket.id
        })
        .then(data => {
          // console.log(data);
        })
        .catch(e => {
          //  console.log(e);
        })
      // console.log("socket", socket)
    })

    socket.on("res", data => {
      dispatch(
        enqueueSnackbarAction({
          message: `${data.msg}.`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
            action: key => (
              <span className="close-icon">
                <img
                  src={closeImage}
                  alt=""
                  onClick={() => closeSnackbar(key)}
                />
              </span>
            )
          }
        })
      )
      if (data.data._doc.type === "TICKET_TEST_FAILS") {
        const { sprint_id, sprint_story_id, sprint_story_ticket_id } = data.data
        const body = {
          status: "backlog"
        }
        dispatch(
          updateTicketStatus(
            sprint_id,
            sprint_story_id,
            sprint_story_ticket_id,
            body
          )
        )
      }

      if (data.data._doc.type === "TICKET_COMPLETE") {
        const {
          sprint_id,
          sprint_story_id,
          sprint_story_ticket_id,
          sprint_completed_prec,
          story_completed_perc
        } = data.data
        const body = {
          status: "done"
        }
        dispatch(
          updateCurrentSprintStory(sprint_completed_prec, story_completed_perc)
        )
        if (sprint_completed_prec === 100) {
          dispatch(
            updateTicketStatus(
              sprint_id,
              sprint_story_id,
              sprint_story_ticket_id,
              body
            )
          )
          dispatch(clearCurrentSprint({}))
        } else {
          dispatch(
            updateTicketStatus(
              sprint_id,
              sprint_story_id,
              sprint_story_ticket_id,
              body
            )
          )
        }
      }

      // clear dashboard current sprint
      if (
        data.data.type === "SPRINT_INCOMPLETE"
        // ||
        // data.data.type === "SPRINT_COMPLETE"
      ) {
        // console.log("data", data)
        dispatch(clearCurrentSprint({}))
      }
      dispatch(updateNotificationOnSocket({ message: data.msg }))
    })

    socket.on("disconnect", () => {
      // console.log("disconnect >> pingCount >>")
    })

    socket.on("PONG", () => {
      pingCount--
      //console.log("pong recive >> pingCount >>" + pingCount);
      if (pingCount >= 3) {
        // if (["local", "development"].includes(process.env.NODE_ENV))
        //console.log("disconnect socket forcefully");
        socket.disconnect()
      }
    })
  }, [])

  return null
}

export default Notifier
