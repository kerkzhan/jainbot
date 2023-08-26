import cron from "node-cron";
import { fetchPosts } from "./fetchPosts";
import { sendDiscordEmbed } from "./jainbot";

console.log("Starting app...");
cron.schedule("0 0 * * *", async () => {
  console.log("Fetching RSS feed from fitgirl");
  const newPosts = await fetchPosts();
  sendDiscordEmbed(newPosts);
});
