import { Navigate, Route } from "react-router-dom"

// ;<Route path='/redirect' element={<Navigate to='/error-page' />} />

const PrivateRoute = ({ children, ...rest }) => {
  console.log("Private route works!")
  return <Route {...rest}>{children}</Route>
}

export default PrivateRoute
