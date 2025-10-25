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

  return (
    <button
      className="bg-neutral-800 p-4 rounded shadow hover:shadow-lg text-left w-full"
      onClick={() => onSelect(album.id)}
    >
      {cover && (
        <img
          src={cover}
          alt={album.title}
          className="w-full h-48 object-cover rounded mb-2"
        />
      )}
      <div className="font-bold">{album.title}</div>
      <div className="text-gray-400">{album.year}</div>
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
