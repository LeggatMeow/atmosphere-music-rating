import React from 'react';
import SongRating from './SongRating';

const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SongList({ songs, albumId, onRateChange, highlightedTrack }) {
  if (!songs?.length) return <p>No tracks available.</p>;

  return (
    <div className="space-y-3">
      {songs.map((song, idx) => {
        const safeId = song.id || `${albumId}-${slug(song.title)}-${idx}`;

        return (
          <div
  key={safeId}
  id={safeId}
  className={`flex items-center justify-between p-2 rounded transition-colors duration-500
    ${highlightedTrack === safeId ? "bg-yellow-500/20" : "bg-neutral-800"}`}
>

            <p className="font-medium">{idx + 1}. {song.title}</p>
            <SongRating
              song={{ ...song, id: safeId }}
              onRateChange={onRateChange}
            />
          </div>
        );
      })}
    </div>
  );
}
