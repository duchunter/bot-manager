'use strict'

const data = ['email', 'msg', 'start', 'stop'];

export { getBotInfo, addBot, editBot, removeBot };

function getBotInfo(botName) {
  let bot = { name: botName };
  data.forEach(key => {
    let value = window.localStorage.getItem(`${botName}_${key}`);
    if (key == 'stop') {
      if (!value || parseInt(value) < new Date().getTime()) {
        bot.start = null;
        bot.stop = null;
        return;
      }
    }

    bot[key] = value;
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
    // Changes == NULL -> not apply
    if (!changes[key]) { continue; }

    // Change stop == set timer -> set start and stop
    if (key == 'stop') {
      if (changes.stop == 'null') {
        window.localStorage.removeItem(`${botName}_stop`);
        window.localStorage.removeItem(`${botName}_start`);
        continue;
      }

      let picker = changes[key].split(':');

      // Get the start-of-the-day point
      let now = new Date();
      let stop = now.getTime();
      stop -= now.getHours() * 3600000;
      stop -= now.getMinutes() * 60000;
      stop -= now.getSeconds() * 1000;
      if (now.getHours() < parseInt(picker[0])) {
        stop += 24 * 3600000;
      }

      // Plus picker to get real stop
      stop += parseInt(picker[0]) * 3600000 + parseInt(picker[1]) * 60000;

      // Save to localStorage
      window.localStorage.setItem(`${botName}_stop`, stop);
      if (!window.localStorage.getItem(`${botName}_start`)) {
        window.localStorage.setItem(`${botName}_start`, now.getTime());
      }

      continue;
    }

    // Other item -> just save
    window.localStorage.setItem(`${botName}_${key}`, changes[key]);
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
