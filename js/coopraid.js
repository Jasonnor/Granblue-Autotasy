(function() {
	analyzingURL();
})();

Game.reportError = function(msg, url, line, column, err, callback){
	console.log(msg, url, line, column, err, callback);
	//if(url == 'http://gbf.game-a3.mbga.jp/assets/1455266321/js_light/view/coopraid/offer/index.js')
		location.reload();
};

//TODO: replace all time to randomTime(time)
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
			setTimeout(analyzingURL, 1000);
		}, 1000);
	}
	else if(/coopraid/i.test(hash))
		coopraid();
	else if(/casino\/exchange/i.test(hash))
		exchange();
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
	setTimeout(analyzingURL, 1000);
}

function offer() {
	console.log('==Offer Stage==');
	if($('.prt-wanted-list>div').length) {
		setTimeout(offerFind, 800);
		return;
	}
	setTimeout(analyzingURL, 100);
}

function offerFind() {
	if($('.prt-invite-type-1'))
		$('.prt-invite-type-1').trigger('tap');
	else if($('.prt-invite-type-6'))
		$('.prt-invite-type-6').trigger('tap');
	setTimeout(offerJoin, 100);
}

function offerJoin() {
	if($('.btn-usual-join'))
		$('.btn-usual-join').trigger('tap');
	setTimeout(offerOK, 100);
}

function offerOK() {
	if($('.btn-usual-ok'))
		$('.btn-usual-ok').trigger('tap');
	setTimeout(offerRefresh, 100);
}

function offerRefresh() {
	if($('.btn-refresh-list'))
		$('.btn-refresh-list').trigger('tap');
	setTimeout(offerCancel, 100);
}

function offerCancel() {
	if($('.btn-usual-cancel'))
		$('.btn-usual-cancel').trigger('tap');
	setTimeout(analyzingURL, 100);
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
	setTimeout(analyzingURL, 1000);
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
		setTimeout(analyzingURL, 1000);
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
	setTimeout(analyzingURL, 1000);
}

function exchange() {
	console.log('==Exchange Stage==');
	if($('.btn-exchange')) {
		$('.btn-exchange').trigger('tap');
	}
	setTimeout(function(){
		if($('.num-set')) {
			// It doesn't work, try to fix it.
			$('.num-set').val($('.num-set>option:last-child').val())
		}
		setTimeout(function(){
			if($('.btn-usual-text.exchange')) {
				$('.btn-usual-text.exchange').trigger('tap');
			}
			setTimeout(analyzingURL, 100);
			return;
		}, 300);
	}, 500);
}
