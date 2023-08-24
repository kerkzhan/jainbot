let Parser = require("rss-parser");
let parser = new Parser();
import fs from "fs";

type Post = {
  link: string;
  title: string;
  contentSnippet: string;
  "content:encoded": string;
};
(async () => {
  // const feed = await parser.parseURL("https://fitgirl-repacks.site/feed/");
  // fs.writeFileSync("./data.json", JSON.stringify(feed, null, 2), "utf-8");

  // ---- Mock data ------
  const oldData = JSON.parse(fs.readFileSync("data2.json").toString()).items;
  const newData = JSON.parse(fs.readFileSync("data.json").toString()).items;
  // ---- Mock data ------

  const items: Post[] = [...getDifference(oldData, newData), ...getDifference(newData, oldData)];

  const formattedPosts = items.flatMap((item: Post) => {
    if (item.title === "Upcoming Repacks" || !item.contentSnippet.includes("Download Mirrors"))
      return [];

    let formattedPost: any = { title: item.title, link: item.link };
    const { companies, genres } = extractGameInfo(item.contentSnippet);
    const imageUrl = extractGameImage(item["content:encoded"]);
    formattedPost = { ...formattedPost, companies, genres, imageUrl };
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

function extractGameImage(snippet: string): string | null {
  const imgTagRegex = /<img[^>]+src="([^">]+)"/;
  const imgTagMatch = snippet.match(imgTagRegex);

  if (imgTagMatch) {
    return imgTagMatch[1];
  }

  return null;
}

function getDifference(array1: any[], array2: any[]) {
  return array1.filter((object1) => !array2.some((object2) => object1.title === object2.title));
}
