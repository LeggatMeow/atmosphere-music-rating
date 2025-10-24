export async function fetchAlbumArt(albumName, artist = 'Atmosphere') {
  try {
    const query = encodeURIComponent(`${artist} ${albumName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=20`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      // First, filter by exact artist match
      const artistMatches = data.results.filter(
        r => r.artistName.toLowerCase() === artist.toLowerCase()
      );

      // Then, filter out unwanted versions (instrumental, deluxe, remaster)
      const filtered = artistMatches.filter(
        r =>
          !/instrumental/i.test(r.collectionName) &&
          !/deluxe/i.test(r.collectionName) &&
          !/remaster/i.test(r.collectionName)
      );

      const album = filtered[0] || artistMatches[0] || data.results[0];
      return album.artworkUrl100.replace('100x100', '500x500');
    }
  } catch (err) {
    console.error('Failed to fetch album art:', err);
  }

  // fallback local image
  return '/album-covers/fallback.jpg';
}
