import { Client, EmbedBuilder, Events, GatewayIntentBits, TextChannel } from "discord.js";
import { FormattedPost } from "./types";
require("dotenv").config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const createdGameEmbed = (post: FormattedPost) => {
  return new EmbedBuilder()
    .setColor("DarkNavy")
    .setTitle(post.title)
    .setURL(post.link)
    .setThumbnail("https://i.imgur.com/EnLlGrV.png")
    .addFields(
      { name: "Companies", value: post.companies.join(", ") },
      { name: "Genre", value: post.genres.join(", ") }
    )
    .setImage(post.imageUrl)
    .setTimestamp();
};
export const sendDiscordEmbed = (posts: FormattedPost[]) => {
  client.once(Events.ClientReady, (c: Client) => {
    console.log(`Ready! Logged in as ${c.user?.tag}`);
  });

  client.login(process.env.CLIENT_TOKEN);

  client.on("ready", async () => {
    const channel = await client.channels
      .fetch(process.env.CHANNEL_ID || "")
      .then((chn) => chn as TextChannel);
    if (channel) {
      posts.forEach((post) => channel.send({ embeds: [createdGameEmbed(post)] }));
    }
  });
};
