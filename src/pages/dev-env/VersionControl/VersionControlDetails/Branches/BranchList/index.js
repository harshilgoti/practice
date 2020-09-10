import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getGitBranchesByGitRepoId } from "redux/action"

import Branch from "./Branch"

function BranchList(props) {
  const dispatch = useDispatch()

  const git_repo_id = useSelector(
    ({ product: { productDetailsById } }) =>
      productDetailsById && productDetailsById.git_repo_id
  )

  const branches = useSelector(({ product: { gitBranches } }) => gitBranches)

  useEffect(() => {
    git_repo_id && dispatch(getGitBranchesByGitRepoId(git_repo_id))
  }, [dispatch, git_repo_id])

  return (
    <>
      <div className="righttopdevelopwrap" id="style-3">
        {(branches || []).map(branch => {
          return <Branch key={branch.name} branch={branch} />
        })}
      </div>
    </>
  )
}

export default BranchList
