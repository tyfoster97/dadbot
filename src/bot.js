/**************************************************************************************
 * bot.js
 *
 * @version 2020.12.16
 * @author Ty Foster
 *
 * handles main bot execution
 */

/* EXTERNAL IMPORTS */
require('dotenv').config()
const fs = require('fs').promises
const path = require('path')
const { Client } = require('discord.js')
/* INTERNAL IMPORTS */
const { errlog, infolog } = require('./util/ILog')
const { isCmd, triggerJoke } = require('./util/IDadbot')

/* connect client */
const client = new Client()
/* get command prefix */
const PREFIX = process.env.PREFIX
/* handle bot login */
client.login(process.env.BOT_TOKEN)
/* track commands */

client.commands = new Map()
/* notify log that bot has logged in */
client.on('ready', () => {
  infolog(client, `${client.user.tag} has logged on`)
})

/* handle message parsing */
client.on('message', function (message) {
  /* if bot sent message -> do nothing */
  if (message.author.bot) return
  /* check if message starts with command prefix */
  if (isCmd(message)) {
    /* get command args */
    const cmdArgs = message.content.substring(message.content.indexOf(PREFIX) + 1).split(new RegExp(/[\s+\,+\-+]/))
    /* get command name from args */
    const cmdName = cmdArgs.shift()
    /* check if valid command */
    if (client.commands.get(cmdName)) {
      /* run */
      client.commands.get(cmdName).run(client, message, cmdArgs)
    }
  /* attempt to trigger joke */
  } else {
    triggerJoke(message)
  } // END IF

  /* handle discord errors */
  client.on('error', function (error) {
    errlog(client, message, error)
  })

  /* handle exception */
  process.on('uncaughtException', function (error) {
    errlog(client, message, error)
  })

  /* handle promise rejection */
  process.on('unhandledRejection', function (reason, promise) {
    errlog(client, message, reason)
  })
});

/**
 * Registers bot commands into a map
 * @param {string} dir the path to the directory with commands for the bot
 */
(async function registerCommands(dir = 'util') {
  /* read directory */
  const files = await fs.readdir(path.join(__dirname, dir))
  console.log(files)
  /* loop through files */
  for (let file of files) {
    const stat = await fs.lstat(path.join(__dirname, dir, file))
    /* if stat is a directory */
    if (stat.isDirectory()) {
      /* recursive method call */
      registerCommands(path.join(dir, file))
    } else {
      /* if the file is a js file */
      if (file.endsWith('.js')) {
        /* get command name */
        const cmdName = file.substring(0, file.indexOf('.js'))
        /* get command module */
        const cmdModule = require(path.join(__dirname, dir, file))
        /* map command names to modules */
        client.commands.set(cmdName, cmdModule)
        /* log that command was loaded */
      }
    }
  }
})()
