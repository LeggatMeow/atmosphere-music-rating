export async function fetchAlbumLinks(title, artist) {
  try {
    const query = encodeURIComponent(`${title} ${artist}`);
const iTunesRes = await fetch(
  `https://itunes.apple.com/search?term=${query}&entity=album&limit=10`
);
const data = await iTunesRes.json();

let results = data.results || [];

// Filter OUT instrumental releases ✅
results = results.filter(r =>
  !/instrumental/i.test(r.collectionName)
);

// Prefer matches with correct album title ✅
let match = results.find(r =>
  r.collectionName.toLowerCase().includes(title.toLowerCase())
);

// If still ambiguous — pick earliest release (usually the vocal album) ✅
if (!match) {
  match = results.sort((a, b) =>
    (a.releaseDate > b.releaseDate ? 1 : -1)
  )[0];
}

const apple = match?.collectionViewUrl || null;


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
