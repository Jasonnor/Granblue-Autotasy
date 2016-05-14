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
	else if(info.menuItemId == 'clear') {
		code = 'if(localStorage.coopraid == ' + tab.id + ') localStorage.removeItem("coopraid");';
		code += 'if(localStorage.assist == ' + tab.id + ') localStorage.removeItem("assist");';
		code += 'if(localStorage.autoEvent == ' + tab.id + ') localStorage.removeItem("autoEvent");';
		code += 'if(localStorage.autoExtraEvent == ' + tab.id + ') localStorage.removeItem("autoExtraEvent");';
		code += 'if(localStorage.autoExtra == ' + tab.id + ') localStorage.removeItem("autoExtra");';
		code += 'if(localStorage.magna == ' + tab.id + ') localStorage.removeItem("magna");';
	}
	else if(info.menuItemId == 'clearAll') {
		code = 'localStorage.removeItem("coopraid");';
		code += 'localStorage.removeItem("assist");';
		code += 'localStorage.removeItem("autoEvent");';
		code += 'localStorage.removeItem("autoExtraEvent");';
		code += 'localStorage.removeItem("autoExtra");';
		code += 'localStorage.removeItem("magna");';
	}
	else {
		code = 'if(localStorage.coopraid == ' + tab.id + ') localStorage.removeItem("coopraid");';
		code += 'if(localStorage.assist == ' + tab.id + ') localStorage.removeItem("assist");';
		code += 'if(localStorage.autoEvent == ' + tab.id + ') localStorage.removeItem("autoEvent");';
		code += 'if(localStorage.autoExtraEvent == ' + tab.id + ') localStorage.removeItem("autoExtraEvent");';
		code += 'if(localStorage.autoExtra == ' + tab.id + ') localStorage.removeItem("autoExtra");';
		code += 'if(localStorage.magna == ' + tab.id + ') localStorage.removeItem("magna");';
		code += 'localStorage.setItem(\'' + info.menuItemId + '\', ' + tab.id + ')';
	}
	chrome.tabs.executeScript(tab.id, {code: code});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({'title': 'Set as Coopraid Workflow', 'id': 'coopraid', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Set as Assist Workflow', 'id': 'assist', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Set as Auto Event Workflow', 'id': 'autoEvent', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Set as Auto Extra Event Workflow', 'id': 'autoExtraEvent', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Set as Auto Extra Workflow', 'id': 'autoExtra', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Set as Magna Workflow', 'id': 'magna', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Toggle Script On/Off in this tab', 'id': 'toggle', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Clear Workflow of this tab', 'id': 'clear', 'contexts': ['all']});
	chrome.contextMenus.create({'title': 'Clear Workflow of all tab', 'id': 'clearAll', 'contexts': ['all']});
});