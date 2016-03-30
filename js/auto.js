chrome.storage.sync.get({
	toggle: true
}, function (item) {
	if (item.toggle) {
		chrome.extension.sendMessage({ type: 'getTabId' }, function(res) {
			var tabId = res.tabId;
			var script = document.createElement('script');
			// https://cdn.rawgit.com/Jasonnor/Granblue-Autotasy/master/js/coopraid.js
			// https://rawgit.com/Jasonnor/Granblue-Autotasy/master/js/coopraid.js
			var url = chrome.extension.getURL('js/coopraid.js');
			var inner = "var tabId = " + tabId + ";" + 
				"function createScript() {" +
				"	var script = document.createElement('script');" +
				"	script.onerror = function(){location.reload()};" +
				"	script.src = '" + url + "';" +
				"	document.body.appendChild(script);" +
				"}" +
				"function init(){" +
				"   if(window.$ && $('.txt-popup-body:contains(未確認バトルを確認して下さい。)').is(':visible')) {" + 
				"	    $('.btn-usual-ok').trigger('tap');" + 
				"	}" + 
				"	if(window.$ && !$('#ready').is(':visible')) {" +
				"		setTimeout(createScript, 1000);" +
				"		console.log('Creating script ...');" +
				"	}" +
				"	else" +
				"		setTimeout(function(){init()}, 1000);" +
				"}" +
				"init();";
			script.innerHTML = inner;
			document.body.appendChild(script);
		});
	}
});
