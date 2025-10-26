import React, { useEffect, useState } from "react";
import * as tracksData from "../data/tracks";

export default function TopTracksPage({ onSelectTrack }) {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    const allTracks = Object.values(tracksData).flatMap(album =>
      album.songs.map(song => ({
        ...song,
        albumTitle: album.title,
        albumId: album.albumId,
        rating: parseFloat(localStorage.getItem(`rating-${song.id}`) || "0"),
        isFav: favorites.includes(song.id)
      }))
    );

    const rated = allTracks.filter(t => t.rating > 0);

    setTopTracks(
      rated.sort((a, b) => b.rating - a.rating)
    );
  }, []);

  if (!topTracks.length)
    return <p className="text-gray-400">Rate some tracks to see your list!</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-4">My Top Tracks</h2>
      {topTracks.map((track, idx) => (
        <div
          key={track.id}
          className="p-2 bg-neutral-800 rounded cursor-pointer flex justify-between hover:bg-neutral-700 transition"
          onClick={() => onSelectTrack(track.albumId, track.id)}
        >
          <div>
            <p className="text-gray-100">{idx + 1}. {track.title}</p>
            <p className="text-gray-400 text-xs">{track.albumTitle}</p>
          </div>
          <p className="text-yellow-400">{track.rating.toFixed(1)} ⭐</p>
        </div>
      ))}
    </div>
  );
}
