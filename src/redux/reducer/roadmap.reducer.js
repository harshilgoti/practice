import {
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT,
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS,
  ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE
} from "../action/actionType"

let initialState = {
  fetchProductRoadmapLoading: false,
  fetchProductRoadmapLoaded: true,
  productRoadmapList: [],
  fetchProductRoadmapError: ""
}

const roadmap = (state = initialState, action) => {
  switch (action.type) {
    case ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT:
      return {
        ...state,
        fetchProductRoadmapLoading: true,
        fetchProductRoadmapLoaded: false
      }
    case ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_SUCCESS:
      return {
        ...state,
        fetchProductRoadmapLoading: false,
        fetchProductRoadmapLoaded: true,
        productRoadmapList: action.payload.sort((a, b) => {
          let fa = a.index,
            fb = b.index

          if (fa < fb) {
            return -1
          }
          if (fa > fb) {
            return 1
          }
          return 0
        })
      }

    case ROADMAP_GET_PRODUCT_ROADMAP_BY_PRODUCT_FAILURE:
      return {
        ...state,
        fetchProductRoadmapLoading: false,
        fetchProductRoadmapLoaded: false,
        fetchProductRoadmapError: action.payload.error
      }

    default:
      return state
  }
}

export default roadmap
