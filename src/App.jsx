import React, { useState, useEffect } from "react"
import GridCard from "./GridCard"

const App = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://searchbar-images.s3.ap-southeast-2.amazonaws.com/videos.json"
        )
        const jsonData = await response.json()
        setData(jsonData)
        console.log(jsonData)
      } catch (error) {
        console.error("Error fetching JSON:", error)
      }
    }
    fetchData()
  }, [])

  const filteredData = data.filter((data) => {
    return ["name", "tags"].some((field) => {
      if (Array.isArray(data[field])) {
        return data[field].some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        )
      }
      return data[field].toLowerCase().includes(search.toLowerCase())
    })
  })

  const sortedAndFilteredData = [...filteredData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="app">
      <div className="searchbar">
        <img
          className="logo"
          src="https://searchbar-images.s3.ap-southeast-2.amazonaws.com/MonkeyMedia.png"
          alt=""
        />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          autoComplete="false"
        />
      </div>
      <div>
        <GridCard video={sortedAndFilteredData} />
      </div>
    </div>
  )
}

export default App
