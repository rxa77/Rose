const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "clientReady",
  once: true,

  async execute(client) {
    console.log(`✅ Logged in as ${client.user.tag}`);

    const channel = await client.channels
      .fetch(process.env.CHANNEL_ID)
      .catch(() => null);

    if (!channel) return;

    const embed = new EmbedBuilder()
      .setColor("#fffff")
      .setTitle("🌹 تم تشغيل Rose")
      .setDescription(
`السلام عليكم ورحمة الله وبركاته 🌸

يسعدنا إبلاغكم بأن **Rose** أصبح متصلاً وجاهزاً للعمل.

شكراً لكم على ثقتكم ودعمكم المستمر، ونتمنى أن نقدم لكم أفضل تجربة داخل السيرفر.

**الأوامر الأساسية**
> /help
> !help

نتمنى لكم وقتاً ممتعاً، ولا تترددوا في التواصل مع الإدارة عند الحاجة. 💜`
      )
      .setFooter({
        text: "Rose • Always Online 🌹",
      })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
  },
};
