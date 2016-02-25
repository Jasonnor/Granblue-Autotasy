(function () {
	var stopBtn = document.createElement('div');
	stopBtn.style.cssText = 'text-align:center;margin:5px;font-size:8px';
	stopBtn.innerHTML = '<button id="stopBtn" onclick="stopScript()" value="0">Stop Script</button>';
	$('body').append(stopBtn);
	analyzingURL();
})();

Game.reportError = function (msg, url, line, column, err, callback) {
	console.log(msg, url, line, column, err, callback);
	location.reload();
};

// TODO: replace all time to randomTime(time)
function randomTime(time) {
	return time * (Math.ramdom() + 0.8);
}

function stopScript() {
	if($('#stopBtn').val() == 1) {
		console.log('Start Script ...');
		$('#stopBtn').val(0);
		$('#stopBtn').html('Stop Script');
		if($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
			$('#mkt_menu_mainsection>div:eq(4)').css('-webkit-filter', 'grayscale(0)');
			$('#mkt_menu_mainsection>div:eq(4)').css('filter', 'grayscale(0)');
		}
		if($('.btn-switch-sound.btn-bgm-change').length) {
			$('.btn-switch-sound.btn-bgm-change').css('-webkit-filter', 'grayscale(0)');
			$('.btn-switch-sound.btn-bgm-change').css('filter', 'grayscale(0)');
		}
		analyzingURL();
	}
	else {
		console.log('Stop Script ...');
		$('#stopBtn').val(1);
		$('#stopBtn').html('Start Script');
		if($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
			$('#mkt_menu_mainsection>div:eq(4)').css('-webkit-filter', 'grayscale(1)');
			$('#mkt_menu_mainsection>div:eq(4)').css('filter', 'grayscale(1)');
		}
		if($('.btn-switch-sound.btn-bgm-change').length) {
			$('.btn-switch-sound.btn-bgm-change').css('-webkit-filter', 'grayscale(1)');
			$('.btn-switch-sound.btn-bgm-change').css('filter', 'grayscale(1)');
		}
	}
}

// TODO: Rubylottery 100 times
function analyzingURL() {
	if($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
		$('#mkt_menu_mainsection>div:eq(4)>a:first').attr('href', 'javascript:void(0);');
		$('#mkt_menu_mainsection>div:eq(4)>a:first').attr('onclick', 'stopScript()');
	}
	if($('.btn-switch-sound.btn-bgm-change').length)
		$('.btn-switch-sound.btn-bgm-change').attr('onclick', 'stopScript()');
	if($('.bgm-change').length)
		$('.bgm-change').attr('onclick', 'stopScript()');
	if($('#stopBtn').val() == 1)
		return;
	console.log('==Analyzing URL==');
	var hash = location.hash;
	console.log('Get Hash : ' + hash);
	if (/coopraid\/offer/i.test(hash))
		offer();
	else if (/coopraid\/room/i.test(hash))
		room();
	else if (/supporter/i.test(hash))
		supporter();
	else if (/raid_multi/i.test(hash))
		raidMulti();
	else if (/result_multi/i.test(hash))
		resultMulti();
	else if (/coopraid/i.test(hash))
		coopraid();
	else if (/quest\/assist/i.test(hash))
		assist();
	else if (/quest\/stage/i.test(hash))
		stageRolling();
	else if (/raid/i.test(hash))
		raid();
	else if (/result/i.test(hash))
		resultMulti();
	else if (/casino\/exchange/i.test(hash))
		exchange();
	else
		setTimeout(analyzingURL, 5000);
}

function coopraid() {
	console.log('==Coopraid Stage==');
	if ($('.btn-join').length)
		$('.btn-join').trigger('tap');
	else if ($('.prt-result-head head-win').length) {
		setTimeout(function () {
			location.reload();
		}, 1000);
	}
	setTimeout(analyzingURL, 1000);
}

function offer() {
	console.log('==Offer Stage==');
	if ($('.prt-wanted-list>div').length) {
		setTimeout(offerFind, 800);
		return;
	}
	setTimeout(analyzingURL, 100);
}

function offerFind() {
	var $room = $('.txt-room-comment:not(:contains(順)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-1)');
	var $room2 = $('.txt-room-comment:not(:contains(順)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-6)');
	if ($room.length)
		$room.trigger('tap');
	else if ($room2.length)
		$room2.trigger('tap');
	setTimeout(offerJoin, 100);
}

function offerJoin() {
	if ($('.btn-usual-join').length)
		$('.btn-usual-join').trigger('tap');
	setTimeout(offerOK, 100);
}

function offerOK() {
	if ($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	setTimeout(offerRefresh, 100);
}

function offerRefresh() {
	if ($('.btn-refresh-list').length)
		$('.btn-refresh-list').trigger('tap');
	setTimeout(offerCancel, 100);
}

function offerCancel() {
	if ($('.btn-usual-cancel').length)
		$('.btn-usual-cancel').trigger('tap');
	setTimeout(analyzingURL, 100);
}

function room() {
	console.log('==Room Stage==');
	if ($('.prt-chat-button').length && !$('#leaveRoom').length) {
		var leaveRoom = document.createElement('div');
		leaveRoom.style.cssText = 'text-align:center;line-height:34px;font-size:8px;position:absolute;right:30%;z-index:9999999';
		leaveRoom.innerHTML = '<button id="leaveRoom" onclick="leaveRoom()">Leave</button>';
		$('.prt-chat-button').before(leaveRoom);
	}
	if ($('.prt-chat-button').length && !$('#sendStamp').length) {
		var sendStamp = document.createElement('div');
		sendStamp.style.cssText = 'text-align:center;line-height:34px;font-size:8px;position:absolute;right:45%;z-index:9999999';
		sendStamp.innerHTML = '<button id="sendStamp" onclick="sendStamp()">Stamp</button>';
		$('.prt-chat-button').before(sendStamp);
	}
	if ($('.btn-make-ready-large.not-ready').length)
		$('.btn-make-ready-large.not-ready').trigger('tap');
	else if ($('.btn-execute-ready.se-ok').length)
		$('.btn-execute-ready.se-ok').trigger('tap');
	// Send stamp to social
	if(!$('.prt-member-balloon.btn-member-balloon:visible + div + .prt-member-name:contains(Jasonnor)').length)
		sendStamp();
	setTimeout(analyzingURL, 1000);
}

function leaveRoom() {
	if ($('.btn-close-room').length)
		$('.btn-close-room').trigger('tap');
	if ($('.btn-leave-room').length)
		$('.btn-leave-room').trigger('tap');
	setTimeout(function () {
		if ($('.btn-close').length)
			$('.btn-close').trigger('tap');
		if ($('.btn-leave').length)
			$('.btn-leave').trigger('tap');
	}, 500);
}

function sendStamp() {
	if ($('.btn-members-stamp').length)
		$('.btn-members-stamp').trigger('tap');
	setTimeout(function () {
		if ($('.lis-stamp.selectable>img[data-stamp-id=4]').length)
			$('.lis-stamp.selectable>img[data-stamp-id=4]').trigger('tap');
		if ($('.btn-usual-cancel').length)
			$('.btn-usual-cancel').trigger('tap');
	}, 500);
}

function supporter() {
	// You can see pic of supporter at src/supporter
	console.log('==Supporter Stage==');
	/* var isMainStoryline = /supporter\/\d{3}/i.test(location.hash); */
	var isMainStoryline = false;
	var isEventForEarth = /supporter\/300161/i.test(location.hash) || /supporter\/708491/i.test(location.hash) || /supporter\/708501/i.test(location.hash);
	var isEventForWind = /supporter\/300261/i.test(location.hash) || /supporter\/708641/i.test(location.hash) || /supporter\/708651/i.test(location.hash) || $('.prt-raid-thumbnail>img[alt=8100813]').length;
	var isEventForFire = /supporter\/300051/i.test(location.hash);
	var isEventForWater = /supporter\/300101/i.test(location.hash);
	var isEventForLight = /supporter\/300281/i.test(location.hash);
	var isEventForDark = /supporter\/300271/i.test(location.hash);
	if ($('.prt-deck-select').is(':visible'))
		console.log('Team selected.');
	else if (isEventForEarth) {
		// 土80% + 20%hp
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(土):not(:contains(「大地」))').trigger('tap');
		// 土80%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(土):not(:contains(「大地」))').trigger('tap');
		// 土60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(土):not(:contains(「大地」))').trigger('tap');
		// 土50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」))').trigger('tap');
		// 土100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').trigger('tap');
	} else if (isEventForWind) {
		// 風80%
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 風100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').trigger('tap');
		// 風70%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 風60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').trigger('tap');
		// 風50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').trigger('tap');
	} else if (isEventForFire) {
		// 火80%
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').trigger('tap');
		// 火70%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').trigger('tap');
		// 火60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').trigger('tap');
		// 火50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」))').trigger('tap');
		// 火100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').trigger('tap');
	} else if (isEventForWater) {
		// 水80% + 20%hp
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 水80%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 水100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').trigger('tap');
		// 水60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 水50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').trigger('tap');
	} else if (isEventForLight) {
		// 光120%
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光100%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光80% + 20%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光80%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光75% + 15%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光75%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光50% + 20%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」))').trigger('tap');
		// 光100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').trigger('tap');
	} else if (isEventForDark) {
		// 闇120%
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇100%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇75% + 15%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇75%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇60% + 40%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇50% + 20%hp
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」))').trigger('tap');
		// 闇100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').trigger('tap');
	}
	// Rabbit Exp & Treasure
	else if ($('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030026000]+div>.bless-rank1-style').trigger('tap');
	else if ($('.prt-summon-image[data-image=2030026000]').length)
		$('.prt-summon-image[data-image=2030026000]').trigger('tap');
	// Mushroom RM
	else if (isMainStoryline && $('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').trigger('tap');
	else if (isMainStoryline && $('.prt-summon-image[data-image=2030051000]').length)
		$('.prt-summon-image[data-image=2030051000]').trigger('tap');
	// Exp King
	else if ($('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040025000]+div>.bless-rank1-style').trigger('tap');
	else if ($('.prt-summon-image[data-image=2040025000]').length)
		$('.prt-summon-image[data-image=2040025000]').trigger('tap');
	// Grande
	else if ($('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2040065000]+div>.bless-rank1-style').trigger('tap');
	else if ($('.prt-summon-image[data-image=2040065000]').length)
		$('.prt-summon-image[data-image=2040065000]').trigger('tap');
	// 風80%
	else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').trigger('tap');
	// 風70%
	else if ($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').trigger('tap');
	// 風60%
	else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').trigger('tap');
	// 風50%
	else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」))').trigger('tap');
	// 風100% Anima
	else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').length)
		$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').trigger('tap');
	// Others
	else if ($('.prt-supporter-detail').length)
		$('.prt-supporter-detail').trigger('tap');
	setTimeout(function () {
		if (isEventForEarth)
			selectTeam(2);
		else if (isEventForWind)
			selectTeam(3);
		else if (isEventForFire)
			selectTeam(4);
		else if (isEventForWater)
			selectTeam(1);
		else
			selectTeam(0);
	}, 200);
}

function selectTeam(n) {
	$('.flex-control-nav>li:eq(' + n + ')>a').click();
	setTimeout(function () {
		if ($('.btn-usual-ok').length && $('.flex-control-nav>li:eq(' + n + ')>a.flex-active').length)
			$('.btn-usual-ok').trigger('tap');
		setTimeout(analyzingURL, 300);
	}, 800);
}

// TODO: Add refresh button
function raidMulti() {
	if ($('.btn-result').is(':visible'))
		$('.btn-result').trigger('tap');
	if (!$('.value.num-info-slash').is(':visible') || !$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	if ($('.btn-lock.lock1').length)
		$('.btn-lock.lock1').trigger('tap');
	if ($('.btn-usual-ok').is(':visible'))
		$('.btn-usual-ok:visible').trigger('tap');
	// Determine whether is a single person battle
	if ($('[class="current value"] + [class="current value num-info1"] + .value.num-info-slash').length) {
		raidMultiSingle();
		return;
	}
	var isCoopraid = $('.value.num-info-slash + [class="max value"] + [class="max value num-info4"]').length;
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if (isCoopraid) {
		// TODO: if number of person is 1/4, retreat
		console.log('==Raid Coopraid Stage==');
		if (enemyTotal >= 100000000) {
			raidMultiSingle();
			return;
		} else if (enemyTotal >= 3000000) {
			if (!masterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
				$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else if (enemyTotal >= 1000000) {
			if (!simpleMasterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			}
		}
	} else {
		console.log('==Raid Multi Stage==');
		var enemyNow = $('.hp-show:first>span').html().split('/')[0];
		if (enemyNow <= 3000000) {
			if (!simpleMasterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else if (enemyNow <= 100000000) {
			if (!masterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
				$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else {
			raidMultiSingle();
			return;
		}
	}
	if ($('.btn-attack-start.display-on').length)
		$('.btn-attack-start.display-on').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function raidMultiSingle() {
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if (enemyTotal > 1300000) {
		console.log('==Raid Multi Single-Hard Stage==');
		var enemyHp = $('.hp-show:first>span').html().split('<br>')[1].replace('%', '');
		// If enemy's HP is lower than 50%, send assist
		if (enemyHp <= 50 && !$('.btn-assist.disable').length) {
			$('.btn-assist').trigger('tap');
			setTimeout(function () {
				if ($('.btn-usual-text:contains(救援依頼)').length)
					$('.btn-usual-text:contains(救援依頼)').trigger('tap');
				setTimeout(function () {
					if ($('.btn-usual-ok').length)
						$('.btn-usual-ok').trigger('tap');
					$('.btn-usual-cancel').trigger('tap');
					setTimeout(analyzingURL, 500);
				}, 1000);
			}, 1000);
			return;
		}
		// Gran's Buff Eliminate
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/leader/raid_normal/150101_sw_"])').length && $('.btn-ability-available>div[ability-id=3040]').length > 1 && stage.pJsnData.boss.param[0].name == 'Lv60 リヴァイアサン・マグナ' && stage.gGameStatus.boss.param[0].condition.buff) {
			if(stage.gGameStatus.boss.param[0].condition.buff.length) {
				$('.btn-ability-available>div[ability-id=3040]').trigger('tap');
				stage.gGameStatus.boss.param[0].condition.buff = 0;
			}
			setTimeout(analyzingURL, 1000);
			return;
		} else if (!masterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		} else if (!cureEveryone()) {
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.summon-on').length) {
			summonByCode('all');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Hag's Summon Devil
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/npc/raid_normal/3040011000_03.jpg"])').length && !$('.btn-command-character>.prt-status>.img-ico-status-s[data-status=1370]').length) {
			$('.btn-ability-available>div[ability-id=510]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Use all skill, order : yellow(3) > green(2) > blue(4) > red(1)
		// Expect list: Blackmeat(5322-3), Yoda(2172-1, 3173-3, 555-2), Hag(510-3), Darkfencer(1201-1), Gran(3040-4)
		// Bug: If can not use skill, will stop here
		// TODO: var canUseSkill = !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1111]').length;
		else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=3173]):not([ability-id=510])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=3173]):not([ability-id=510])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-id=3040])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-id=3040])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172]):not([ability-id=1201])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172]):not([ability-id=1201])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// DarkFencer's Slow
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/leader/raid_normal/150101_sw_"])').length && stage.pJsnData.boss.param[0].recast > stage.pJsnData.boss.param[0].recastmax) {
			location.reload();
			return;
		} else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/leader/raid_normal/150101_sw_"])').length && $('.btn-ability-available>div[ability-id=1201]').length > 1 && stage.pJsnData.boss.param[0].recast < stage.pJsnData.boss.param[0].recastmax) {
			$('.btn-ability-available>div[ability-id=1201]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
	} else {
		console.log('==Raid Multi Single-Easy Stage==');
		if (!simpleMasterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	dropRateUpAttack();
}

function summonByCode(code) {
	var parameter = (code == 'all') ? '' : '[summon-code=' + code + ']';
	$('.summon-on').trigger('tap');
	setTimeout(function () {
		$('.btn-summon-available' + parameter).trigger('tap');
		setTimeout(function () {
			if ($('.btn-usual-ok.btn-summon-use').length)
				$('.btn-usual-ok.btn-summon-use').trigger('tap');
			if ($('.btn-usual-cancel').length)
				$('.btn-usual-cancel').trigger('tap');
		}, 500);
	}, 500);
}

// Use summon & skill rise drop rate then attack
function dropRateUpAttack() {
	var canUseSkill = !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1111]').length;
	if ($('.btn-summon-available[summon-code=2030026000]').length && $('.summon-on').length)
		summonByCode('2030026000');
	else if ($('.btn-summon-available[summon-code=2040025000]').length && $('.summon-on').length)
		summonByCode('2040025000');
	else if ($('.btn-ability-available>div[ability-id=6001]').length > 1 && canUseSkill)
		$('.btn-ability-available>div[ability-id=6001]').trigger('tap');
	else if ($('.btn-ability-available>div[ability-id=6002]').length > 1 && canUseSkill)
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
	else if ($('.btn-attack-start.display-on').length && stage.pJsnData.boss.param[0].recast == 1 && stage.pJsnData.boss.param[0].name == 'Lv60 リヴァイアサン・マグナ') {
		$('.btn-attack-start.display-on').trigger('tap');
		setTimeout(function () {
			location.reload();
		}, 500);
		return;
	}
	else if ($('.btn-attack-start.display-on').length)
		$('.btn-attack-start.display-on').trigger('tap');
	setTimeout(analyzingURL, 1500);
}

var smallSolution = -1;
var largeSolution = -1;

function checkSolution() {
	if(!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
		$('.btn-temporary').trigger('tap');
	setTimeout(function () {
		smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
		largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
		console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
		if ($('.btn-usual-cancel').length)
			$('.btn-usual-cancel').trigger('tap');
	}, 1000);
}

function masterYoda() {
	// Send stamp to get large-solution
	if ($('.btn-chat:not(.comment)>.ico-attention').is(':visible')) {
		$('.btn-chat:not(.comment)>.ico-attention').trigger('tap');
		setTimeout(function () {
			if ($('.lis-stamp[chatid=19]').length)
				$('.lis-stamp[chatid=19]').trigger('tap');
			if ($('.btn-usual-close').length)
				$('.btn-usual-close').trigger('tap');
		}, 1000);
		return false;
	}
	if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/npc/raid_normal/3040064000_02.jpg"])').length) {
		if (smallSolution == -1 || smallSolution === undefined || largeSolution == -1 || largeSolution === undefined) {
			checkSolution();
			return false;
		}
		var hp = 100 * parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
		if (hp <= 50 && (smallSolution > 0 || largeSolution > 0)) {
			if(!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
				$('.btn-temporary').trigger('tap');
			setTimeout(function () {
				smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
				largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
				console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
				if ($('.lis-item.item-small.btn-temporary-small:not(.disable)>img').length) {
					$('.lis-item.item-small.btn-temporary-small>img').trigger('tap');
					setTimeout(function () {
						if ($('.lis-character3:first').length)
							$('.lis-character3:first').trigger('tap');
						if ($('.btn-usual-cancel').length)
							$('.btn-usual-cancel').trigger('tap');
					}, 500);
				} else if ($('.lis-item.item-large.btn-temporary-large:not(.disable)>img').length) {
					$('.lis-item.item-large.btn-temporary-large>img').trigger('tap');
					setTimeout(function () {
						if ($('.btn-usual-use').length)
							$('.btn-usual-use').trigger('tap');
						if ($('.btn-usual-cancel').length)
							$('.btn-usual-cancel').trigger('tap');
					}, 300);
				} else if ($('.lis-item.item-small.btn-temporary-small.disable>img').length &&
					$('.lis-item.item-large.btn-temporary-large.disable>img').length) {
					if ($('.btn-usual-cancel').length)
						$('.btn-usual-cancel').trigger('tap');
				}
			}, 500);
			return false;
		}
		var maxKatha = getMaxKatha();
		var threeStatus = getThreeStatus();
		var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length > 1;
		var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;

		if (threeStatus === 0 && canUseStatus && canUseSkill)
			$('.btn-ability-available>div[ability-id=555]').trigger('tap');
		if (threeStatus === 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length > 1 && canUseSkill)
			$('.btn-ability-available>div[ability-id=3173]').trigger('tap');
		if (threeStatus === 0 && $('.btn-ability-available>div[ability-id=2172]').length > 1 && canUseSkill)
			$('.btn-ability-available>div[ability-id=2172]').trigger('tap');
		if (!maxKatha && $('.btn-lock.lock1').length)
			$('.btn-lock.lock1').trigger('tap');
		if (threeStatus == 3 && maxKatha && $('.btn-lock.lock1').length)
			$('.btn-lock.lock1').trigger('tap');
		if (threeStatus != 3 && maxKatha && $('.btn-lock.lock0').length)
			$('.btn-lock.lock0').trigger('tap');
		// Ensure no delay for the operation
		if ((threeStatus === 0 && canUseStatus && canUseSkill) ||
			(threeStatus === 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length > 1 && canUseSkill) ||
			(threeStatus === 0 && $('.btn-ability-available>div[ability-id=2172]').length > 1 && canUseSkill) ||
			(!maxKatha && $('.btn-lock.lock1').length) ||
			(threeStatus == 3 && maxKatha && $('.btn-lock.lock1').length) ||
			(threeStatus != 3 && maxKatha && $('.btn-lock.lock0').length))
			return false;
	}
	return true;
}

function getMaxKatha() {
	var char1 = parseInt($('.lis-character0>.prt-percent>span:first').html());
	var char2 = parseInt($('.lis-character1>.prt-percent>span:first').html());
	var char3 = parseInt($('.lis-character2>.prt-percent>span:first').html());
	var char4 = parseInt($('.lis-character3>.prt-percent>span:first').html());
	if (char1 >= 100) {
		char2 += 10;
		char3 += 10;
		char4 += 10;
	}
	if (char2 >= 100) {
		char3 += 10;
		char4 += 10;
	}
	if (char3 >= 100)
		char4 += 10;
	return (char4 >= 100) ? true : false;
}

function getThreeStatus() {
	if ($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14143]').length)
		return 3;
	else if ($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14142]').length)
		return 2;
	else if ($('.lis-character3>.prt-status>.img-ico-status-s[data-status=14141]').length)
		return 1;
	else
		return 0;
}

function cureEveryone() {
	if (smallSolution == -1 || smallSolution === undefined || largeSolution == -1 || largeSolution === undefined) {
		checkSolution();
		return false;
	}
	var cureIndex = 0;
	var hp1 = 100 * parseFloat($('.lis-character0>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character0>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
	if (hp1 <= 70 && hp1 !== 0) cureIndex++;
	if (hp1 <= 50 && hp1 !== 0) cureIndex++;
	var hp2 = 100 * parseFloat($('.lis-character1>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character1>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
	if (hp2 <= 70 && hp2 !== 0) cureIndex++;
	if (hp2 <= 50 && hp2 !== 0) cureIndex++;
	var hp3 = 100 * parseFloat($('.lis-character2>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character2>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
	if (hp3 <= 70 && hp3 !== 0) cureIndex++;
	if (hp3 <= 50 && hp3 !== 0) cureIndex++;
	var hp4 = 100 * parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
	if (hp4 <= 70 && hp4 !== 0) cureIndex++;
	if (hp4 <= 50 && hp4 !== 0) cureIndex++;
	if (cureIndex > 3 && largeSolution > 0) {
		if(!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
			$('.btn-temporary').trigger('tap');
		setTimeout(function () {
			smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
			largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
			console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
			if ($('.lis-item.item-large.btn-temporary-large:not(.disable)>img').length) {
				$('.lis-item.item-large.btn-temporary-large>img').trigger('tap');
				setTimeout(function () {
					if ($('.btn-usual-use').length)
						$('.btn-usual-use').trigger('tap');
					if ($('.btn-usual-cancel').length)
						$('.btn-usual-cancel').trigger('tap');
				}, 500);
			} else if ($('.lis-item.item-large.btn-temporary-large.disable>img').length) {
				if ($('.btn-usual-cancel').length)
					$('.btn-usual-cancel').trigger('tap');
			}
		}, 500);
		return false;
	}
	var someoneDanger = (hp1 <= 50 && hp1 > 0) || (hp2 <= 50 && hp2 > 0) || (hp3 <= 50 && hp3 > 0) || (hp4 <= 50 && hp4 > 0);
	if (smallSolution > 0 && someoneDanger) {
		if(!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
			$('.btn-temporary').trigger('tap');
		setTimeout(function () {
			smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
			largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
			console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
			if ($('.lis-item.item-small.btn-temporary-small:not(.disable)>img').length) {
				$('.lis-item.item-small.btn-temporary-small>img').trigger('tap');
				setTimeout(function () {
					if (hp1 <= 50 && hp1 > 0 && $('.lis-character0:first').length)
						$('.lis-character0:first').trigger('tap');
					else if (hp2 <= 50 && hp2 > 0 && $('.lis-character1:first').length)
						$('.lis-character1:first').trigger('tap');
					else if (hp3 <= 50 && hp3 > 0 && $('.lis-character2:first').length)
						$('.lis-character2:first').trigger('tap');
					else if (hp4 <= 50 && hp4 > 0 && $('.lis-character3:first').length)
						$('.lis-character3:first').trigger('tap');
					if ($('.btn-usual-cancel').length)
						$('.btn-usual-cancel').trigger('tap');
				}, 300);
			} else if ($('.lis-item.item-small.btn-temporary-small.disable>img').length) {
				if ($('.btn-usual-cancel').length)
					$('.btn-usual-cancel').trigger('tap');
			}
		}, 500);
		return false;
	}
	return true;
}

function simpleMasterYoda() {
	if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src="http://gbf.game-a1.mbga.jp/assets/img_light/sp/assets/npc/raid_normal/3040064000_02.jpg"])').length) {
		var maxKatha = getMaxKatha();
		var threeStatus = getThreeStatus();
		var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length > 1;
		var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;
		if ($('.btn-lock.lock1').length)
			$('.btn-lock.lock1').trigger('tap');
		if (threeStatus != 3 && canUseStatus && canUseSkill && maxKatha) {
			$('.btn-ability-available>div[ability-id=555]').trigger('tap');
			return false;
		}
	}
	return true;
}

function stageRolling() {
	console.log('==Stage Rolling Stage==');
	if ($('.btn-command-forward').length)
		$('.btn-command-forward').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function raid() {
	console.log('==Raid Stage==');
	if ($('.btn-result').is(':visible'))
		$('.btn-result').trigger('tap');
	if (!$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if (enemyTotal >= 700000)
		if (!simpleMasterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	dropRateUpAttack();
}

function resultMulti() {
	console.log('==Result Multi Stage==');
	if ($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	else if ($('.btn-control').length)
		$('.btn-control').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function assist() {
	console.log('==Assist Stage==');
	if ($('#tab-multi').length) {
		$('#tab-multi').trigger('tap');
		setTimeout(function () {
			// You can see pic of summon at src/assist
			if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000_hell]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040002000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040002000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040005000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040005000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040007000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040007000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040012000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040012000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040023000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040023000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040029000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040029000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040042000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040042000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040059000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040059000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040063000_ex])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040063000_ex]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040008000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040008000]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040086000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040086000]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt*=high])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt*=high])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').trigger('tap');
			else
				return;
			setTimeout(function () {
				if ($('.prt-item-disp:last>.prt-use-button>.btn-use-full').length)
					$('.prt-item-disp:last>.prt-use-button>.btn-use-full').trigger('tap');
			}, 3000);
		}, 1000);
	}
	setTimeout(analyzingURL, 3000);
}

function exchange() {
	console.log('==Exchange Stage==');
	if ($('.btn-exchange').length)
		$('.btn-exchange').trigger('tap');
	setTimeout(function () {
		// BUG: It doesn't work, try to fix it.
		if ($('.num-set').length)
			$('.num-set').val($('.num-set>option:last-child').val());
		setTimeout(function () {
			if ($('.btn-usual-text.exchange').length)
				$('.btn-usual-text.exchange').trigger('tap');
			setTimeout(analyzingURL, 100);
		}, 300);
	}, 500);
}
