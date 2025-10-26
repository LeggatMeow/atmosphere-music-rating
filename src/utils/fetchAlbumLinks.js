export async function fetchAlbumLinks(title, artist) {
  try {
    const query = encodeURIComponent(`${title} ${artist}`);
    const iTunesRes = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`
    );
    const data = await iTunesRes.json();
    const result = data.results?.[0];

    const apple = result?.collectionViewUrl || null;

    // ✅ Improved Spotify search link
    const spotifyQuery = encodeURIComponent(
      `album:"${title}" artist:"${artist}"`
    );
    const spotify = `https://open.spotify.com/search/${spotifyQuery}/albums`;

    // ✅ Future Option: YouTube Music too
    const youtubeQuery = encodeURIComponent(`${title} ${artist} album`);
    const youtube = `https://music.youtube.com/search?q=${youtubeQuery}`;

    return { apple, spotify, youtube };
  } catch (e) {
    console.warn("fetchAlbumLinks error:", e);
    return {};
  }
}
