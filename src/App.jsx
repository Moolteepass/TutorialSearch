import React, { useState, useEffect } from "react"
import GridCard from "./GridCard"

const App = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/Moolteepass/48b8c04f4a9fde8a55db95d991102fc6/raw/videos.json"
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
          src="https://www.dropbox.com/scl/fi/ej49vbjsid4wczwp2ugqv/MonkeyMedia.jpg?rlkey=jat7pjg8d63244j28eidn4m5j&dl=1"
          alt=""
        />
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        <GridCard video={sortedAndFilteredData} />
      </div>
    </div>
  )
}

export default App
