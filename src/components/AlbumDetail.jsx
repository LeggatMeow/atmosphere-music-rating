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


  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = await fetchAlbumArt(album.title, "Atmosphere");
        if (!cancelled) setCover(url || null);
      } catch (e) {
        console.warn("Detail cover fetch failed for", album.title, e);
      }
    })();
    return () => { cancelled = true; };
  }, [album.title]);

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-400 mb-4">← Back</button>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
        {cover && <img src={cover} alt={album.title} className="w-48 rounded-lg shadow-lg" />}
        <div>
          <h2 className="text-2xl font-bold">{album.title}</h2>
          <p className="text-gray-400 mb-1">{album.year}</p>
          <div className="mb-4">
  {albumAverage ? (
    <>
      <p className="text-yellow-400 font-semibold">
        Album Avg: {albumAverage} ⭐
      </p>
      <p className="text-gray-400 text-sm">
        Songs rated: {ratedCount}/{songs.length}
      </p>
    </>
  ) : (
    <p className="text-gray-400">No ratings yet</p>
  )}
</div>

          <p className="text-gray-300 max-w-xl">
            Album tracklist — rate songs with 1–5 stars (half stars supported).
          </p>
        </div>
      </div>

      {album.type === "studio" ? (
  <SongList songs={songs} albumId={album.id} onRateChange={handleRateChange} />
) : (
  <p className="text-gray-400 italic mt-4">Tracklist coming soon…</p>
)}

    </div>
  );
}
