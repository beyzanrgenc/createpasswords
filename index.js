
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

function ChangeVisibilityOfPassword() {
  var passwordSection = document.getElementById("hash");
  var pswrdIcon = document.getElementById("pswIcon");
  if (passwordSection.type === "password") {
    passwordSection.type = "text";
	pswrdIcon.className="fas fa-eye"
  } else {
    passwordSection.type = "password";
	pswrdIcon.className="fas fa-eye-slash"
  }
}

function copyToClipboard() {
  var copyText = document.getElementById("hash");
  var isPassword = false;
  if (copyText.type === "password") {
    copyText.type = "text";
	isPassword = true;
  } 
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
  if(isPassword)
	copyText.type = "password";
}