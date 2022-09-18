const { Client, IntentsBitField, Partials } = require('discord.js')
const CH = require('kekofari-handler-2')
const path = require('path')
require('dotenv/config')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  console.log('The bot is ready!')

  new CH({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    testServers: ['842669631234768899'],
    botOwners: ['769909509325455381'],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME}',
      botOwnersBypass: false,
      dbRequired: 300, // 5 minutes
    },
    events: {
      dir: path.join(__dirname, 'events'),
    },
    validations: {
      runtime: path.join(__dirname, 'validations', 'runtime'),
      syntax: path.join(__dirname, 'validations', 'syntax'),
    },
  })
})

client.login(process.env.TOKEN)
