import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import logoImg from "assets/images/logo2.png"
import logoWhiteImg from "assets/images/logo-white.png"

function Header(props) {
  const [isShowInvertHeader, setIsShowInvertHeader] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", handleEventLister)
  }, [])

  const handleEventLister = () => {
    if (window.scrollY > 30) {
      setIsShowInvertHeader(true)
    } else {
      setIsShowInvertHeader(false)
    }
  }

  const isInvertHeader =
    isShowInvertHeader ||
    (typeof window !== "undefined" && window.scrollY > 30) ||
    (typeof window !== "undefined" && window.innerWidth < 600)

  return (
    <>
      <header
        className={
          isInvertHeader ? "w-full header" : "w-full header transperant-header"
        }
      >
        <div className="container">
          <Link to="/">
            <div className="logo">
              <img src={isInvertHeader ? logoWhiteImg : logoImg} alt="" />
            </div>
          </Link>
          {/* <div className="arrows">
            <img src={arrowImg} alt="" />
          </div> */}
        </div>
      </header>
    </>
  )
}

export default Header
