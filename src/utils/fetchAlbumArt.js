export async function fetchAlbumArt(albumName, artist = 'Atmosphere') {
  try {
    const query = encodeURIComponent(`${artist} ${albumName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=20`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // Filter by exact artist match and exclude instrumental, deluxe, and remastered versions
      const filtered = data.results.filter(
        r =>
          r.artistName.toLowerCase() === artist.toLowerCase() &&
          !/instrumental|deluxe|remaster/i.test(r.collectionName)
      );

      // Find the exact match for the album name
      const exactMatch = filtered.find(
        r => r.collectionName.toLowerCase() === albumName.toLowerCase()
      );

      const album = exactMatch || filtered[0] || data.results[0];
      return album.artworkUrl100.replace('100x100', '500x500');
    }
  } catch (err) {
    console.error('Failed to fetch album art:', err);
  }

  // Fallback local image
  return '/album-covers/fallback.jpg';
}
