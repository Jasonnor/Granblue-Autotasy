chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.storage.sync.set({
    start: true
  }, function() {
    chrome.tabs.executeScript(null, {file: 'js/auto.js'});
  });
});
