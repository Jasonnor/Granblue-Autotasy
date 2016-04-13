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

function onClickHandler(info, tab) {
	var code;
	if (info.menuItemId == 'toggle')
		code = 'toggleScript()';
	else if(info.menuItemId == 'clear')
		code = 'localStorage.clear()';
	else 
		code = 'localStorage.setItem(\'' + info.menuItemId + '\', ' + tab.id + ')';
	chrome.tabs.executeScript(tab.id, {code: code});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({'title': 'Set as Coopraid Workflow', 'id': 'coopraid'});
	chrome.contextMenus.create({'title': 'Set as Assist Workflow', 'id': 'assist'});
	chrome.contextMenus.create({'title': 'Set as Auto Event Workflow', 'id': 'autoEvent'});
	chrome.contextMenus.create({'title': 'Toggle Script On/Off in this tab', 'id': 'toggle'});
	chrome.contextMenus.create({'title': 'Clear Workflow', 'id': 'clear'});
});