import React, { useEffect } from "react"
// import UberImage from "assets/images/all-new-svg-icons/Uber.svg"
import ProductInfoChangePopup from "./ProductInfoChangePopup"
import useComponentVisible from "../ComponentVisible"
import { useDispatch, useSelector } from "react-redux"
import {
  getActiveWorkspacesList
  //getLanguageList
  // userBeginProject
} from "redux/action"

function ProductInfo(props) {
  const dispatch = useDispatch()
  const { fetchActiveWorkspacesList } = useSelector(({ job }) => job)

  useEffect(() => {
    !fetchActiveWorkspacesList.length && dispatch(getActiveWorkspacesList())
  }, [dispatch]) // eslint-disable-line

  const {
    ref,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(false)
  const productDetailsById = useSelector(
    ({ product: { productDetailsById } }) =>
      productDetailsById && productDetailsById
  )

  return (
    <>
      <div className="product-info" ref={ref}>
        <div className="w-full col-wrap selected-col">
          <div style={{ height: "50px" }}>
            <img
              className="img-icon"
              src={productDetailsById && productDetailsById.company_logo_url}
              alt=""
            />
          </div>
          <div
            className="content"
            //onClick={handleShowProductListPopup}
            onClick={() => setIsComponentVisible(true)}
          >
            <abbr className="w-full text-22 font-semibold company-name">
              {productDetailsById && productDetailsById.workspace_title}
            </abbr>
            <span className="w-full text-16 font-semibold designation">
              {productDetailsById &&
                (productDetailsById.role.length > 18
                  ? productDetailsById.role.slice(0, 18) + "..."
                  : productDetailsById.role)}
            </span>
          </div>
        </div>

        {isComponentVisible && (
          <ProductInfoChangePopup
            closeProductInfoPopup={() => setIsComponentVisible(false)}
          />
        )}
      </div>
    </>
  )
}

export default ProductInfo
