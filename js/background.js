chrome.browserAction.onClicked.addListener(function (tab) {
	chrome.storage.sync.get({
		toggle: true
	}, function (item) {
		var toggle = !item.toggle;
		if (toggle) {
			chrome.browserAction.setIcon({
				path: 'src/icon/on.png',
				tabId: null
			});
			chrome.tabs.executeScript(null, {
				file: 'js/auto.js'
			});
		} else {
			chrome.browserAction.setIcon({
				path: 'src/icon/off.png',
				tabId: null
			});
		}
		chrome.storage.sync.set({
			toggle: toggle
		});
	});
});
chrome.extension.onMessage.addListener(function (message, sender, sendResponse) {
	if (message.type == 'getTabId' )
		sendResponse({ tabId: sender.tab.id });
});
