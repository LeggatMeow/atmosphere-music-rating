export async function fetchAlbumArt(albumName, artist = 'Atmosphere') {
  try {
    const query = encodeURIComponent(`${artist} ${albumName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=10`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // Filter out "instrumental" or alternate versions
      const filtered = data.results.filter(
        r =>
          !/instrumental/i.test(r.collectionName) &&
          !/deluxe/i.test(r.collectionName) &&
          !/remaster/i.test(r.collectionName)
      );

      const album = filtered[0] || data.results[0]; // fallback to first result
      return album.artworkUrl100.replace('100x100', '500x500');
    }
  } catch (err) {
    console.error('Failed to fetch album art:', err);
  }

  // Fallback local image
  return '/album-covers/fallback.jpg';
}