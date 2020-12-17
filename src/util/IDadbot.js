/**************************************************************************************
 * IDadbot.js
 *
 * @version 2020.12.16
 * @author Ty Foster
 *
 * contains functions useful to Dadbot operation
 */
/***************************************
 * checks if the message contains a command
 *
 * @param {Message} message Discord Message
 */
function isCmd (message) {
  return message.content.toLowerCase().startsWith(process.env.PREFIX)
}

/***************************************
 * checks if message triggers dad joke
 *
 * @param {Message} message Discord Message
 */
function triggerJoke (message) {
  /* if message starts with im, i'm, or imma */
  if (
    message.content.toLowerCase().startsWith('im') ||
    message.content.toLowerCase().startsWith("i'm") ||
    message.content.toLowerCase().startsWith('i’m') ||
    message.content.toLowerCase().startsWith('imma')
  ) {
    /* tell joke, start phrase after 'i' */
    iamJoke(message, message.content.indexOf(' ') + 1)
  /* if message starts with i am */
  } else if (message.content.toLowerCase().startsWith('i am')) {
    /* tell joke, start phrase after 'i ' */
    iamJoke(message, message.content.indexOf(' ', 2) + 1)
  /* if message contains the word play */
  } else if (message.content.toLowerCase().indexOf('play') > 0) {
    message.channel.send('I hope you win child!')
  /* else no joke is triggered */
  }
}

/***************************************
 * tells i'm dadbot joke
 *
 * @param {Message} message Discord Message with the i am trigger
 * @param {number} idx the index in the message string to start substring from
 */
function iamJoke (message, idx) {
  /* get phrase */
  const phrase = message.content.substring(idx)
  /* send message */
  message.channel.send('Hi ' + phrase + ', I\'m Dadbot!')
}

module.exports = {
  isCmd,
  triggerJoke
}
