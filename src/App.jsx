import { useState, useEffect } from "react"
import Airtable from "airtable"
import GridCard from "./GridCard"
import DarkMode from "./DarkMode"

const App = () => {
  const [search, setSearch] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      var base = new Airtable({
        apiKey:
          "patz6FDqRAoEsUCVK.c390a4b41c3e9a632901be7f8a6e2ab6200478752fc4b37971a436bf32744c1d",
      }).base("appSt6oazElA26KGW")

      let allRecords = []

      base("videos")
        .select({
          fields: ["id", "name", "date", "tags", "thumbnail", "url"],
          sort: [{ field: "id", direction: "desc" }],
        })
        .eachPage(
          function page(records, fetchNextPage) {
            records.forEach(function (record) {
              allRecords.push(record.fields)
            })
            fetchNextPage()
          },
          function done(err) {
            if (err) {
              console.error(err)
              return
            }
            setData(allRecords)
            localStorage.setItem("cachedData", JSON.stringify(allRecords))
            console.log("fetchResult", allRecords)
          }
        )
    }
    // Load data from localStorage or fetch it
    if (localStorage.getItem("cachedData") !== null) {
      console.log("cachedData exists, loading now")
      setData(JSON.parse(localStorage.getItem("cachedData")))
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
          className="searchbar-input"
        />
        <DarkMode />
      </div>
      <div>
        <GridCard video={sortedAndFilteredData} />
      </div>
    </div>
  )
}

export default App
