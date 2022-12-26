import React, { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import { AuthContext } from "../context"
import { privateRoutes, publicRoutes } from "../router/index"
import MyLoader from "./UI/loader/MyLoader"

export default function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext)

  if (isLoading) {
    return <MyLoader />
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={route.element}
          exact={route.exact}
        />
      ))}
    </Routes>
  )
}
