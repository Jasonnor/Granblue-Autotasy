(function() {
	//loadOptions(init);
	analyzingURL();
})();

function init(start) {
	if (start === true)
		analyzingURL();
}

function loadOptions(callback) {
	chrome.storage.sync.get({
		start: false
	}, function(items) {
		console.log('Load start options : ' + items.start);
		callback(items.start);
	});
}

function randomTime(time) {
	return time * (Math.ramdom() + 0.8);
}

function analyzingURL() {
	console.log('==Analyzing URL==');
	var hash = location.hash;
	console.log('Get Hash : ' + hash);
	if(/coopraid\/offer/i.test(hash))
		offer();
	else if(/coopraid\/room/i.test(hash))
		room();
	else if(/supporter/i.test(hash))
		supporter();
	else if(/raid_multi/i.test(hash))
		raid_multi();
	else if(/result_multi/i.test(hash) || /quest$/i.test(hash)) {
		setTimeout(function(){
			console.log('==Result Multi Stage==');
			location.href = "http://gbf.game.mbga.jp/#coopraid";
			setTimeout(function(){
				analyzingURL();
			}, 1000);
		}, 1000);
	}
	else if(/coopraid/i.test(hash))
		coopraid();
}

function coopraid() {
	console.log('==Coopraid Stage==');
	if($('.btn-join').length)
		$('.btn-join').trigger('tap');
	else if($('.prt-result-head head-win').length) {
		setTimeout(function(){
			location.reload();
		}, 1000);
	}
	setTimeout(function(){
		analyzingURL();
	}, 1000);
}

function offer() {
	console.log('==Offer Stage==');
	setTimeout(function(){
		if($('.prt-invite-type-1'))
			$('.prt-invite-type-1').trigger('tap');
		if($('.btn-usual-join'))
			$('.btn-usual-join').trigger('tap');
		if($('.btn-usual-ok'))
			$('.btn-usual-ok').trigger('tap');
		if($('.btn-refresh-list'))
			$('.btn-refresh-list').trigger('tap');
		if($('.btn-usual-cancel'))
			$('.btn-usual-cancel').trigger('tap');
	}, 700);
	setTimeout(function(){
		analyzingURL();
	}, 300);
}

function room() {
	console.log('==Room Stage==');
	if($('.btn-make-ready-large.not-ready').length) {
		$('.btn-make-ready-large.not-ready').trigger('tap');
	}
	else if($('.btn-execute-ready.se-ok').length) {
		$('.btn-execute-ready.se-ok').trigger('tap');
		//btn-retraction-ready
	}
	setTimeout(function(){
		analyzingURL();
	}, 1000);
}

function supporter() {
	console.log('==Supporter Stage==');
	if($('.prt-supporter-detail').length) {
		$('.prt-supporter-detail').trigger('tap');
	}
	setTimeout(function(){
		if($('.btn-usual-ok').length) {
			$('.btn-usual-ok').trigger('tap');
		}
		setTimeout(function(){
			analyzingURL();
		}, 1000);
	}, 1000);
}

function raid_multi() {
	console.log('==Raid Multi Stage==');
	if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
	}
	else if($('.btn-result').length) {
		$('.btn-result').trigger('tap');
	}
	setTimeout(function(){
		analyzingURL();
	}, 1000);
}
