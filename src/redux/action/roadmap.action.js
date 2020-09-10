import {
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT,
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS,
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE
} from "./actionType"
import axios from "../../config/axios"

//FETCH product road map
export const roadmapGetProductRoadmapByProduct = payload => {
  return {
    type: ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT,
    payload: payload
  }
}

export const roadmapGetProductRoadmapByProductSuccess = payload => {
  return {
    type: ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS,
    payload: payload
  }
}

export const roadmapGetProductRoadmapByProductFailure = payload => {
  return {
    type: ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE,
    payload: payload
  }
}

export const getProductRoadmap = upr_id => async dispatch => {
  dispatch(roadmapGetProductRoadmapByProduct())
  axios
    .get(`/product-roadmaps/${upr_id}`)
    .then(res => {
      dispatch(roadmapGetProductRoadmapByProductSuccess(res.data.data))
      // handleOpenSelectUserType && handleOpenSelectUserType()
    })
    .catch(error => {
      dispatch(
        roadmapGetProductRoadmapByProductFailure({
          error: error.response.data.message
        })
      )
    })
}
