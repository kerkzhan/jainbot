import cron from "node-cron";
import express from "express";
import { fetchPosts } from "./fetchPosts";
import { sendDiscordEmbed } from "./jainbot";

const app = express();
const PORT = 3000;

console.log("Starting app...");

cron.schedule(
  "0 0 * * *",
  async () => {
    console.log("Fetching RSS feed from fitgirl");
    const newPosts = await fetchPosts();
    sendDiscordEmbed(newPosts);
  },
  { scheduled: true, timezone: "Asia/Singapore", runOnInit: true }
);

app.listen(PORT, () => {
  console.log(`Application is listening to port ${PORT}.....`);
});
