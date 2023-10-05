import React, { useState } from "react";
import data from "./videos.json";
import Table from "./Table";
import GridCard from "./GridCard";

const App = () => {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((data) => {
    return ["name", "tags"].some((field) => {
      if (Array.isArray(data[field])) {
        return data[field].some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase())
        );
      }
      return data[field].toLowerCase().includes(search.toLowerCase());
    });
  });

  const sortedAndFilteredData = [...filteredData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="app">
      <div className="searchbar">
        <img className="logo" src="public/Assets/MonkeyMedia.jpg" alt="" />
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
  );
};

export default App;
