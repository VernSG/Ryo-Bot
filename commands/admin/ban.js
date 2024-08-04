const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to ban')
        .setRequired(true)),
  adminOnly: true,
  execute: async (interaction) => {
    const user = interaction.options.getUser('user');

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
    }

    try {
      await interaction.guild.members.ban(user);
      await interaction.reply({ content: `${user.tag} has been banned from the server!`, ephemeral: true });
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while trying to ban the user.', ephemeral: true });
    }
  },
};
