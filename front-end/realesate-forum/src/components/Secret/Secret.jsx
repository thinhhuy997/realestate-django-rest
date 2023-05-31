import { useState, useContext, useEffect } from "react"
import { Navigate, Route } from "react-router-dom"
import AuthContext from "../../context/AuthContext"

const Secret = () => {
  let { userProfile } = useContext(AuthContext)

  let [comments, setComments] = useState([])
  let { authTokens } = useContext(AuthContext)

  useEffect(() => {
    getComments()
  }, [])

  let getComments = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/get-comments/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
    let data = await response.json()
    setComments(data)
  }

  if (!userProfile) {
    return <Navigate to='/login-page' />
  }

  return (
    <div>
      <div>hello {userProfile.user_id}, You are logged the home page!</div>
      <br />
      <p>List Comments of you:</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.comment_text}</li>
        ))}
      </ul>
    </div>
  )
}

export default Secret
