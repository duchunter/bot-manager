// All code copied from Auth0 express.js example

import decode from 'jwt-decode';
import Router from 'vue-router';
import auth0 from 'auth0-js';
import config from '../env.js';

const CLIENT_ID = config.CLIENT_ID;
const CLIENT_DOMAIN = config.CLIENT_DOMAIN;
const AUDIENCE = config.AUDIENCE;
const REDIRECT = config.REDIRECT;

const ACCESS_TOKEN_KEY = 'access_token';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    audience: AUDIENCE,
  });
}

var router = new Router({
   mode: 'history',
});

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isLoggedIn() {
  const accessToken = getAccessToken();
  return !!accessToken && !isTokenExpired(accessToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
