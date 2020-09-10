import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { getGitCommitsByGitRepoId } from "redux/action"

import GitGraph from "./GitGraph"
import Commits from "./Commits"
import Branches from "./Branches"
import { getUserProductDetailsById } from "redux/action"
import { useParams } from "react-router-dom"

function VersionControlDetails(props) {
  const dispatch = useDispatch()
  let { upr_id } = useParams()

  const productDetailsById = useSelector(
    ({ product }) => product.productDetailsById
  )

  useEffect(() => {
    dispatch(getUserProductDetailsById(upr_id))
  }, [dispatch, upr_id])

  const git_repo_id = useSelector(
    ({ product: { productDetailsById } }) =>
      productDetailsById && productDetailsById.git_repo_id
  )

  useEffect(() => {
    git_repo_id && dispatch(getGitCommitsByGitRepoId(git_repo_id))
  }, [dispatch, git_repo_id, productDetailsById])

  return (
    <>
      <div className="versioncontent flex">
        <GitGraph />
        <div className="versioncontrolright flex">
          <Branches />
          <Commits />
        </div>
      </div>
    </>
  )
}

export default VersionControlDetails
