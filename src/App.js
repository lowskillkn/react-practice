import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import "./styles/App.css"
import Navbar from "./components/UI/navbar/Navbar"

function App() {
  return (
  <BrowserRouter>
    <Navbar />
    <AppRouter/>
  </BrowserRouter>
  )
}

export default App
