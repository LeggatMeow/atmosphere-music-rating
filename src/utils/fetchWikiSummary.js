export async function fetchWikiSummary(query) {
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      query
    )}&format=json&origin=*`;

    const searchRes = await fetch(searchUrl);
    const searchData = await searchRes.json();
    const first = searchData?.query?.search?.[0];

    if (!first) return { summary: "", url: "" };

    const title = encodeURIComponent(first.title);

    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`;
    const summaryRes = await fetch(summaryUrl);
    const summaryData = await summaryRes.json();

    const summary = summaryData?.extract || "";
    const url = summaryData?.content_urls?.desktop?.page || "";

    return { summary, url };
  } catch (e) {
    console.warn("Wiki fetch failed:", e);
    return { summary: "", url: "" };
  }
}
