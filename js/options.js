$(document).ready(function () {
    Materialize.updateTextFields();
});

function loadOptions() {
    // Set default options
    chrome.storage.sync.get({
        toggle: true,
        userName: 'Jason'
    }, function (items) {
        document.getElementById('start').checked = items.toggle;
        document.getElementById('userName').value = items.userName;
        console.log('Load start options : ' + items.toggle);
        console.log('Load userName : ' + items.userName);
    });
}

function saveOptions() {
    var start = document.getElementById('start').checked;
    var userName = document.getElementById('userName').value;
    chrome.storage.sync.set({
        toggle: start,
        userName: userName
    }, function () {
        // Update status to let user know options were saved.
        console.log('Set start options as ' + start);
        console.log('Set userName as ' + userName);
        Materialize.toast('Options saved.', 4000, 'status');
    });
}

function clearOptions() {
    chrome.storage.sync.clear();
    location.reload();
}

document.addEventListener('DOMContentLoaded', function () {
    loadOptions();
    document.getElementById('save').addEventListener('click', saveOptions);
    document.getElementById('clear').addEventListener('click', clearOptions);
});
