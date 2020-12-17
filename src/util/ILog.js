/**************************************************************************************
 * ILog.js
 *
 * @version 2020.12.16
 * @author Ty Foster
 *
 * handles logging
 */

const { errmsg, infomsg, warnmsg } = require('./IEmbedFactory')

/***************************************
 * adds error message to log
 *
 * @param {Client} client Bot's Client
 * @param {Message} message Discord Message
 * @param {Error} error the error thrown
 */
function errlog (client, message, error) {
  client.channels.cache.get(process.env.LOG).send(errmsg(message, error))
  /* warn user */
  warnlog(message)
}

/***************************************
 * adds info message to log
 *
 * @param {Client} client Bot's Client
 * @param {string} info information to log
 */
function infolog (client, info) {
  client.channels.cache.get(process.env.LOG).send(infomsg(info))
}

/***************************************
 * adds warning message to user
 *
 * @param {Message} message Discord Message
 */
async function warnlog (message) {
  const m = await message.channel.send(warnmsg(message))
  await m.delete({ timeout: 60000 }).catch(err => console.log(err))
}

module.exports = {
  errlog,
  infolog
}
