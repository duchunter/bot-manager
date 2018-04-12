// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name, url) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(url);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
function setAccessToken(url) {
  let accessToken = getParameterByName('access_token', url);
  window.localStorage.setItem('access_token', accessToken);
}

// Handle callback
handleOpenURL = function (url) {
  setAccessToken(url);
};

// Initialize
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

app.initialize();
