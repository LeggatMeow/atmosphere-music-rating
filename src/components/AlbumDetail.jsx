import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

export default function AlbumDetail({ album, onBack }) {
  const [albumAverage, setAlbumAverage] = useState(null);
  const [ratedCount, setRatedCount] = useState(0);
  const [cover, setCover] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [expanded, setExpanded] = useState(false);


  const songs = album?.songs ?? [];


  const calculateStats = () => {
    const ratings = songs.map((song) => {
      const saved = localStorage.getItem(`rating-${song.id}`);
      return saved ? parseFloat(saved) : 0;
    });

    const nonZero = ratings.filter((r) => r > 0);
    const count = nonZero.length;

    const avg =
      count > 0
        ? (nonZero.reduce((a, b) => a + b, 0) / count).toFixed(2)
        : null;

    return { avg, count };
  };

  const getTopRatedTracks = () => {
  const ratedSongs = songs
    .map((song) => {
      const saved = localStorage.getItem(`rating-${song.id}`);
      return saved ? { ...song, rating: parseFloat(saved) } : null;
    })
    .filter((s) => s && s.rating > 0);

  if (ratedSongs.length < 3) return [];

  return ratedSongs
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);
};


  useEffect(() => {
  const { avg, count } = calculateStats();
  setAlbumAverage(avg);
  setRatedCount(count);
  setTopTracks(getTopRatedTracks()); // ✅ also update here
}, [album?.id]);


  const handleRateChange = () => {
  const { avg, count } = calculateStats();
  setAlbumAverage(avg);
  setRatedCount(count);
  setTopTracks(getTopRatedTracks()); // ✅ live update
};


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
    return () => {
      cancelled = true;
    };
  }, [album.title]);

  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-400 mb-4">
        ← Back
      </button>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
        {cover && (
          <img
            src={cover}
            alt={album.title}
            className="w-48 rounded-lg shadow-lg"
          />
        )}

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

{topTracks.length > 0 && (
  <div className="mb-6">
    <div className="flex items-center gap-2">
      <h3 className="text-lg font-bold text-yellow-400">🔥 Top Rated Tracks</h3>
      {topTracks.length > 3 && (
        <button
          className="text-xs text-gray-400 underline"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show Less" : "Show All"}
        </button>
      )}
    </div>

    <ul className="space-y-1 mt-2">
      {topTracks
        .slice(0, expanded ? topTracks.length : 3)
        .map((song, index) => (
          <li
            key={song.id}
            onClick={() => {
              const el = document.getElementById(song.id);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
            }}
            className="flex justify-between items-center bg-neutral-800 p-2 rounded cursor-pointer hover:bg-neutral-700 transition-all duration-200"
            style={{ transition: "all 0.3s ease" }}
          >
            <span>
              {index + 1}. {song.title}
            </span>
            <span className="text-yellow-400">{song.rating.toFixed(1)} ⭐</span>
          </li>
        ))}
    </ul>
  </div>
)}

      {album.type === "studio" ? (
        <SongList
          songs={songs}
          albumId={album.id}
          onRateChange={handleRateChange}
        />
      ) : (
        <p className="text-gray-400 italic mt-4">
          Tracklist coming soon…
        </p>
      )}
    </div>
  );
}
