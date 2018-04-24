'use strict'

// All key a bot object have
const keys = ['email', 'msg', 'start', 'stop'];

// All exported function
export { getBotInfo, addBot, editBot, removeBot };

// Get an bot object from localStorage with bot's name as condition
function getBotInfo(botName) {
  let bot = { name: botName };

  // Get other keys from localStorage in format botname_key
  for (let key of keys) {
    let value = window.localStorage.getItem(`${botName}_${key}`);
    // If bot has already stopped or not even set, delete start and stop
    if (key == 'stop') {
      if (!value || parseInt(value) < new Date().getTime()) {
        bot.start = null;
        bot.stop = null;
        continue;
      }
    }
    // Else set value
    bot[key] = value;
  }
  return bot;
}

// Add new bot
function addBot(newBot) {
  // Must have name
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


// Edit bot info in localStorage
function editBot(botName, changes) {
  for (let key in changes) {
    // Changes == NULL -> not apply
    if (!changes[key]) { continue; }

    // Change stop == set timer -> set start and stop
    if (key == 'stop') {
      if (changes.stop == 'null') {
        // 'null' here to bypass that upper condition :v
        // set to 'null' means bot has stopped
        window.localStorage.removeItem(`${botName}_stop`);
        window.localStorage.removeItem(`${botName}_start`);
        continue;
      }

      // Picker only return hh:mm, to get real time format --> next
      let picker = changes[key].split(':');

      // Get the start-of-the-day point
      let now = new Date();
      let stop = now.getTime(); // Now
      stop -= now.getHours() * 3600000; // Minus hour
      stop -= now.getMinutes() * 60000; // Minus min
      stop -= now.getSeconds() * 1000;  // Minus second
      if (now.getHours() > parseInt(picker[0])) {
        stop += 24 * 3600000; // Plush a day
      }

      // Plus picker to get real stop
      stop += parseInt(picker[0]) * 3600000 + parseInt(picker[1]) * 60000;

      // Save to localStorage
      window.localStorage.setItem(`${botName}_stop`, stop);
      if (!window.localStorage.getItem(`${botName}_start`)) {
        // Start not null means bot still working -> not set
        window.localStorage.setItem(`${botName}_start`, now.getTime());
      }
      
      continue;
    }

    // Other item -> just save
    window.localStorage.setItem(`${botName}_${key}`, changes[key]);
  }

  alert('Done');
}

// Remove a bot from localStorage
function removeBot(botName) {
  // Delete data first
  keys.forEach(key => {
    window.localStorage.removeItem(`${botName}_${key}`);
  });

  // Remove from bot list
  let botList = window.localStorage.getItem('bot_list').split(', ');
  window.localStorage.setItem(
    'bot_list', botList.filter(name => name != botName).join(', ')
  );

  alert('Done');
}
