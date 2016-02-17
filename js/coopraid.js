﻿(function() {
	analyzingURL();
})();

Game.reportError = function(msg, url, line, column, err, callback){
	console.log(msg, url, line, column, err, callback);
	location.reload();
};

// TODO: replace all time to randomTime(time)
function randomTime(time) {
	return time * (Math.ramdom() + 0.8);
}

// TODO: Read hidden input to enable script, using right menu to control
// TODO: Rubylottery 100 times
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
	else if(/result_multi/i.test(hash))
		resultMulti();
	else if(/coopraid/i.test(hash))
		coopraid();
	else if(/quest\/assist/i.test(hash))
		assist();
	else if(/casino\/exchange/i.test(hash))
		exchange();
	else
		setTimeout(analyzingURL, 5000);
}

function assist() {
	console.log('==Assist Stage==');
	if($('#tab-multi').length) {
		$('#tab-multi').trigger('tap');
		setTimeout(function(){
			// You can see pic of summon at src/assist
			if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000_hell]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040002000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040002000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040005000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040005000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040007000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040007000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040012000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040012000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040023000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040023000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040029000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040029000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040042000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040042000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040059000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040059000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040063000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040063000_ex]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040008000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040008000]').trigger('tap');
			else if($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040086000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040086000]').trigger('tap');
			else
				return;
			setTimeout(function(){
				if($('.prt-item-disp:last>.prt-use-button>.btn-use-full').length)
					$('.prt-item-disp:last>.prt-use-button>.btn-use-full').trigger('tap');
			}, 3000);
		}, 1000);
	}
	setTimeout(analyzingURL, 3000);
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

// TODO: Add roomname detect（順、待機、放置、隔離、ツーラー...）
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

// TODO: if others send stamp, send it.
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
	// You can see pic of supporter at src/supporter
	if($('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2030026000]').length)
		$('.prt-summon-image[data-image=2030026000]').trigger('tap');
	else if($('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2040025000]').length)
		$('.prt-summon-image[data-image=2040025000]').trigger('tap');
	else if($('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2040065000]').length)
		$('.prt-summon-image[data-image=2040065000]').trigger('tap');
	else if($('.prt-supporter-detail').length)
		$('.prt-supporter-detail').trigger('tap');
	setTimeout(function(){
		if($('.btn-usual-ok').length)
			$('.btn-usual-ok').trigger('tap');
		setTimeout(analyzingURL, 300);
	}, 200);
}

// TODO: Add a stop script button
// TODO: Add refresh button
function raidMulti() {
	if($('.btn-result').is(':visible')) {
		$('.btn-result').trigger('tap');
	}
	if(!$('.value.num-info-slash').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	// To determine whether a single person
	else if($('[class="current value"] + [class="current value num-info1"] + .value.num-info-slash').length) {
		raidMultiExplore();
		return;
	}
	console.log('==Raid Multi Stage==');
	if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
	}
	setTimeout(analyzingURL, 1000);
}

function raidMultiExplore() {
	console.log('==Raid Multi Explore Stage==');
	if($('.btn-summon-available[summon-code=2030026000]').length && $('.summon-on').length) {
		$('.summon-on').trigger('tap');
		setTimeout(function(){
			$('.btn-summon-available[summon-code=2030026000]').trigger('tap');
			setTimeout(function(){
				if($('.btn-usual-ok.btn-summon-use').length) {
					$('.btn-usual-ok.btn-summon-use').trigger('tap');
				}
			}, 500);
		}, 500);
	}
	else if($('.btn-summon-available[summon-code=2040025000]').length && $('.summon-on').length) {
		$('.summon-on').trigger('tap');
		setTimeout(function(){
			$('.btn-summon-available[summon-code=2040025000]').trigger('tap');
			setTimeout(function(){
				if($('.btn-usual-ok.btn-summon-use').length) {
					$('.btn-usual-ok.btn-summon-use').trigger('tap');
				}
			}, 500);
		}, 500);
	}
	// Bug: If can not use skill, will stop here
	else if($('.btn-ability-available>div[ability-id=6001]').length) {
		$('.btn-ability-available>div[ability-id=6001]').trigger('tap');
	}
	else if($('.btn-ability-available>div[ability-id=6002]').length) {
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
	}
	else if($('.lis-character3>.prt-percent>span:first').html() == '100' && $('.btn-ability-available>div[ability-id=555]').length) {
		$('.btn-ability-available>div[ability-id=555]').trigger('tap');
	}
	// Bug: if gran die, will nerver go here
	else if($('.btn-attack-start.display-on').length && 
		$('#mkt_ability_use_bar>.prt-ability-list').length && 
		$('.btn-ability-unavailable>div[ability-id=6001]').length && 
		$('.btn-ability-unavailable>div[ability-id=6002]').length && 
		!$('.btn-summon-available[summon-code=2030026000]').length && 
		!$('.btn-summon-available[summon-code=2040025000]').length) {
			$('.btn-attack-start.display-on').trigger('tap');
			setTimeout(function(){
				location.reload();
			}, 2000);
			return;
	}
	setTimeout(analyzingURL, 1500);
}

function resultMulti() {
	console.log('==Result Multi Stage==');
	if($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	else if($('.btn-control').length)
		$('.btn-control').trigger('tap');
	setTimeout(analyzingURL, 1000);
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
		}, 300);
	}, 500);
}
