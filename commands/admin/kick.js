const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server')
    .addUserOption(option =>
      option
        .setName('user')
        .setDescription('The user to kick')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('reason')
        .setDescription('The reason for kicking the user')
        .setRequired(false)),
  adminOnly: true,
  execute: async (interaction) => {
    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      return interaction.reply({ content: 'You do not have permission to use this command!', ephemeral: true });
    }

    try {
      const member = await interaction.guild.members.fetch(user.id);
      if (member) {
        await member.kick(reason);
        await interaction.reply({ content: `${user.tag} has been kicked from the server! Reason: ${reason}`, ephemeral: true });
      } else {
        await interaction.reply({ content: 'The user is not a member of this server.', ephemeral: true });
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'An error occurred while trying to kick the user.', ephemeral: true });
    }
  },
};
