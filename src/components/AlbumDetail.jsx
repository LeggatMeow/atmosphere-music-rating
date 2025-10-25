import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

export default function AlbumDetail({ album, onBack }) {
  console.log("AlbumDetail received:", {
  id: album?.id,
  title: album?.title,
  songs: album?.songs,
  songsCount: album?.songs?.length
});

  const [albumAverage, setAlbumAverage] = useState(null);
  const [cover, setCover] = useState(null);

  // inside AlbumDetail.jsx
// ...
const songs = album?.songs ?? [];

const calculateAverage = () => {
  const ratings = songs
    .map((song) => {
      const saved = localStorage.getItem(`rating-${song.id}`);
      return saved ? parseFloat(saved) : 0;
    })
    .filter((r) => r > 0);

  if (!ratings.length) return null;
  const sum = ratings.reduce((a, b) => a + b, 0);
  return (sum / ratings.length).toFixed(2);
};

// Recalc on album change
useEffect(() => {
  setAlbumAverage(calculateAverage());
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [album?.id]);

// Called by SongList/SongRating when a value changes
const handleRateChange = () => {
  const newAvg = calculateAverage();
  setAlbumAverage(newAvg);
};

// ...
{album.type === "studio" ? (
  <SongList songs={songs} albumId={album.id} onRateChange={handleRateChange} />
) : (
  <p className="text-gray-400 italic mt-4">Tracklist coming soon…</p>
)}


    </div>
  );
}
