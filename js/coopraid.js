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
		raidMulti();
	// /quest$/i.test(hash)
	else if(/result_multi/i.test(hash))
		resultMulti();
	else if(/coopraid/i.test(hash))
		coopraid();
	else if(/casino\/exchange/i.test(hash))
		exchange();
}

function resultMulti() {
	console.log('==Result Multi Stage==');
	if($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	else if($('.btn-control').length)
		$('.btn-control').trigger('tap');
	setTimeout(analyzingURL, 1000);
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
	if($('.prt-invite-type-1').length)
		$('.prt-invite-type-1').trigger('tap');
	else if($('.prt-invite-type-6').length)
		$('.prt-invite-type-6').trigger('tap');
	setTimeout(offerJoin, 100);
}

function offerJoin() {
	if($('.btn-usual-join').length)
		$('.btn-usual-join').trigger('tap');
	setTimeout(offerOK, 100);
}

function offerOK() {
	if($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	setTimeout(offerRefresh, 100);
}

function offerRefresh() {
	if($('.btn-refresh-list').length)
		$('.btn-refresh-list').trigger('tap');
	setTimeout(offerCancel, 100);
}

function offerCancel() {
	if($('.btn-usual-cancel').length)
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
	// Max Rabbit
	if($('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').trigger('tap');
	// Rabbit
	else if($('.prt-summon-image[data-image=2030026000]').length)
		$('.prt-summon-image[data-image=2030026000]').trigger('tap');
	// ExpKing
	// Max Grande
	else if($('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').trigger('tap');
	// Grande
	else if($('.prt-summon-image[data-image=2040065000]').length)
		$('.prt-summon-image[data-image=2040065000]').trigger('tap');
	/*// Max Mushroom
	else if($('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').trigger('tap');*/
	else if($('.prt-supporter-detail').length)
		$('.prt-supporter-detail').trigger('tap');
	setTimeout(function(){
		if($('.btn-usual-ok').length) {
			$('.btn-usual-ok').trigger('tap');
		}
		setTimeout(analyzingURL, 1000);
	}, 1000);
}

function raidMulti() {
	// To determine whether a single person
	if($('[class="current value"] + [class="current value num-info1"] + .value.num-info-slash').length) {
		raidMultiExplore();
		return;
	}
	console.log('==Raid Multi Stage==');
	if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
	}
	else if($('.btn-result').length) {
		$('.btn-result').trigger('tap');
	}
	setTimeout(analyzingURL, 1000);
}

function raidMultiExplore() {
	console.log('==Raid Multi Explore Stage==');
	if($('.btn-result').length) {
		$('.btn-result').trigger('tap');
	}
	if($('.btn-ability-available>div[ability-id=6001]').length) {
		$('.btn-ability-available>div[ability-id=6001]').trigger('tap');
		setTimeout(analyzingURL, 1000);
	}
	else if($('.btn-ability-available>div[ability-id=6002]').length) {
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
		setTimeout(analyzingURL, 1000);
	}
	else if($('.summon-on').length) {
		$('.summon-on').trigger('tap');
		setTimeout(function(){
			if($('.btn-summon-available').length) {
				$('.btn-summon-available').trigger('tap');
			}
			setTimeout(function(){
				if($('.btn-usual-ok.btn-summon-use').length) {
					$('.btn-usual-ok.btn-summon-use').trigger('tap');
				}
				setTimeout(analyzingURL, 1000);
			}, 500);
		}, 500);
	}
	else if($('.lis-character3>.prt-percent>span:first').html() == "100" && $('.btn-ability-available>div[ability-id=555]').length) {
		$('.btn-ability-available>div[ability-id=555]').trigger('tap');
		setTimeout(analyzingURL, 1000);
	}
	else if($('.btn-attack-start.display-on').length && $('#mkt_ability_use_bar>.prt-ability-list').length) {
		$('.btn-attack-start.display-on').trigger('tap');
		setTimeout(analyzingURL, 1000);
	}
}

function exchange() {
	console.log('==Exchange Stage==');
	if($('.btn-exchange').length) {
		$('.btn-exchange').trigger('tap');
	}
	setTimeout(function(){
		if($('.num-set').length) {
			// It doesn't work, try to fix it.
			$('.num-set').val($('.num-set>option:last-child').val())
		}
		setTimeout(function(){
			if($('.btn-usual-text.exchange').length) {
				$('.btn-usual-text.exchange').trigger('tap');
			}
			setTimeout(analyzingURL, 100);
			return;
		}, 300);
	}, 500);
}
