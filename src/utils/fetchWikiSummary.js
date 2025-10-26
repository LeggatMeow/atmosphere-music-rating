export async function fetchWikiSummary(query) {
  try {
    // 🔍 Search Wikipedia for relevant pages
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&format=json&origin=*`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const first = searchData?.query?.search?.[0];

    if (!first) return "";

    // ✅ Use Title returned by Wikipedia
    const title = encodeURIComponent(first.title);

    // 📘 Fetch summary for matched title
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData = await summaryRes.json();

    return summaryData?.extract || "";
  } catch (e) {
    console.warn("Wiki fetch failed:", e);
    return "";
  }
}
