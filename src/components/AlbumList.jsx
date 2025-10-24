export default function AlbumList({ albums, onSelect }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          onClick={() => onSelect(album)}
          className="bg-neutral-800 rounded-xl p-4 cursor-pointer hover:scale-[1.01] transition-transform"
        >
          <img src={album.cover} alt={album.title} className="rounded-lg mb-3 w-full h-48 object-cover" />
          <h2 className="text-xl font-semibold">{album.title}</h2>
          <p className="text-gray-400">{album.year}</p>
        </div>
      ))}
    </div>
  );
}
