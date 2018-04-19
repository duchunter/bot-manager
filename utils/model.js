'use strict'

const data = ['email', 'msg', 'start', 'stop'];

export { getBotInfo, addBot, editBot, removeBot };

function getBotInfo(botName) {
  let bot = { name: botName };
  data.forEach(key => {
    bot[key] = window.localStorage.getItem(`${botName}_${key}`);
  });

  return bot;
}

function addBot(newBot) {
  if (!newBot.name) {
    alert('No enough data');
    return;
  }

  // Add new bot name to bot list
  let botList = window.localStorage.getItem('bot_list');
  window.localStorage.setItem(
    'bot_list', !botList ? newBot.name : `${botList}, ${newBot.name}`
  );

  // Save new bot info
  for (let key in newBot) {
    window.localStorage.setItem(`${newBot.name}_${key}`, newBot[key]);
  }

  alert('New bot added');
}

function editBot(botName, changes) {
  for (let key in changes) {
    changes[key] && window.localStorage.setItem(
      `${botName}_${key}`, changes[key]
    );
  }

  alert('Done');
}

function removeBot(botName) {
  // Delete data
  data.forEach(key => {
    window.localStorage.removeItem(`${botName}_${key}`);
  });

  // Remove from bot list
  let botList = window.localStorage.getItem('bot_list').split(', ');
  window.localStorage.setItem(
    'bot_list', botList.filter(name => name != botName).join(', ')
  );

  alert('Done');
}
