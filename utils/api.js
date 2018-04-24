'use strict'

import axios from 'axios';
import { BOT_URL } from '../env';
import { isLoggedIn, getAccessToken } from './auth';

// All exported functions
export { setTimer, stopTimer, updateTimer, sendLog }

// Send data to server to start bot
async function setTimer(bot) {
  return await sendRequest(`${BOT_URL}/api/set`, bot);
}

// Stop running timer
async function stopTimer(email) {
  return await sendRequest(`${BOT_URL}/api/stop`, { email });
}

// Change info like stop or msg while bot is running
async function updateTimer(bot) {
  return await sendRequest(`${BOT_URL}/api/update`, bot);
}

// Request server to send log to DB
async function sendLog() {
  return await sendRequest(`${BOT_URL}/api/log`, {});
}

// All api are POST -> use same axios function here
async function sendRequest(url, data) {
  // Check accessToken
  if (!isLoggedIn()) {
    alert('Please log in to continue');
    return false
  }

  // Get accessToken for Authorization header
  const accessToken = {
    headers: { Authorization: `Bearer ${getAccessToken()}` }
  };

  // Handle axios promise, value returned will be true/false only
  let result;
  try {
    result = await axios.post(url, data, accessToken);
  } catch (e) {
    if (!e.response) {
      // Handle non-server error like no internet connection
      alert(JSON.stringify(e));
    } else {
      // Handle server error like 404 or 500
      alert(`${e.response.status} - ${e.response.data}`);
    }

    result = null;
  }

  // Return true/false
  if (!result) { return false; }
  alert(`${result.status} - ${result.data}`);
  return true;
}
