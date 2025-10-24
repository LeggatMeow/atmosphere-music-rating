export async function fetchAlbumArt(albumName, artist = 'Atmosphere') {
  try {
    const query = encodeURIComponent(`${artist} ${albumName}`);
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=20`
    );
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      return '/album-covers/fallback.jpg';
    }

    // Only consider albums by the correct artist
    const artistMatches = data.results.filter(
      r => r.artistName.toLowerCase() === artist.toLowerCase()
    );

    // Filter out instrumental, deluxe, remaster versions
    const filtered = artistMatches.filter(
      r => !/instrumental|deluxe|remaster/i.test(r.collectionName)
    );

    // Find the album with the **closest match** to your title
    const exactMatch = filtered.find(
      r => r.collectionName.toLowerCase().includes(albumName.toLowerCase())
    );

    const album = exactMatch || filtered[0] || artistMatches[0] || data.results[0];

    return album.artworkUrl100.replace('100x100', '500x500');
  } catch (err) {
    console.error('Failed to fetch album art:', err);
    return '/album-covers/fallback.jpg';
  }
}
