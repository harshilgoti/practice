import ReactGA from "react-ga"

export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING_CODE, {
    debug: false
  })
}

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search)
}

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
}
