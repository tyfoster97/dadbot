/**************************************************************************************
 * IEmbedFactory.js
 *
 * @version 2020.12.16
 * @author Ty Foster
 *
 * creates default message embeds
 */

const { MessageEmbed } = require('discord.js')

const INFO = '#FFFFFF'
const WARN = '#CCCC00'
const ERR = '#CC0000'

/***************************************
 * generates error embed message for log
 *
 * @param {Message} message the message sent in discord triggering the error
 * @param {Error} error the error that was thrown
 */
function errmsg (message, error) {
  return new MessageEmbed()
    .setColor(ERR)
    .setTitle('ERROR')
    .addFields(
      { name: 'User', value: `${message.author.tag}` },
      { name: 'Input', value: message.content },
      { name: 'Error', value: error.toString() },
      { name: 'Stacktrace', value: error.stack.toString() }
    )
}

/***************************************
 * generates info embed message for log
 *
 * @param {string} info information to log
 */
function infomsg (info) {
  return new MessageEmbed()
    .setColor(INFO)
    .setTitle('INFO')
    .setDescription(info)
}

/***************************************
 * generates wearning embed message for user
 *
 * @param {Message} message the message to reply to
 */
function warnmsg (message) {
  return new MessageEmbed()
    .setColor(WARN)
    .setTitle('WARNING')
    .setDescription('an unexpected error occured\nPlease try to execute that command later\nmessage will auto-delete after 60 seconds')
}

module.exports = {
  errmsg,
  infomsg,
  warnmsg
}
