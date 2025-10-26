// src/components/AlbumDetail.jsx
import React, { useEffect, useState } from "react";
import SongList from "./SongList";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";
import { fetchWikiSummary } from "../utils/fetchWikiSummary";
import { fetchAlbumLinks } from "../utils/fetchAlbumLinks";



export default function AlbumDetail({ album, onBack }) {
  const [albumAverage, setAlbumAverage] = useState(null);
  const [ratedCount, setRatedCount] = useState(0);
  const [favoriteCount, setFavoriteCount] = useState(0);

  const [cover, setCover] = useState(null);

  const [albumBlurb, setAlbumBlurb] = useState("");
  const [wikiUrl, setWikiUrl] = useState("");
  const [loadingBlurb, setLoadingBlurb] = useState(true);

  const [topTracks, setTopTracks] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [highlightedTrack, setHighlightedTrack] = useState(null);

  const [albumLinks, setAlbumLinks] = useState({});


  const songs = album?.songs ?? [];

  // ---- Stats helpers --------------------------------------------------------
  const calculateStats = () => {
    const ratings = songs.map((song) => {
      const saved = localStorage.getItem(`rating-${song.id}`);
      return saved ? parseFloat(saved) : 0;
    });

    const nonZero = ratings.filter((r) => r > 0);
    const count = nonZero.length;
    const avg = count > 0
      ? (nonZero.reduce((a, b) => a + b, 0) / count).toFixed(2)
      : null;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    const favCount = songs.filter((s) => favorites.includes(s.id)).length;

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
    return ratedSongs.sort((a, b) => b.rating - a.rating).slice(0, 3);
  };

  // Initial stats per album
  useEffect(() => {
    const { avg, count, favCount } = calculateStats();
    setAlbumAverage(avg);
    setRatedCount(count);
    setFavoriteCount(favCount);
    setTopTracks(getTopRatedTracks());
  }, [album?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Called by SongList when rating/favorite changes
  const handleRateChange = () => {
    const { avg, count, favCount } = calculateStats();
    setAlbumAverage(avg);
    setRatedCount(count);
    setFavoriteCount(favCount);
    setTopTracks(getTopRatedTracks());
  };

  // ---- Cover + Wikipedia blurb fetch ---------------------------------------
  useEffect(() => {
  let cancelled = false;

  // Reset when album changes
  setCover(null);
  setAlbumBlurb("");
  setWikiUrl("");
  setAlbumLinks({});
  setLoadingBlurb(true);

  // Cover fetch
  (async () => {
    try {
      const url = await fetchAlbumArt(album.title, "Atmosphere");
      if (!cancelled) setCover(url || null);
    } catch (e) {
      console.warn("Cover fetch failed", e);
      if (!cancelled) setCover(null);
    }
  })();

  //  Wikipedia blurb fetch
  (async () => {
    try {
      const { summary, url } = await fetchWikiSummary(
        `${album.title} Atmosphere album`
      );
      if (!cancelled) {
        setAlbumBlurb(summary || "");
        setWikiUrl(url || "");
      }
    } catch {
      if (!cancelled) {
        setAlbumBlurb("");
        setWikiUrl("");
      }
    } finally {
      if (!cancelled) setLoadingBlurb(false);
    }
  })();

  // Streaming links fetch
  (async () => {
    try {
      const links = await fetchAlbumLinks(album.title, "Atmosphere");
      if (!cancelled) setAlbumLinks(links);
    } catch {
      if (!cancelled) setAlbumLinks({});
    }
  })();

  return () => {
    cancelled = true;
  };
}, [album.title]);


  // ---- Render ---------------------------------------------------------------
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

                {/* ❤️ Favorites line — change to just {favoriteCount} if you prefer */}
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <span className="text-red-400">♥</span>
                  {favoriteCount}
                </p>
              </>
            ) : (
              <p className="text-gray-400">No ratings yet</p>
            )}
          </div>

          <div className="flex gap-2 mt-2 mb-4">
  {albumLinks.apple && (
    <a
      href={albumLinks.apple}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-3 py-1 rounded bg-green-600 hover:bg-green-500 transition-colors"
    >
       Music
    </a>
  )}

  {albumLinks.spotify && (
    <a
      href={albumLinks.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 transition-colors"
    >
      Spotify
    </a>
  )}
</div>


          {/* Blurb + link */}
          {loadingBlurb ? (
            <p className="text-gray-500 italic mb-4">Loading album info…</p>
          ) : albumBlurb ? (
            <>
              <p className="text-gray-300 text-sm mb-2 max-w-xl">
                {albumBlurb}
              </p>
              {wikiUrl && (
                <a
                  href={wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Read more →
                </a>
              )}
            </>
          ) : (
            <p className="text-gray-500 text-sm mb-2 italic">No info available.</p>
          )}

          <p className="text-gray-300 max-w-xl mt-3">
            Album tracklist — rate songs with 1–5 stars (half stars supported).
          </p>
        </div>
      </div>

      {/* Top Rated Tracks card */}
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

      {/* Divider */}
      <div className="border-b border-neutral-700/50 my-6"></div>

      {/* Tracklist */}
      {album.type === "studio" ? (
        <SongList
          songs={songs}
          albumId={album.id}
          onRateChange={handleRateChange}
          highlightedTrack={highlightedTrack}
          onFavoriteChange={handleRateChange}
        />
      ) : (
        <p className="text-gray-400 italic mt-4">Tracklist coming soon…</p>
      )}
    </div>
  );
}
