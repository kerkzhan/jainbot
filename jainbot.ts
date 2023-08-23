import { Client, EmbedBuilder, Events, GatewayIntentBits, TextChannel } from "discord.js";

require("dotenv").config();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c: Client) => {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
});

// Log in to Discord with your client's token
client.login(process.env.CLIENT_TOKEN);

const exampleEmbed = new EmbedBuilder()
  .setColor("DarkNavy")
  .setTitle("I'm back, bitches ❤️")
  .setURL("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
  // .setAuthor({
  //   name: "Kim Jain",
  //   iconURL: "https://i.imgur.com/AfFp7pu.png",
  //   url: "https://discord.js.org",
  // })
  // .setDescription("I was never gone ")
  // .setThumbnail("https://i.imgur.com/R6ktvCH.png")
  // .addFields(
  //   { name: "Regular field title", value: "Some value here" },
  //   { name: "\u200B", value: "\u200B" },
  //   { name: "Inline field title", value: "Some value here", inline: true },
  //   { name: "Inline field title", value: "Some value here", inline: true }
  // )
  // .addFields({ name: "Inline field title", value: "Some value here", inline: true })
  .setImage("https://i.imgur.com/wDtT50d.png")
  .setTimestamp();
// .setFooter({ text: "Some footer text here", iconURL: "https://i.imgur.com/AfFp7pu.png" });

client.on("ready", async () => {
  const channel = await client.channels
    .fetch("876921417931837450")
    .then((chn) => chn as TextChannel);
  if (channel) {
    channel.send({ embeds: [exampleEmbed] });
  }
});
// console.log(channel);

// if (channel) {
//   channel.send({ embeds: [exampleEmbed] });
// }
