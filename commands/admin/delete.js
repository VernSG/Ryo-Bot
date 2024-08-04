const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('delete')
    .setDescription('Delete all messages in this channel'),
    adminOnly: true,
  async execute(interaction) {
    const { Client, GatewayIntentBits, Partials, EmbedBuilder, AttachmentBuilder } = require('discord.js');
    const amount = interaction.options.getInteger('amount');

    try {
      const messages = await interaction.channel.bulkDelete(amount, true);
      await interaction.reply({ content: `Successfully deleted ${messages.size} messages.`, ephemeral: true });
    } catch (error) {
      console.error('Error deleting messages:', error);
      await interaction.reply({ content: 'There was an error deleting the messages.', ephemeral: true });
    }
  }
};