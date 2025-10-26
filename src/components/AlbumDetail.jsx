import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

export default function AlbumDetail({ album, onBack }) {
  const [albumAverage, setAlbumAverage] = useState(null);
  const [ratedCount, setRatedCount] = useState(0);
  const [cover, setCover] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [highlightedTrack, setHighlightedTrack] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [albumBlurb, setAlbumBlurb] = useState("");
  const [loadingBlurb, setLoadingBlurb] = useState(true);





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

  // ❤️ Count favorites
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favCount = songs.filter((s) =>
    favorites.includes(s.id)
  ).length;

  return { avg, count, favCount };
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
  const { avg, count, favCount } = calculateStats();
  setAlbumAverage(avg);
  setRatedCount(count);
  setFavoriteCount(favCount);
  setTopTracks(getTopRatedTracks()); // ✅ also update here
}, [album?.id]);


  const handleRateChange = () => {
const { avg, count, favCount } = calculateStats();
setAlbumAverage(avg);
setRatedCount(count);
setFavoriteCount(favCount);



  setTopTracks(getTopRatedTracks()); // ✅ live update
};


  useEffect(() => {
  let cancelled = false;

  (async () => {
    setLoadingBlurb(true);

    try {
      // ✅ Album Art fetch (keep existing)
      const url = await fetchAlbumArt(album.title, "Atmosphere");
      if (!cancelled) setCover(url || null);
    } catch (e) {
      console.warn("Cover fetch failed", e);
    }

    try {
  const searchTitles = [
    `${album.title} (Atmosphere album)`,
    `${album.title} album`,
    `${album.title} Atmosphere`
  ];

  let found = false;

  for (const t of searchTitles) {
    const title = encodeURIComponent(t);
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const res = await fetch(wikiUrl);

    if (res.ok) {
      const data = await res.json();
      if (data.extract) {
        if (!cancelled) setAlbumBlurb(data.extract);
        found = true;
        break;
      }
    }
  }

  if (!found) {
    setAlbumBlurb("");
  }
} catch (e) {
  console.warn("Wiki blurb failed", e);
  setAlbumBlurb("");
}


    if (!cancelled) setLoadingBlurb(false);
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

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sticky top-0 bg-neutral-900/90 backdrop-blur-sm pb-4 z-20">
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
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <span className="text-red-400">♥</span>
                    {favoriteCount}
                </p>

              </>
            ) : (
              <p className="text-gray-400">No ratings yet</p>
            )}
          </div>

          {loadingBlurb ? (
  <p className="text-gray-500 italic mb-4">Loading album info…</p>
) : albumBlurb ? (
  <p className="text-gray-300 text-sm mb-4 max-w-xl">{albumBlurb}</p>
) : (
  <p className="text-gray-500 text-sm mb-4 italic">No info available.</p>
)}

<p className="text-gray-300 max-w-xl">
  Album tracklist — rate songs with 1–5 stars (half stars supported).
</p>

        </div>
      </div>

{topTracks.length > 0 && (
  <div className="mb-6 bg-neutral-850 p-3 rounded-lg shadow-md border border-neutral-700/50">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-lg">🔥</span>
      <h3 className="text-lg font-semibold text-yellow-400">Top Rated Tracks</h3>

      {topTracks.length > 3 && (
        <button
          className="text-xs text-gray-400 underline ml-auto"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show Less" : "Show All"}
        </button>
      )}
    </div>

    <ul className="space-y-1">
      {topTracks
        .slice(0, expanded ? topTracks.length : 3)
        .map((song, index) => (
          <li
            key={song.id}
            onClick={() => {
              const el = document.getElementById(song.id);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              setHighlightedTrack(song.id);
              setTimeout(() => setHighlightedTrack(null), 1500);
}

            }}
            className="flex justify-between items-center bg-neutral-800 p-2 rounded cursor-pointer hover:bg-neutral-700 transition-all duration-200"
          >
            <span className="text-sm text-gray-200">
              {index + 1}. {song.title}
            </span>
            <span className="text-yellow-400 text-sm">
              {song.rating.toFixed(1)} ⭐
            </span>
          </li>
        ))}
    </ul>
  </div>
)}

<div className="border-b border-neutral-700/50 my-6"></div>  {/* ✅ Divider here */}

      {album.type === "studio" ? (
        <SongList
  songs={songs}
  albumId={album.id}
  onRateChange={handleRateChange}
  highlightedTrack={highlightedTrack}
  onFavoriteChange={handleRateChange}
/>


      ) : (
        <p className="text-gray-400 italic mt-4">
          Tracklist coming soon…
        </p>
      )}
    </div>
  );
}
