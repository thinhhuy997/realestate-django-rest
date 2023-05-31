import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import SignupPage from "./components/SignupPage"
import LoginPage from "./components/LoginPage"
import PostCreatePage from "./components/PostCreatePage"
import DetailPage from "./components/DetailPage"
import { AuthProvider } from "./context/AuthContext"

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signup-page' element={<SignupPage />} />
            <Route path='/login-page' element={<LoginPage />} />
            <Route path='/post-create-page' element={<PostCreatePage />} />
            <Route path='post/:id' element={<DetailPage />} />
            {/* <Route path='/admin-page' element={<Admin />} /> */}
            {/* <Route path='/' element={<Secret />} /> */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
