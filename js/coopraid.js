(function() {
	debugger;
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
	console.log('==analyzingURL==');
	var hash = location.hash;
	console.log('Get Hash : ' + hash);
	
	if(/coopraid/i.test(hash))
		coopraid();
	else if(/coopraid\/offer/i.test(hash))
		offer();
	else if(/coopraid\/room/i.test(hash))
		room();
}

function coopraid() {
	console.log('==Coopraid Stage==');
	$('.btn-join').trigger('tap');
	console.log($('.btn-join'));
	setTimeout(function(){
		//analyzingURL();
	}, 1000);
}

function offer() {
	console.log('==Offer Stage==');
	$('.prt-invite-type-1').trigger('tap');
	//$('.btn-usual-join').trigger('tap');
	$('.btn-usual-ok').trigger('tap');
	$('.btn-refresh-list').trigger('tap');
	setTimeout(function(){
		if(location.href == 'http://gbf.game.mbga.jp/#coopraid' || location.href == 'http://gbf.game.mbga.jp/#coopraid/offer')
			coopraid();
		else
			chrome.tabs.reload();
	}, 1000);
}

function room() {
	console.log('==Room Stage==');
}

/*
offer()
tap all
tap join
success:
  -goto room_not_selected()
faild:
  -tap ok - tap refresh_btn - goto offer()

room_not_selected()
tap select
goto selectMonster()

selectMonster()
tap any_monster
tap ok
goto room_selected()

room_selected()
tap ready
goto battle()

battle()
tap attack
success:
  -goto battle()
faild:
  -goto result()

result(): result || result_null || island
goto coopative()
*/