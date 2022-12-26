import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../context"
import MyButton from "../button/MyButton"

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const logout = () => {
    setIsAuth(false)
    localStorage.setItem("auth", "false")
  }

  return (
    <div className="navbar">
      <div className="navbar__container">
        <div className="navbar__links">
          <Link className="navbar__link" to="/posts">
            Posts
          </Link>
          <Link className="navbar__link" to="/about">
            About
          </Link>
        </div>
        <MyButton onClick={logout}>Выйти</MyButton>
      </div>
    </div>
  )
}
