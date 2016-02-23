chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.storage.sync.get({
		toggle: true
	}, function(item) {
		var toggle = !item.toggle;
		if (toggle) {
			chrome.browserAction.setIcon({
				path: 'on.png',
				tabId: null
			});
			chrome.tabs.executeScript(null, {
				file: 'js/auto.js'
			});
		} else {
			chrome.browserAction.setIcon({
				path: 'off.png',
				tabId: null
			});
		}
		chrome.storage.sync.set({
			toggle: toggle
		});
	});
});
