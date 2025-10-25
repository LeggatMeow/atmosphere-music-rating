// src/components/AlbumList.jsx
import React, { useEffect, useState, useMemo } from "react";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

function getRatingColor(avg) {
  if (avg >= 4) return "text-green-400";
  if (avg >= 2.5) return "text-yellow-400";
  return "text-red-400";
}

function AlbumCard({ album, onSelect }) {
  const [cover, setCover] = useState(null);
  
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const url = await fetchAlbumArt(album.title, "Atmosphere");
        if (!cancelled) setCover(url || null);
      } catch {
        if (!cancelled) setCover(null);
      }
    })();
    return () => { cancelled = true; };
  }, [album.title]);

  const songs = album.songs ?? [];

  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const favoriteCount = songs.filter((s) => favorites.includes(s.id)).length;

  const ratings = songs.map(song => {
    const saved = localStorage.getItem(`rating-${song.id}`);
    return saved ? parseFloat(saved) : 0;
  });
  const ratedCount = ratings.filter(r => r > 0).length;
  const avg = ratedCount > 0
    ? (ratings.filter(r => r > 0).reduce((a,b)=>a+b,0) / ratedCount).toFixed(1)
    : null;

  const progressPercent = (ratedCount / songs.length) * 100;

  return (
    <button
      className="bg-neutral-800 p-3 rounded shadow hover:shadow-lg transition-all text-left w-full"
      onClick={() => onSelect(album.id)}
    >
      <div className="relative mb-2">
        {cover && (
          <img
            src={cover}
            alt={album.title}
            className="w-full h-48 object-cover rounded"
          />
        )}

        {/* Overlay animated in only if avg exists */}
        {(avg || ratedCount > 0) && (
  <div
    className={`absolute bottom-0 left-0 w-full bg-black/60 text-sm py-1 px-2
    flex items-center gap-3 justify-center transition-opacity duration-500 opacity-100`}
  >
    {/* ⭐ Album Rating */}
    {avg && (
      <span className={`${getRatingColor(avg)} flex items-center gap-1`}>
        {avg}
        <span>⭐</span>
      </span>
    )}

    {/* ❤️ Favorite Count */}
    {favoriteCount > 0 && (
      <span className="text-red-400 flex items-center gap-1">
        <span>♥</span> {favoriteCount}
      </span>
    )}
  </div>
)}

      </div>

      <div className="font-bold">{album.title}</div>
      <div className="text-gray-400">{album.year}</div>

      {/* Progress text */}
      {ratedCount > 0 && (
        <div className="text-gray-500 text-sm">
          Songs rated: {ratedCount}/{songs.length}
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full h-1 bg-neutral-700 rounded mt-1">
        <div
          className="h-1 bg-yellow-400 rounded transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </button>
  );
}

function AlbumSection({ title, albums, onSelect }) {
  if (!albums?.length) return null;
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-200">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {albums.map(album => (
          <AlbumCard key={album.id} album={album} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default function AlbumList({ albums, onSelect, sortMode }) {
  const sortedAlbums = useMemo(() => {
    let list = [...albums];

    // ✅ Sorting logic
    if (sortMode === "highest") {
      return list.sort((a, b) => {
        const getAvg = album => {
          const songs = album.songs ?? [];
          const ratings = songs.map(song => {
            const saved = localStorage.getItem(`rating-${song.id}`);
            return saved ? parseFloat(saved) : 0;
          });
          const ratedCount = ratings.filter(r => r > 0).length;
          if (!ratedCount) return 0;
          return ratings.reduce((x,y)=>x+y,0) / ratedCount;
        };
        return getAvg(b) - getAvg(a);
      });
    }

    if (sortMode === "newest") {
      return list.sort((a, b) => b.year - a.year);
    }

    return list.sort((a, b) => a.year - b.year); // default oldest
  }, [albums, sortMode]);

  const studios = sortedAlbums.filter(a => a.type === "studio");
  const eps = sortedAlbums.filter(a => a.type === "ep");
  const comps = sortedAlbums.filter(a => a.type === "compilation");

  return (
    <>
      <AlbumSection title="Studio Albums" albums={studios} onSelect={onSelect} />
      <AlbumSection title="EPs" albums={eps} onSelect={onSelect} />
      <AlbumSection title="Compilations" albums={comps} onSelect={onSelect} />
    </>
  );
}
