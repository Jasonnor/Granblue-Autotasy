(function() {
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
	else if(/quest\/stage/i.test(hash))
		stageRolling();
	else if(/raid/i.test(hash))
		raid();
	else if(/result/i.test(hash))
		resultMulti();
	else if(/casino\/exchange/i.test(hash))
		exchange();
	else
		setTimeout(analyzingURL, 5000);
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
	var room = $('.txt-room-comment:not(:contains(順)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-1)');
	var room2 = $('.txt-room-comment:not(:contains(順)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-6)');
	if(room.length)
		room.trigger('tap');
	else if(room2.length)
		room2.trigger('tap');
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
// TODO: Add a leave room button
function room() {
	console.log('==Room Stage==');
	if($('.btn-make-ready-large.not-ready').length) {
		$('.btn-make-ready-large.not-ready').trigger('tap');
	}
	else if($('.btn-execute-ready.se-ok').length) {
		$('.btn-execute-ready.se-ok').trigger('tap');
	}
	setTimeout(analyzingURL, 1000);
}

function supporter() {
	console.log('==Supporter Stage==');
	var isMainStoryline = /supporter\/\d{3}/i.test(location.hash);
	// You can see pic of supporter at src/supporter
	var isEventForEarth = /supporter\/708491/i.test(location.hash) || /supporter\/708501/i.test(location.hash);
	var isEventForWind = false;
	var isEventForFire = false;
	var isEventForWater = false;
	var isEventForLight = false;
	var isEventForDark = false;
	if($('.prt-deck-select').is(':visible'))
		console.log('Team selected.');
	// Event for water enemy
	else if(isEventForEarth) {
		// 80% + 20%hp
		if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(土):not(:contains(「大地」))').trigger('tap');
		// 80%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(土):not(:contains(「大地」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(土):not(:contains(「大地」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').trigger('tap');
	}
	else if(isEventForWind) {
		// 80%
		if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 70%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').trigger('tap');
	}
	else if(isEventForFire) {
		// 80%
		if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').trigger('tap');
		// 70%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').trigger('tap');
	}
	else if(isEventForWater) {
		// 80% + 20%hp
		if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 80%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').trigger('tap');
	}
	else if(isEventForLight) {
		// 120%
		if($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 100%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 80% + 20%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 80%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 75% + 15%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 75%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 50% + 20%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').trigger('tap');
	}
	else if(isEventForDark) {
		// 120%
		if($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 100%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 75% + 15%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 75%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 60% + 40%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 60%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 50% + 20%hp
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 50%
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 100% Anima
		else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').trigger('tap');
	}
	// Rabbit Exp & Treasure
	else if($('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2030026000]').length)
		$('.prt-summon-image[data-image=2030026000]').trigger('tap');
	// Mushroom RM
	else if(isMainStoryline && $('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').trigger('tap');
	else if(isMainStoryline && $('.prt-summon-image[data-image=2030051000]').length)
		$('.prt-summon-image[data-image=2030051000]').trigger('tap');
	// Exp King
	else if($('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2040025000]').length)
		$('.prt-summon-image[data-image=2040025000]').trigger('tap');
	// Grande
	else if($('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').trigger('tap');
	else if($('.prt-summon-image[data-image=2040065000]').length)
		$('.prt-summon-image[data-image=2040065000]').trigger('tap');
	// 火80%
	else if($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').trigger('tap');
	// 火70%
	else if($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').trigger('tap');
	// 火60%
	else if($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').trigger('tap');
	// 火100% Anima
	else if($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').trigger('tap');
	// 火50%
	else if($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').trigger('tap');
	// Others
	else if($('.prt-supporter-detail').length)
		$('.prt-supporter-detail').trigger('tap');
	setTimeout(function(){
		if(isEventForEarth) {
			$('li>a>.ico-attribute-3').click();
			setTimeout(function(){
				if($('.btn-usual-ok').length && $('li>a.flex-active>.ico-attribute-3').length)
					$('.btn-usual-ok').trigger('tap');
				setTimeout(analyzingURL, 300);
			}, 800);
		}
		else {
			$('li>a>.ico-attribute-1:first').click();
			setTimeout(function(){
				if($('.btn-usual-ok').length && $('li>a.flex-active>.ico-attribute-1').length)
					$('.btn-usual-ok').trigger('tap');
				setTimeout(analyzingURL, 300);
			}, 800);
		}
	}, 200);
}

// TODO: Add a stop script button
// TODO: Add refresh button
function raidMulti() {
	if($('.btn-result').is(':visible')) {
		$('.btn-result').trigger('tap');
	}
	if(!$('.value.num-info-slash').is(':visible') || !$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	// To determine whether a single person
	if($('[class="current value"] + [class="current value num-info1"] + .value.num-info-slash').length) {
		raidMultiSingle();
		return;
	}
	var isCoopraid = $('.value.num-info-slash + [class="max value"] + [class="max value num-info4"]').length;
	if(isCoopraid) {
		console.log('==Raid Coopraid Stage==');
		if($('.btn-lock.lock1').length) {
			$('.btn-lock.lock1').trigger('tap');
		}
		//TODO: Add hard mode
	}
	else {
		console.log('==Raid Multi Stage==');
		if(!masterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
	}
	setTimeout(analyzingURL, 1000);
}

function raidMultiSingle() {
	// Send stamp to get large-solution
	if($('.btn-chat:not(.comment)>.ico-attention').is(':visible')) {
		$('.btn-chat:not(.comment)>.ico-attention').trigger('tap');
		setTimeout(function(){
			if($('.lis-stamp[chatid=19]').length)
				$('.lis-stamp[chatid=19]').trigger('tap');
			if($('.btn-usual-close').length)
				$('.btn-usual-close').trigger('tap');
			setTimeout(analyzingURL, 1200);
		}, 1000);
		return;
	}
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if(enemyTotal > 1300000) {
		console.log('==Raid Multi Single-Hard Stage==');
		var enemyHp = $('.hp-show:first>span').html().split('<br>')[1].replace('%', '');
		// If enemy's HP is lower than 60%, send assist
		if(enemyHp < 60 && !$('.btn-assist.disable').length) {
			$('.btn-assist').trigger('tap');
			setTimeout(function(){
				if($('.btn-usual-text:contains(救援依頼)').length)
					$('.btn-usual-text:contains(救援依頼)').trigger('tap');
				setTimeout(function(){
					if($('.btn-usual-ok').length)
						$('.btn-usual-ok').trigger('tap');
					$('.btn-usual-cancel').trigger('tap');
					setTimeout(analyzingURL, 500);
				}, 1000);
			}, 1000);
			return;
		}
		else if(!masterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
		else if($('.summon-on').length) {
			$('.summon-on').trigger('tap');
			setTimeout(function(){
				$('.btn-summon-available').trigger('tap');
				setTimeout(function(){
					if($('.btn-usual-ok.btn-summon-use').length) {
						$('.btn-usual-ok.btn-summon-use').trigger('tap');
					}
					if($('.btn-usual-cancel').length) {
						$('.btn-usual-cancel').trigger('tap');
					}
				}, 500);
			}, 500);
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Use all skill expect yoda's and blackmeat's charging, order : yellow(3) > green(2) > blue(4) > red(1)
		else if($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		else if($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		else if($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		else if($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=5322]):not([ability-id=2172]):not([ability-id=3173]):not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	else {
		console.log('==Raid Multi Single-Easy Stage==');
		if(!masterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	// Summon
	if($('.btn-summon-available[summon-code=2030026000]').length && $('.summon-on').length) {
		$('.summon-on').trigger('tap');
		setTimeout(function(){
			$('.btn-summon-available[summon-code=2030026000]').trigger('tap');
			setTimeout(function(){
				if($('.btn-usual-ok.btn-summon-use').length) {
					$('.btn-usual-ok.btn-summon-use').trigger('tap');
				}
				if($('.btn-usual-cancel').length) {
					$('.btn-usual-cancel').trigger('tap');
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
				if($('.btn-usual-cancel').length) {
					$('.btn-usual-cancel').trigger('tap');
				}
			}, 500);
		}, 500);
	}
	// Bug: If can not use skill, will stop here
	else if($('.btn-ability-available>div[ability-id=6001]').length > 1) {
		$('.btn-ability-available>div[ability-id=6001]').trigger('tap');
	}
	else if($('.btn-ability-available>div[ability-id=6002]').length > 1) {
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
	}
	else if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
	}
	setTimeout(analyzingURL, 1500);
}

var smallSolution = -1;
var largeSolution = -1;

function masterYoda() {
	if($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/npc/raid_normal/3040064000_02.jpg"])').length) {
		console.log('smallSolution : ' + smallSolution);
		if(smallSolution == -1 || smallSolution == undefined || largeSolution == -1 || largeSolution == undefined) {
			$('.btn-temporary').trigger('tap');
			setTimeout(function(){
				smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
				largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
				if($('.btn-usual-cancel').length)
					$('.btn-usual-cancel').trigger('tap');
			}, 1000);
			return false;
		}
		console.log('smallSolution : ' + smallSolution);
		var hp = 100 * parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
		if(hp <= 50 && (smallSolution > 0 || largeSolution > 0)) {
			$('.btn-temporary').trigger('tap');
			setTimeout(function(){
				smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
				largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
				if($('.lis-item.item-small.btn-temporary-small:not(.disable)>img').length) {
					$('.lis-item.item-small.btn-temporary-small>img').trigger('tap');
					setTimeout(function(){
						if($('.lis-character3:first').length) {
							$('.lis-character3:first').trigger('tap');
						}
						if($('.btn-usual-cancel').length) {
							$('.btn-usual-cancel').trigger('tap');
						}
					}, 2000);
				}
				else if($('.lis-item.item-large.btn-temporary-large:not(.disable)>img').length) {
					$('.lis-item.item-large.btn-temporary-large>img').trigger('tap');
					setTimeout(function(){
						if($('.btn-usual-use').length) {
							$('.btn-usual-use').trigger('tap');
						}
						if($('.btn-usual-cancel').length) {
							$('.btn-usual-cancel').trigger('tap');
						}
					}, 2000);
				}
				else if($('.lis-item.item-small.btn-temporary-small.disable>img').length && 
					$('.lis-item.item-large.btn-temporary-large.disable>img').length) {
					if($('.btn-usual-cancel').length)
						$('.btn-usual-cancel').trigger('tap');
				}
			}, 1000);
			return false;
		}
		var char1 = $('.lis-character0>.prt-percent>span:first').html();
		var char2 = $('.lis-character1>.prt-percent>span:first').html();
		var char3 = $('.lis-character2>.prt-percent>span:first').html();
		var char4 = $('.lis-character3>.prt-percent>span:first').html();
		if(char1 >= 100) {
			char2 += 10;
			char3 += 10;
			char4 += 10;
		}
		if(char2 >= 100) {
			char3 += 10;
			char4 += 10;
		}
		if(char3 >= 100) {
			char4 += 10;
		}
		var threeStatus = 0;
		if($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14143]').length)
			threeStatus = 3;
		else if($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14142]').length)
			threeStatus = 2;
		else if($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14141]').length)
			threeStatus = 1;
		var maxKatha = (char4 >= 100) ? true : false;
		var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length > 1;
		
		if(threeStatus == 0 && canUseStatus) {
			$('.btn-ability-available>div[ability-id=555]').trigger('tap');
		}
		if(threeStatus == 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length > 1) {
			$('.btn-ability-available>div[ability-id=3173]').trigger('tap');
		}
		if(!maxKatha && $('.btn-lock.lock1').length) {
			$('.btn-lock.lock1').trigger('tap');
		}
		if(threeStatus == 3 && maxKatha && $('.btn-lock.lock1').length) {
			$('.btn-lock.lock1').trigger('tap');
		}
		if(threeStatus != 3 && maxKatha && $('.btn-lock.lock0').length) {
			$('.btn-lock.lock0').trigger('tap');
		}
		// Ensure no delay for the operation
		if((threeStatus == 0 && canUseStatus) || 
			(threeStatus == 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length > 1) || 
			(threeStatus == 3 && maxKatha && $('.btn-lock.lock1').length) || 
			(threeStatus != 3 && maxKatha && $('.btn-lock.lock0').length)) {
				return false;
		}
	}
	return true;
}

function stageRolling() {
	console.log('==Stage Rolling Stage==');
	if($('.btn-command-forward').length)
		$('.btn-command-forward').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function raid() {
	console.log('==Raid Stage==');
	if($('.btn-result').is(':visible')) {
		$('.btn-result').trigger('tap');
	}
	if(!$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	if($('.btn-summon-available[summon-code=2030026000]').length && $('.summon-on').length) {
		$('.summon-on').trigger('tap');
		setTimeout(function(){
			$('.btn-summon-available[summon-code=2030026000]').trigger('tap');
			setTimeout(function(){
				if($('.btn-usual-ok.btn-summon-use').length) {
					$('.btn-usual-ok.btn-summon-use').trigger('tap');
				}
				if($('.btn-usual-cancel').length) {
					$('.btn-usual-cancel').trigger('tap');
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
				if($('.btn-usual-cancel').length) {
					$('.btn-usual-cancel').trigger('tap');
				}
			}, 500);
		}, 500);
	}
	else if($('.btn-ability-available>div[ability-id=6001]').length > 1) {
		$('.btn-ability-available>div[ability-id=6001]').trigger('tap');
	}
	else if($('.btn-ability-available>div[ability-id=6002]').length > 1) {
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
	}
	else if($('.btn-attack-start.display-on').length) {
		$('.btn-attack-start.display-on').trigger('tap');
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
