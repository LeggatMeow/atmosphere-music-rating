import React, { useEffect, useState } from "react";
import { fetchAlbumArt } from "../utils/fetchAlbumArt";

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

  // Calculate average + count for display
  const ratings = songs.map(song => {
    const saved = localStorage.getItem(`rating-${song.id}`);
    return saved ? parseFloat(saved) : 0;
  });
  const ratedCount = ratings.filter(r => r > 0).length;
  const avg = ratedCount > 0
    ? (ratings.filter(r => r > 0).reduce((a,b)=>a+b,0) / ratedCount).toFixed(1)
    : null;

  return (
    <button
      className="bg-neutral-800 p-3 rounded shadow hover:shadow-lg text-left w-full"
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

        {/* ⭐ Overlay for rating */}
        {avg && (
          <div className="absolute bottom-0 left-0 w-full bg-black/60 text-yellow-400 text-sm p-1 flex items-center gap-1">
            {avg}⭐
          </div>
        )}
      </div>

      <div className="font-bold">{album.title}</div>
      <div className="text-gray-400">{album.year}</div>

      {ratedCount > 0 && (
        <div className="text-gray-500 text-sm">
          Songs rated: {ratedCount}/{songs.length}
        </div>
      )}
    </button>
  );
}


function AlbumSection({ title, albums, onSelect }) {
  if (!albums?.length) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4 text-gray-200">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

export default function AlbumList({ albums, onSelect }) {
  const studios = albums.filter((a) => a.type === "studio");
  const eps = albums.filter((a) => a.type === "ep");
  const compilations = albums.filter((a) => a.type === "compilation");

  return (
    <>
      <AlbumSection title="Studio Albums" albums={studios} onSelect={onSelect} />
      <AlbumSection title="EPs" albums={eps} onSelect={onSelect} />
      <AlbumSection title="Compilations" albums={compilations} onSelect={onSelect} />
    </>
  );
}
