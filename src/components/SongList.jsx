import SongRating from './SongRating'

export default function SongList({ songs }) {
  return (
    <div className="space-y-3">
      {songs.map((song, idx) => (
        <div key={song.id} className="flex justify-between items-center bg-neutral-800 p-3 rounded-lg">
          <div>
            <p className="font-medium">{idx + 1}. {song.title}</p>
            <p className="text-gray-400 text-sm">{song.duration}</p>
          </div>
          <SongRating songId={song.id} />
        </div>
      ))}
    </div>
  )
}
