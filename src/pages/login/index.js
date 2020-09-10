import React from "react"
// import { useSelector, useDispatch } from "react-redux"
// import { Link, useHistory } from "react-router-dom"
// import { useForm } from "react-hook-form"
import Layout from "components/Layout"
// import signBannerImg from "assets/images/signbanner.jpg"
import MaskedInput from 'react-text-mask'
//with login part  commented
// import socialFb from 'assets/images/social-fb.png'
// import socialLinked from 'assets/images/social-linked.png'
// import socialGoogle from 'assets/images/social-google.png'
// import socialGit from 'assets/images/social-git.png'
// import { login } from "redux/action"
// import { Event } from "config/googleAnalytics"

function Login(props) {
  // let history = useHistory()
  // const dispatch = useDispatch()
  // const { register, handleSubmit, watch, errors } = useForm()

  // const { loginLoading, loginError } = useSelector(({ auth }) => auth)

  // const handleSubmitLoginForm = data => {
  //   if (loginLoading) return

  //   dispatch(login(data, handleLoginSuccess))
  // }

  // function handleLoginSuccess() {
  //   Event("LOGIN", "User logged in successfully", "LOGIN_PAGE")



  //   history.push("/dashboard")
  // }

  // if (localStorage.getItem("user-token")) {
  //   history.push("/dashboard")
  // }

  return (
    <>
      <Layout>
        <MaskedInput
          mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
          className="form-control"
          placeholder="Enter a phone number"
          guide={false}
          id="my-input-id"
          onBlur={() => { }}
          onChange={() => { }}

          style={{ marginTop: "300px" }}
        />
      </Layout>
    </>
  )
}

export default Login
