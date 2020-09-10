import React, { useRef } from "react"
import Slider from "react-slick"

// import { fadeInRight } from "react-animations"
// import Radium, { StyleRoot } from "radium"
import popup1Image from "assets/images/congratulations.jpg"
import popup2Image from "assets/images/Popups-02.jpg"

function LevelUpSliderPopup(props) {
  let slider = useRef(null)
  //const [slide, setSlideIncrement] = useState(1)

  const handleShowNextSecondSlide = () => {
    // slider.current.slickGoTo(slide)
    props.close()
    // if (slide === 2) {
    //   props.close()
    // } else {
    //   setSlideIncrement(slide + 1)
    // }
  }

  const settings = {
    arrows: false,
    speed: 1000,
    infinite: false
    // autoplay: true,
    // autoplaySpeed: 1000,
    // fade: true
  }

  return (
    <div className="ticket-popup-overlay active">
      <div className="ticket-popup onboarding-popup">
        <Slider
          ref={sliderref => (slider.current = sliderref)}
          {...settings}
          style={{ width: "100%", height: "720px" }}
        >
          <div>
            <img
              style={{ width: "100%", height: "100%" }}
              src={popup1Image}
              alt={popup1Image}
              onLoad={() => window.dispatchEvent(new Event("resize"))}
            />
          </div>
          <div>
            <img
              style={{ width: "100%", height: "100%" }}
              src={popup2Image}
              alt={popup2Image}
              onLoad={() => window.dispatchEvent(new Event("resize"))}
            />
          </div>
        </Slider>

        <div style={{ position: "absolute", bottom: "60px", left: "46%" }}>
          <button
            className="btn"
            style={{ minWidth: "140px" }}
            onClick={() => handleShowNextSecondSlide()}
          >
            <abbr>Let's go</abbr>
          </button>
        </div>

        {/* <!-- NOTE : Add "active" className on click to parent div which is "ticket-popup-overlay" --> */}
      </div>
    </div>
  )
}

export default LevelUpSliderPopup
