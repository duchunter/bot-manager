'use strict'

//file system function

function error(err){
  alert(JSON.stringify(err));
}

export function writeFile(filename, content, msg = "Write complete"){
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, dir => {
    dir.getFile(filename, {create: true}, fileEntry => {
      fileEntry.createWriter(fileWriter => {
        fileWriter.onwriteend = e => {
          alert(msg);
        }

        fileWriter.onerror = e => {
          alert("Error: " + JSON.stringify(e);
        }

        let blob = new Blob([content], {type: 'text/plain'});
        fileWriter.write(blob);
      }, error);
    }, error);
  }, error);
}

export function readFile(filename, obj) {
  window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, dir => {
    dir.getFile(filename, {}, fileEntry => {
      fileEntry.file(file => {
        let reader = new FileReader();
        reader.onloadend = e => {
          let fileContent = JSON.parse(this.result);
          Object.keys(fileContent).forEach(key => {
            obj[key] = fileContent[key];
          });
        }

        reader.readAsText(file);
      }, error);
    }, error);
  }, error);
}
