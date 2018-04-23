'use strict'

import axios from 'axios';
import { BOT_URL } from '../env';
import { isLoggedIn, getAccessToken } from './auth';

export { setTimer, stopTimer, updateTimer, sendLog }

const accessToken = {
  headers: { Authorization: `Bearer ${getAccessToken()}` }
};

async function setTimer(bot) {
  if (!isLoggedIn()) {
    alert('Please log in to continue');
    return false
  }

  let url = `${BOT_URL}/api/set`;
  let result;
  try {
    result = await axios.post(url, bot, accessToken);
  } catch (e) {
    if (!e.response) {
      alert(JSON.stringify(e));
    } else {
      alert(`${e.response.status} - ${e.response.data}`);
    }

    return false;
  }

  alert(`${result.status} - ${result.data}`);
  return true;
}

async function stopTimer(email) {
  if (!isLoggedIn()) {
    alert('Please log in to continue');
    return false
  }

  let url = `${BOT_URL}/api/stop`;
  let result;
  try {
    result = await axios.post(url, { email }, accessToken);
  } catch (e) {
    if (!e.response) {
      alert(JSON.stringify(e));
    } else {
      alert(`${e.response.status} - ${e.response.data}`);
    }

    result = null;
  }

  if (!result) { return false; }
  alert(`${result.status} - ${result.data}`);
  return true;
}

async function updateTimer(bot) {
  if (!isLoggedIn()) {
    alert('Please log in to continue');
    return false
  }

  let url = `${BOT_URL}/api/update`;
  let result;
  try {
    result = await axios.post(url, bot, accessToken);
  } catch (e) {
    if (!e.response) {
      alert(JSON.stringify(e));
    } else {
      alert(`${e.response.status} - ${e.response.data}`);
    }

    return false;
  }

  alert(`${result.status} - ${result.data}`);
  return true;
}

async function sendLog() {
  if (!isLoggedIn()) {
    alert('Please log in to continue');
    return false
  }

  let url = `${BOT_URL}/api/log`;
  let result;
  try {
    result = await axios.post(url, {}, accessToken);
  } catch (e) {
    if (!e.response) {
      alert(JSON.stringify(e));
    } else {
      alert(`${e.response.status} - ${e.response.data}`);
    }

    return false;
  }

  alert(`${result.status} - ${result.data}`);
  return true;
}
