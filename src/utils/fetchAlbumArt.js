export async function fetchAlbumArt(albumName, artist = 'Atmosphere') {
  try {
    const query = encodeURIComponent(`${artist} ${albumName}`);
    const res = await fetch(`https://itunes.apple.com/search?term=${query}&entity=album&limit=1`);
    const data = await res.json();
    if (data.results && data.results.length > 0) {
      // get 500x500 image
      return data.results[0].artworkUrl100.replace('100x100', '500x500');
    }
  } catch (err) {
    console.error('Failed to fetch album art', err);
  }
  return '/album-covers/fallback.jpg'; // local fallback
}
