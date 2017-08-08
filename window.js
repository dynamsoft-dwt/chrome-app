var newWindowOffset = 100;
var version = window.navigator.appVersion;
version = version.substr(version.lastIndexOf('Chrome/') + 7);
version = version.substr(0, version.indexOf('.'));
version = parseInt(version);

var isFocusedSupported = version >= 33;

$ =
    function(selector) {
  return document.querySelector(selector);
}

function createNewWindow(optionsDictionary) {
  optionsDictionary = optionsDictionary || {};

  optionsDictionary.resizable = true;
  if (isFocusedSupported) optionsDictionary.focused = true;

  optionsDictionary.hidden = false;

  var innerBounds = chrome.app.window.current().innerBounds;
  innerBounds.left =
      (innerBounds.left + newWindowOffset) % (screen.width - innerBounds.width);
  innerBounds.top = (innerBounds.top + newWindowOffset) %
                    (screen.height - innerBounds.height);
  optionsDictionary.innerBounds = {};
  optionsDictionary.innerBounds.left = 50;
  optionsDictionary.innerBounds.top = 50;
  optionsDictionary.innerBounds.width = screen.width - 100;
  optionsDictionary.innerBounds.height = screen.height - 100;

  chrome.app.window.create(
      'webview.html', optionsDictionary, function(win) { win.show(); });
};

$('#viewer').onclick = function(e) {
  createNewWindow();
};