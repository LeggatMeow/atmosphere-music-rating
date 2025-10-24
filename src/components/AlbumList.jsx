import React from 'react';
import { useEffect, useState } from 'react'
import { fetchAlbumArt } from '../utils/fetchAlbumArt'

export default function AlbumList({ albums, onSelect }) {
  const [covers, setCovers] = useState({})

  useEffect(() => {
    albums.forEach(async (album) => {
      const url = await fetchAlbumArt(album.title)
      setCovers(prev => ({ ...prev, [album.id]: url }))
    })
  }, [albums])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          onClick={() => onSelect({ ...album, cover: covers[album.id] })}
          className="bg-neutral-800 rounded-xl p-4 cursor-pointer hover:scale-[1.01] transition-transform"
        >
          <img
            src={covers[album.id] || '/album-covers/fallback.jpg'}
            alt={album.title}
            className="rounded-lg mb-3 w-full h-48 object-cover"
          />
          <h2 className="text-xl font-semibold">{album.title}</h2>
          <p className="text-gray-400">{album.year}</p>
        </div>
      ))}
    </div>
  )
}

