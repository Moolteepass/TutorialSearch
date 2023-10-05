import React from "react";

function daysAgo(isoDate) {
  const date = new Date(isoDate);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 60) {
    return `${diffDays} days ago`;
  } else {
    const diffMonths = Math.ceil(diffDays / 30);
    return `${diffMonths} months ago`;
  }
}

const GridCard = ({ video }) => {
  return (
    <div className="allCard">
      {/* Map Through JSON */}
      {video.map((video, index) => (
        /* Link */
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <div className="indCard">
            {/* Display Thumbnail */}
            <img src={video.thumbnail} alt={video.name} />
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
  );
};

export default GridCard;
