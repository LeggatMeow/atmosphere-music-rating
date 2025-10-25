import React, { useState, useEffect } from "react";
import StarRating from "./StarRating"; // A component for 1–5 star rating

export default function SongList({ songs, onRateChange }) {

  console.log(album);

  if (!songs || songs.length === 0) return <p>No tracks available.</p>;

  return (
    <div className="space-y-4">
      {songs.map((song, index) => (
        <SongItem key={index} song={song} onRateChange={onRateChange} />
      ))}
    </div>
  );
}

function SongItem({ song, onRateChange }) {
  const [rating, setRating] = useState(0);

  // Load saved rating from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`rating-${song.id}`);
    if (saved) setRating(parseFloat(saved));
  }, [song.id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    localStorage.setItem(`rating-${song.id}`, newRating);
    onRateChange(); // update album average
  };

  return (
    <div className="flex items-center justify-between p-2 bg-neutral-800 rounded">
      <span>{song.title}</span>
      <StarRating rating={rating} onChange={handleRatingChange} />
    </div>
  );
}


