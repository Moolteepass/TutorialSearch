import React, { useState, useEffect } from "react"
import GridCard from "./GridCard"
import loading from "/assets/loading.svg"

const App = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseID = "appSt6oazElA26KGW"
        const tableName = "videos"

        const url = `https://api.airtable.com/v0/${baseID}/${tableName}`

        fetch(url, {
          headers: {
            Authorization:
              "Bearer patz6FDqRAoEsUCVK.c390a4b41c3e9a632901be7f8a6e2ab6200478752fc4b37971a436bf32744c1d",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data.records.map((record) => record.fields))
            console.log(data.records.map((record) => record.fields))
          })
      } catch (error) {
        console.error("Error fetching JSON:", error)
      }
    }
    fetchData()
  }, [])

  const filteredData = data.filter((data) => {
    return ["name", "tags"].some((field) => {
      if (Array.isArray(data[field])) {
        return data[field].some(
          (tag) => tag && tag.toLowerCase().includes(search.toLowerCase())
        )
      }
      return (
        data[field] && data[field].toLowerCase().includes(search.toLowerCase())
      )
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
          id="searchbar"
        />
      </div>
      <div>
        <GridCard video={sortedAndFilteredData} />
      </div>
    </div>
  )
}

export default App
