const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  handleButtonInteraction: async (interaction) => {
    if (interaction.customId === 'suggestion_button') {
      const modal = new ModalBuilder()
        .setCustomId('suggestion_modal')
        .setTitle('Suggestion!');

      const textInput = new TextInputBuilder()
        .setCustomId('suggestion_input')
        .setLabel('Pendapat')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Silahkan isi pendapatnya di sini')
        .setMinLength(6)
        .setMaxLength(1000)
        .setRequired(true);

      const row = new ActionRowBuilder().addComponents(textInput);
      modal.addComponents(row);

      await interaction.showModal(modal);
    }
  },

  handleModalSubmitInteraction: async (interaction) => {
    if (interaction.customId === 'suggestion_modal') {
      const suggestion = interaction.fields.getTextInputValue('suggestion_input');

      const embed = new EmbedBuilder()
        .setDescription(suggestion)
        .setColor('#8b5111')
        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL() });

      const targetChannel = interaction.guild.channels.cache.get('1264199823603798131'); // Ganti dengan ID channel tujuan
      await targetChannel.send({ embeds: [embed] });

      await interaction.reply({ content: 'Saran telah dikirim!', ephemeral: true });
    }
  }
};
