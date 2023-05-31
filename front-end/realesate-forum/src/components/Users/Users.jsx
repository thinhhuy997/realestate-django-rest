import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const Users = () => {
  const [users, setUsers] = useState()
  const axiosPrivate = useAxiosPrivate()

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("jwt"))
  }, [])

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/user-list/", {
          signal: controller.signal,
        })
        console.log(response.data)
        isMounted && setUsers(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    getUsers()

    // unmounted
    return () => {
      isMounted = false
      controller.abort()
    }
  }, [])

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  )
}

export default Users
