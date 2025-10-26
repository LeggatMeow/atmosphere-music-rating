export async function fetchAlbumLinks(title, artist) {
  try {
    const query = encodeURIComponent(`${title} ${artist}`);

    // First: iTunes album search
    const res = await fetch(
      `https://itunes.apple.com/search?term=${query}&entity=album&limit=1`
    );
    const data = await res.json();
    const result = data.results?.[0];
    if (!result) return {};

    const appleUrl = result.collectionViewUrl;
    const collectionId = result.collectionId;

    // Second: Song.link — universal platform resolver
    const odesliRes = await fetch(
      `https://api.song.link/v1-alpha.1/links?platform=itunes&type=album&id=${collectionId}`
    );
    const odesliData = await odesliRes.json();

    const linksByPlatform = odesliData.linksByPlatform || {};

    return {
      apple: linksByPlatform.appleMusic?.url || null,
      spotify: linksByPlatform.spotify?.url || null,
      youtube: linksByPlatform.youtubeMusic?.url || null,
    };

  } catch (e) {
    console.warn("fetchAlbumLinks error:", e);
    return {};
  }
}
