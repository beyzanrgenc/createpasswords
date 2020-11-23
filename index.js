function arrayBufferToWordArray(ab) {
  var i8a = new Uint8Array(ab);
  var a = [];
  for (var i = 0; i < i8a.length; i += 4) {
    a.push(i8a[i] << 24 | i8a[i + 1] << 16 | i8a[i + 2] << 8 | i8a[i + 3]);
  }
  return CryptoJS.lib.WordArray.create(a, i8a.length);
}

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  for (var i = 0, f; f = files[i]; i++) {
    var reader = new FileReader();

    reader.onloadend = (function(theFile) {
      return function(e) {
        var arrayBuffer = e.target.result;

        var hash = CryptoJS.SHA256(arrayBufferToWordArray(arrayBuffer));
        var elem = document.getElementById("hash");
        elem.value = hash;
      };

    })(f);
    reader.onerror = function(e) {
      console.error(e);
    };

    reader.readAsArrayBuffer(f);
  }
}

document.getElementById('document').addEventListener('change', handleFileSelect, false);

