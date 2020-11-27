
function handleFileSelect(evt) {
  var f = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  reader.onload = (function(theFile) {
    return function(e) {
      var binaryData = e.target.result;
      //Converting Binary Data to base 64
      var base64String = window.btoa(binaryData);
	  console.log("base64String: " + base64String);
      var hash = CryptoJS.SHA256(base64String);
        var elem = document.getElementById("hash");
        elem.value = hash;
    };
  })(f);
  reader.readAsBinaryString(f);
}

document.getElementById('document').addEventListener('change', handleFileSelect, false);

