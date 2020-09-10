import React from "react"
import { useSelector } from "react-redux"
import moment from "moment"
import { Gitgraph } from "@gitgraph/react"

// import graphImage from "assets/images/chatbot/graph.jpg"

function GitGraph(props) {
  const commits = useSelector(({ product: { gitCommits } }) => gitCommits)

  const commitsForGitGraph = commits.map((commit, index) => {
    return {
      refs: commit.refs,
      hash: commit.id,
      hashAbbrev: commit.short_id,
      parents: commit.parent_ids,
      parentsAbbrev: commit.parent_ids.map(parent_id => parent_id.slice(0, 7)),
      author: {
        name: commit.author_name,
        email: commit.author_email,
        timestamp: moment(commit.authored_date).valueOf()
      },
      committer: {
        name: commit.committer_name,
        email: commit.committer_email,
        timestamp: moment(commit.committed_date).valueOf()
      },
      subject: commit.title,
      body: "",
      notes: "",
      stats: []
    }
  })

  return (
    <>
      <div className="versioncontrolleft popup-shadow01">
        <div className="versioncontrollefthead font-semibold text-20">
          Graph
        </div>

        <div className="graphimg" id="style-3">
          {/* <img src={graphImage} alt="graphImage" /> */}
          {commitsForGitGraph.length ? (
            <Gitgraph>
              {gitgraph => {
                gitgraph.import(commitsForGitGraph)
              }}
            </Gitgraph>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  )
}

export default GitGraph
