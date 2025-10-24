import React from 'react';
import SongList from './SongList'

export default function AlbumDetail({ album, onBack }) {
  return (
    <div>
      <button onClick={onBack} className="text-sm text-gray-400 mb-4">← Back</button>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start">
        <img src={album.cover} alt={album.title} className="w-48 rounded-lg shadow-lg" />
        <div>
          <h2 className="text-2xl font-bold">{album.title}</h2>
          <p className="text-gray-400 mb-4">{album.year}</p>
          <p className="text-gray-300 max-w-xl">Album tracklist — rate songs with 1–5 stars (half stars supported).</p>
        </div>
      </div>

      <SongList songs={album.songs} />
    </div>
  )
}
