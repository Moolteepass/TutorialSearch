/* eslint-disable react/prop-types */
import { useState } from "react"
import PropTypes from "prop-types"
import loading from "/assets/loading.svg"

function daysAgo(isoDate) {
  const date = new Date(isoDate)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays < 60) {
    return `${diffDays} days ago`
  } else {
    const diffMonths = Math.ceil(diffDays / 30)
    return `${diffMonths} months ago`
  }
}

const GridCard = ({ video }) => {
  const [imageLoaded, setImageLoaded] = useState({})

  const handleImageLoaded = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }))
  }

  return (
    <div className="allCard">
      {/* Map Through JSON */}
      {video.map((video, index) => (
        /* Link */
        <a
          href={`https://www.youtube.com/watch?v=${video.url}t=0s`}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <div className="indCard">
            {/* Display Loading Animation */}
            {!imageLoaded[index] && (
              <img className="loading" src={loading} alt="Loading..." />
            )}
            {/* Display Thumbnail */}
            <img
              src={`https://i.ytimg.com/vi/${video.url}/mqdefault.jpg`}
              alt={video.name}
              onLoad={() => handleImageLoaded(index)}
              style={{ display: imageLoaded[index] ? "block" : "none" }}
            />
            {/* Map Through Tags */}
            {video.tags.map((tag, tagIndex) => (
              <p key={tagIndex} className="indTag">
                {tag}
              </p>
            ))}
            <p className="indDate">{daysAgo(video.date)}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

// Define prop types for GridCard
GridCard.propTypes = {
  video: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired, // Explicitly define tags
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default GridCard
