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
      } catch (e) {
        console.warn("Cover fetch failed for", album.title, e);
      }
    })();
    return () => { cancelled = true; };
  }, [album.title]);

  return (
    <button
      onClick={() => onSelect(album.id)}  // pass only the id
      className="bg-neutral-800 p-4 rounded shadow hover:shadow-lg text-left w-full"
    >
      {cover && (
        <img
          src={cover}
          alt={`${album.title} cover`}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <div className="font-bold">{album.title}</div>
      <div className="text-gray-400">{album.year}</div>
    </button>
  );
}

export default function AlbumList({ albums, onSelect }) {
  if (!albums?.length) return <p>No albums available.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {albums.map(a => (
        <AlbumCard key={a.id} album={a} onSelect={onSelect} />
      ))}
    </div>
  );
}
