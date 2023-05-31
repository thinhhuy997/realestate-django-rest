import { useEffect, useContext } from "react"
import Users from "../Users"
import { Link } from "react-router-dom"

const Admin = () => {
  return (
    <section>
      <h1>Admin Page</h1>
      <br />
      <Users />
      <br />
      <div className='flexGrow'>
        <Link to='/'>Home</Link>
      </div>
    </section>
  )
}

export default Admin
