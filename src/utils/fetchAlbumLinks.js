export async function fetchAlbumLinks(title, artist) {
  try {
    const query = encodeURIComponent(`${title} ${artist}`);
    
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`
    );
    const data = await res.json();
    const result = data.results?.[0];

    const appleLink = result?.collectionViewUrl || null;

    // Universal Spotify search (no API needed)
    const spotifyLink = `https://open.spotify.com/search/${encodeURIComponent(
      `${title} ${artist}`
    )}`;

    // **Future platform links go here**
    // Bandcamp search: https://bandcamp.com/search?q=${query}

    return {
      apple: appleLink,
      spotify: spotifyLink,
    };

  } catch (e) {
    console.warn("fetchAlbumLinks error:", e);
    return { apple: null, spotify: null };
  }
}
