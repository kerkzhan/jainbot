import fs from "fs";
import Parser from "rss-parser";
import { extractGameImage, extractGameInfo, getDifference } from "./util";
import { FormattedPost, Post } from "./types";

const LOCAL_FEED_FILE = "localFeed.json";
const parser = new Parser();

const getDifferenceAndFormat = (localFeed: Post[], latestFeed: Post[]) => {
  const newPosts = [
    ...getDifference(localFeed, latestFeed),
    ...getDifference(latestFeed, localFeed),
  ];

  const formattedPosts: FormattedPost[] = newPosts.flatMap((item) => {
    if (item.title === "Upcoming Repacks" || !item.contentSnippet.includes("Download Mirrors"))
      return [];

    let formattedPost: FormattedPost = {
      title: item.title,
      link: item.link,
      companies: [],
      genres: [],
      imageUrl: "",
    };
    const { companies, genres } = extractGameInfo(item.contentSnippet);
    const imageUrl = extractGameImage(item["content:encoded"]);
    formattedPost = { ...formattedPost, companies, genres, imageUrl };
    return formattedPost;
  });

  return formattedPosts;
};

export const fetchPosts = async () => {
  const feed = await parser.parseURL("https://fitgirl-repacks.site/feed/");

  if (!feed) throw new Error("Failed to fetch RSS feed");

  const latestFeed = feed.items as Post[];
  let localFeed = [] as Post[];

  if (fs.existsSync(LOCAL_FEED_FILE)) {
    localFeed = JSON.parse(fs.readFileSync(LOCAL_FEED_FILE).toString()).items;
  }

  // Save latest feed to local
  fs.writeFileSync("./localFeed.json", JSON.stringify(feed, null, 2), "utf-8");

  return getDifferenceAndFormat(localFeed, latestFeed);
};
