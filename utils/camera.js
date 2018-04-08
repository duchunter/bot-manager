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
