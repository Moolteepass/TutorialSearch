import React from "react"
import { CgDarkMode } from "react-icons/cg"
import { useState, useEffect } from "react"
import "./App.css"

const DarkMode = () => {
  const [darkMode, setDarkmode] = useState(true)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-theme")
    } else {
      document.documentElement.classList.remove("dark-theme")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkmode(!darkMode)
    console.log(darkMode)
  }

  return (
    <div onClick={toggleDarkMode} className="darkmode">
      <CgDarkMode />
    </div>
  )
}

export default DarkMode
