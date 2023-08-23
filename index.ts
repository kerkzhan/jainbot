let Parser = require("rss-parser");
let parser = new Parser();

type Post = {
  link: string;
  title: string;
  contentSnippet: string;
};
(async () => {
  let feed = await parser.parseURL("https://fitgirl-repacks.site/feed/");

  const items: Post[] = feed.items;

  const formattedPosts = items.flatMap((item: Post) => {
    if (item.title === "Upcoming Repacks") return [];
    let formattedPost: any = { title: item.title, link: item.link };
    const { companies, genres } = extractGameInfo(item.contentSnippet);
    formattedPost = { ...formattedPost, companies, genres };
    return formattedPost;
  });
  console.log(formattedPosts);
})();

function extractGameInfo(snippet: string): {
  genres: string[];
  companies: string[];
} {
  const genresRegex = /Genres\/Tags: (.*?) (Companies|Company):/;
  const companiesRegex = /(Companies|Company): (.*?)( Language| Original Size)/;

  const genresMatch = snippet.match(genresRegex);
  const companiesMatch = snippet.match(companiesRegex);

  const genres = genresMatch ? genresMatch[1].trim().split(", ") : [];
  const companies = companiesMatch ? companiesMatch[2].trim().split(",") : [];

  return {
    genres,
    companies,
  };
}

// const gameInfo = extractGameInfo(snippet);
// console.log(gameInfo);
