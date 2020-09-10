import React, { useEffect } from "react"
// import UberImage from "assets/images/all-new-svg-icons/Uber.svg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import {
  getActiveWorkspacesList
  //getLanguageList
  // userBeginProject
} from "redux/action"

function ProductInfoChangePopup(props) {
  let { upr_id } = useParams()
  const dispatch = useDispatch()

  const { fetchActiveWorkspacesList } = useSelector(({ job }) => job)

  useEffect(() => {
    !fetchActiveWorkspacesList.length && dispatch(getActiveWorkspacesList())
  }, [dispatch]) // eslint-disable-line

  const handleCloseProductListPopup = () => {
    props.closeProductInfoPopup()
  }

  return (
    <>
      {/* <!-- NOTE : Below popup will open product dropdown list --> */}
      <div className="w-full product-dropdown-list ">
        {fetchActiveWorkspacesList &&
          !!fetchActiveWorkspacesList.length &&
          fetchActiveWorkspacesList.map((workspaces, i) => {
            // const jobRequiredLangList = job.required_languages
            return (
              <div
                className="w-full col-wrap"
                onClick={handleCloseProductListPopup}
                key={i}
              >
                <div style={{ height: "50px" }}>
                  <img
                    className="img-icon"
                    src={workspaces && workspaces.company_logo_url}
                    alt=""
                  />
                </div>
                <div className="content">
                  <Link to={`/dev-env/${upr_id}/overview`}>
                    <abbr className="w-full text-22 font-semibold company-name">
                      {workspaces && workspaces.title}
                    </abbr>
                    <span className="w-full text-16 font-semibold designation">
                      {workspaces &&
                        (workspaces.role_title.length > 18
                          ? workspaces.role_title.slice(0, 18) + "..."
                          : workspaces.role_title)}
                    </span>
                  </Link>
                </div>
              </div>
            )
          })}

        <div className="w-full col-wrap col-content">
          <div className="content">
            <p className="text-14">
              You don't have any other active workspaces yet.
              <Link
                to="/companies-and-role-list"
                className="link-text"
                style={{ margin: "0px 4px" }}
              >
                Click here
              </Link>
              to create an additional workspace
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductInfoChangePopup
