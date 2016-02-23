function loadOptions() {
	// Set default options
	chrome.storage.sync.get({
		toggle: true
	}, function(items) {
		document.getElementById('start').checked = items.toggle;
		console.log('Load start options : ' + items.toggle);
	});
}

function saveOptions() {
	var start = document.getElementById('start').checked;
	chrome.storage.sync.set({
		toggle: start
	}, function() {
		// Update status to let user know options were saved.
		console.log('Set start options as ' + start);
		Materialize.toast('Options saved.', 4000, 'status');
	});
}

function clearOptions() {
	chrome.storage.sync.clear();
	location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
	loadOptions();
	document.getElementById('save').addEventListener('click', saveOptions);
	document.getElementById('clear').addEventListener('click', clearOptions);
});
