// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import auth0 from 'auth0-js';

Vue.config.productionTip = false;

var auth = new auth0.WebAuth({
  clientID: '7V1pVHASnLjlxJY8F7UBCBDoqsZ35aU0',
  domain: 'gangplank.auth0.com'
});

function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: 'com.gp.botmanager://gangplank.auth0.com/cordova/com.gp.botmanager/callback',
    audience: 'https://log.com',
  });
}

function takePicture() {
  try {
    navigator.camera.getPicture(imgData => {
      alert(imgData);
    }, err => {
      alert(JSON.stringify(err));
    }, {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL
    });
  } catch (err) {
    alert(err);
  }
}

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  methods: {
    takePicture,
    login
  }
});
