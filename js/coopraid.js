/*jshint scripturl:true*/
(function () {
	// Create stop script button
	var stopBtn = document.createElement('div');
	stopBtn.style.cssText = 'text-align:center;margin:5px;font-size:8px';
	stopBtn.innerHTML = '<button id="stopBtn" onclick="stopScript()" value="0" style="color:white;background:-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(140, 220, 250, 0.8)), color-stop(0.4, rgba(75, 170, 190, 0.8)), color-stop(0.6, rgba(75, 170, 190, 0.8)), to(rgba(140, 220, 250, 0.8)));border:1px solid rgb(85, 102, 119);border-radius:5px;">Stop Script</button>';
	$('body').append(stopBtn);
	analyzingURL();
})();

// Save console error message
(function (console) {
	console.save = function (data, filename) {
		if (!data) {
			console.error('Console.save: No data');
			return;
		}
		if (!filename) filename = 'console.json';
		if (typeof data === 'object') {
			data = JSON.stringify(data, undefined, 4);
		}
		var blob = new Blob([data], {
			type: 'text/json'
		});
		var e = document.createEvent('MouseEvents');
		var a = document.createElement('a');
		a.download = filename;
		a.href = window.URL.createObjectURL(blob);
		a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
		e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		a.dispatchEvent(e);
	};
})(console);

Game.reportError = function (msg, url, line, column, err, callback) {
	var recordLog = 'Message: ' + msg + '\r\nUrl: ' + url + '\r\nLine: ' + line + '\r\nColumn: ' + column + '\r\nError: ' + err + '\r\nCallback: ' + callback;
	errorMsg(recordLog);
	// msg.indexOf("Script error") > -1
	var needReload = msg.indexOf("'0' of undefined") > -1 || msg.indexOf("'1' of undefined") > -1 || msg.indexOf("'2' of undefined") > -1 || msg.indexOf("'3' of undefined") > -1 || msg.indexOf("'4' of undefined") > -1 || msg.indexOf("'5' of undefined") > -1 || msg.indexOf("'6' of undefined") > -1 || msg.indexOf("'7' of undefined") > -1 || msg.indexOf("'8' of undefined") > -1 || msg.indexOf("'9' of undefined") > -1 || msg.indexOf("'attributes' of undefined") > -1 || msg.indexOf("'indexOf' of undefined") > -1 || msg.indexOf("'children' of null") > -1 || msg.indexOf("Unexpected token") > -1 || msg.indexOf("POPUP") > -1;
	if (needReload) {
		location.reload();
	} else {
		var currentdate = new Date();
		var year = currentdate.getFullYear();
		var month = (1 + currentdate.getMonth()).toString();
		var day = currentdate.getDate().toString();
		var hour = currentdate.getHours().toString();
		var min = currentdate.getMinutes().toString();
		var sec = currentdate.getSeconds().toString();
		month = month.length > 1 ? month : '0' + month;
		day = day.length > 1 ? day : '0' + day;
		hour = hour.length > 1 ? hour : '0' + hour;
		min = min.length > 1 ? min : '0' + min;
		sec = sec.length > 1 ? sec : '0' + sec;
		var datetime = year + '-' + month + '-' + day + ' ' + hour + '-' + min + '-' + sec;
		console.save(recordLog, 'errorRecord-' + datetime + '.log');
	}
};

var errorTimes = 0;
var runTimes = 0;

// TODO: replace all time to randomTime(time)
function randomTime(time) {
	return time * (Math.ramdom() + 0.8);
}

function errorMsg(msg) {
	console.log('%c' + msg, 'background-color: #ffd0da; color: #c10000');
}

function stageMsg(msg) {
	console.log('%c' + msg, 'color: #30aeff');
}

function stopScript() {
	if ($('#stopBtn').val() == 1) {
		console.log('Starting Script ...');
		$('#stopBtn').val(0);
		$('#stopBtn').html('Stop Script');
		if ($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
			$('#mkt_menu_mainsection>div:eq(4)').css('-webkit-filter', 'grayscale(0)');
			$('#mkt_menu_mainsection>div:eq(4)').css('filter', 'grayscale(0)');
		}
		if ($('.btn-switch-sound.btn-bgm-change').length) {
			$('.btn-switch-sound.btn-bgm-change').css('-webkit-filter', 'grayscale(0)');
			$('.btn-switch-sound.btn-bgm-change').css('filter', 'grayscale(0)');
		}
		analyzingURL();
	} else {
		console.log('Stopping Script ...');
		$('#stopBtn').val(1);
		$('#stopBtn').html('Start Script');
		if ($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
			$('#mkt_menu_mainsection>div:eq(4)').css('-webkit-filter', 'grayscale(1)');
			$('#mkt_menu_mainsection>div:eq(4)').css('filter', 'grayscale(1)');
		}
		if ($('.btn-switch-sound.btn-bgm-change').length) {
			$('.btn-switch-sound.btn-bgm-change').css('-webkit-filter', 'grayscale(1)');
			$('.btn-switch-sound.btn-bgm-change').css('filter', 'grayscale(1)');
		}
	}
}

// TODO: Rubylottery 100 times
function analyzingURL() {
	// Set event button as stop script button
	if ($('#mkt_menu_mainsection>div:eq(4)>a:first').length) {
		$('#mkt_menu_mainsection>div:eq(4)>a:first').attr('href', 'javascript:void(0)');
		$('#mkt_menu_mainsection>div:eq(4)>a:first').attr('onclick', 'stopScript()');
	}
	// Set voice button as stop script button
	if ($('.btn-switch-sound.btn-bgm-change').length)
		$('.btn-switch-sound.btn-bgm-change').attr('onclick', 'stopScript()');
	if ($('.bgm-change').length)
		$('.bgm-change').attr('onclick', 'stopScript()');
	if ($('#stopBtn').val() == 1)
		return;
	if ($('#pop-captcha>div>.prt-popup-header:contains(認証)').is(':visible')) {
		var audio = new Audio('https://cdn.rawgit.com/Jasonnor/Granblue-Autotasy/master/js/alert_minions.mp3');
		audio.play();
		stopScript();
		return;
	}
	if (errorTimes > 20 || runTimes > 300) {
		location.reload();
		return;
	}
	runTimes++;
	var hash = location.hash;
	console.log('URL Hash : ' + hash);
	if (/coopraid\/offer/i.test(hash))
		offer();
	else if (/coopraid\/room/i.test(hash))
		room();
	else if (/coopraid\/lineup/i.test(hash) || /casino\/exchange/i.test(hash))
		exchange();
	else if (/coopraid/i.test(hash))
		coopraid();
	else if (/supporter/i.test(hash))
		supporter();
	else if (/raid_multi/i.test(hash))
		raidMulti();
	else if (/raid/i.test(hash))
		raid();
	else if (/result_multi/i.test(hash) || /result/i.test(hash))
		battleResult();
	else if (/quest\/assist/i.test(hash))
		assist();
	else if (/quest\/stage/i.test(hash))
		stageRolling();
	else if (/quest\/index/i.test(hash))
		questError();
	else if (/friend\/waiting/i.test(hash))
		rejectFriend();
	else {
		runTimes--;
		setTimeout(analyzingURL, 5000);
	}
}

function coopraid() {
	stageMsg('==Coopraid Stage==');
	if ($('.btn-join').length)
		$('.btn-join').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function offer() {
	stageMsg('==Offer Stage==');
	if ($('.prt-wanted-list>div').length) {
		setTimeout(offerFind, 800);
		return;
	}
	setTimeout(analyzingURL, 1000);
}

function offerFind() {
	// Avoid entering bad room
	var $room = $('.txt-room-comment:not(:contains(順)):not(:contains(貼)):not(:contains(相互)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-1)');
	var $room2 = $('.txt-room-comment:not(:contains(順)):not(:contains(貼)):not(:contains(相互)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-6)');
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
	stageMsg('==Room Stage==');
	// Create leaveRoom button
	if ($('.prt-chat-button').length && !$('#leaveRoom').length) {
		var leaveRoom = document.createElement('div');
		leaveRoom.style.cssText = 'text-align:center;line-height:34px;font-size:8px;position:absolute;right:30%;z-index:9999999';
		leaveRoom.innerHTML = '<button id="leaveRoom" onclick="leaveRoom()" style="color:white;background:-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(140, 220, 250, 0.8)), color-stop(0.4, rgba(75, 170, 190, 0.8)), color-stop(0.6, rgba(75, 170, 190, 0.8)), to(rgba(140, 220, 250, 0.8)));border:1px solid rgb(85, 102, 119);border-radius:5px;">Leave</button>';
		$('.prt-chat-button').before(leaveRoom);
	}
	// Create sendStamp button
	if ($('.prt-chat-button').length && !$('#sendStamp').length) {
		var sendStamp = document.createElement('div');
		sendStamp.style.cssText = 'text-align:center;line-height:34px;font-size:8px;position:absolute;right:45%;z-index:9999999';
		sendStamp.innerHTML = '<button id="sendStamp" onclick="sendRoomStamp()" style="color:white;background:-webkit-gradient(linear, 0% 0%, 0% 100%, from(rgba(140, 220, 250, 0.8)), color-stop(0.4, rgba(75, 170, 190, 0.8)), color-stop(0.6, rgba(75, 170, 190, 0.8)), to(rgba(140, 220, 250, 0.8)));border:1px solid rgb(85, 102, 119);border-radius:5px;">Stamp</button>';
		$('.prt-chat-button').before(sendStamp);
	}
	if ($('.btn-make-ready-large.not-ready').length)
		$('.btn-make-ready-large.not-ready').trigger('tap');
	else if ($('.btn-execute-ready.se-ok').length)
		$('.btn-execute-ready.se-ok').trigger('tap');
	// Send stamp for socially
	else if (!$('.prt-member-balloon.btn-member-balloon:visible + div + .prt-member-name:contains(Jasonnor)').length && $('.prt-member-name:contains(Jasonnor)').is(':visible'))
		sendRoomStamp();
	// If owner send thanks & time < 58 minutes, leave room
	else if (($('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp9"]:visible) + .prt-char-status>.ico-owner').length || $('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp10"]:visible) + .prt-char-status>.ico-owner').length) && parseInt($('.txt-count-down').html().replace('残り ', '').replace('分', '')) < 58) {
		sendRoomStamp('leave');
	}
	setTimeout(analyzingURL, 1000);
}

function leaveRoom() {
	if ($('.btn-close-room').length)
		$('.btn-close-room').trigger('tap');
	else if ($('.btn-leave-room').length)
		$('.btn-leave-room').trigger('tap');
	setTimeout(function () {
		if ($('.btn-close').length)
			$('.btn-close').trigger('tap');
		else if ($('.btn-leave').length)
			$('.btn-leave').trigger('tap');
		setTimeout(function () {
			if ($('.btn-usual-close').length)
				$('.btn-usual-close').trigger('tap');
		}, 500);
	}, 500);
}

function sendRoomStamp(state) {
	if ($('.btn-members-stamp').length)
		$('.btn-members-stamp').trigger('tap');
	if(state == 'leave') {
		if(!$('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp9"]:visible) + div + .prt-member-name:contains(Jasonnor)').length) {
			setTimeout(function () {
				if ($('.lis-stamp.selectable>img[data-stamp-id=9]').length)
					$('.lis-stamp.selectable>img[data-stamp-id=9]').trigger('tap');
				if ($('.btn-usual-cancel').length)
					$('.btn-usual-cancel').trigger('tap');
			}, 500);
		}
		else
			leaveRoom();
	}
	else {
		setTimeout(function () {
			if ($('.lis-stamp.selectable>img[data-stamp-id=4]').length)
				$('.lis-stamp.selectable>img[data-stamp-id=4]').trigger('tap');
			if ($('.btn-usual-cancel').length)
				$('.btn-usual-cancel').trigger('tap');
		}, 500);
	}
}

function supporter() {
	// You can see pic of supporter at src/supporter
	stageMsg('==Supporter Stage==');
	var isMainStoryline = /supporter\/\d{2,3}\/0/i.test(location.hash);
	var isMultiBattle = /supporter\/3\d{5}\/1/i.test(location.hash);
	var isCharStory = /supporter\/2\d{5}\/2/i.test(location.hash);
	var isBranchLine = /supporter\/1\d{5}\/3/i.test(location.hash);
	var isOrdealEvent = /supporter\/4\d{5}\/4/i.test(location.hash) || /supporter\/5\d{5}\/5/i.test(location.hash);
	var isCoopraid = /supporter\/6\d{5}\/7/i.test(location.hash);
	var isEventForEarth = /supporter\/300161/i.test(location.hash) || /supporter\/708491/i.test(location.hash) || /supporter\/708501/i.test(location.hash) || /supporter\/500171/i.test(location.hash) || /supporter\/500731/i.test(location.hash) || /supporter\/500741/i.test(location.hash);
	var isEventForWind = /supporter\/300261/i.test(location.hash) || /supporter\/708641/i.test(location.hash) || /supporter\/708651/i.test(location.hash) || $('.prt-raid-thumbnail>img[alt=8100813]').length;
	var isEventForFire = /supporter\/300051/i.test(location.hash) || /supporter\/708791/i.test(location.hash) || /supporter\/708801/i.test(location.hash) || $('.prt-raid-thumbnail>img[alt=8101203]').length || $('.prt-raid-thumbnail>img[alt=8101213]').length;
	var isEventForWater = /supporter\/300101/i.test(location.hash) || /supporter\/500701/i.test(location.hash) || /supporter\/500711/i.test(location.hash);
	var isEventForLight = /supporter\/300281/i.test(location.hash);
	var isEventForDark = /supporter\/300271/i.test(location.hash);
	var isRabbit = /supporter\/101441/i.test(location.hash);
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
		// 風100% Anima
		if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').trigger('tap');
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
		// 水60%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 水50%
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」))').trigger('tap');
		// 水100% Anima
		else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').length)
			$('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').trigger('tap');
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
	else if ((isMainStoryline || isBranchLine) && !isRabbit && $('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').length)
		$('.prt-summon-image[data-image=2030051000]+div>.bless-rank1-style').trigger('tap');
	else if ((isMainStoryline || isBranchLine) && !isRabbit && $('.prt-summon-image[data-image=2030051000]').length)
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
		else if (isRabbit)
			selectTeam(5);
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

var useMystery = true;

// TODO: Add refresh button
function raidMulti() {
	if ($('.btn-result').is(':visible'))
		$('.btn-result').trigger('tap');
	if ($('.prt-error-infomation').length) {
		location.reload();
		return;
	}
	if (!$('.value.num-info-slash').is(':visible') || !$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	var numOfBossDead = 0;
	for (var i = 0; i < stage.gGameStatus.boss.param.length; i++) {
		if (stage.gGameStatus.boss.param[i].hp == '0') {
			numOfBossDead++;
		}
		// Reload if all boss is dead
		if (numOfBossDead >= stage.gGameStatus.boss.param.length) {
			location.reload();
			return;
		}
	}
	useMystery = true;
	if ($('div:not(:has(div>.prt-item-result>.txt-stamina-title:contains(エリクシール)))+.prt-popup-footer>.btn-usual-ok').is(':visible'))
		$('.btn-usual-ok:visible').trigger('tap');
	var isSingle = $('[class="current value"] + [class="current value num-info1"] + .value.num-info-slash').length;
	if (isSingle) {
		stageMsg('==Raid Single Stage==');
		raidSmartFighting();
		return;
	}
	var isCoopraid = $('.value.num-info-slash + [class="max value"] + [class="max value num-info4"]').length;
	if (isCoopraid) {
		// TODO: if number of person is 1/4, retreat
		stageMsg('==Raid Coopraid Stage==');
		var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
		if (enemyTotal >= 7000000) {
			raidSmartFighting();
			return;
		} else if (enemyTotal >= 3000000) {
			if (!masterYoda()) {
				errorTimes++;
				setTimeout(analyzingURL, 1000);
				return;
			} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
				$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else if (enemyTotal >= 1000000) {
			if (!simpleMasterYoda()) {
				errorTimes++;
				setTimeout(analyzingURL, 1000);
				return;
			}
		}
	} else {
		stageMsg('==Raid Multi Stage==');
		var enemyNow = $('.hp-show:first>span').html().split('/')[0];
		var isMVP = $('.lis-user.rank1.player>.prt-rank:contains(1位)').is(':visible');
		if (enemyNow <= 3000000 && !isMVP) {
			if (!simpleMasterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else if (enemyNow <= 100000000 && !isMVP) {
			if (!masterYoda()) {
				setTimeout(analyzingURL, 1000);
				return;
			} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
				$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
				setTimeout(analyzingURL, 1000);
				return;
			}
		} else {
			raidSmartFighting();
			return;
		}
	}
	checkMysteryThenAttack();
	setTimeout(analyzingURL, 1000);
}

function checkMysteryThenAttack() {
	if ($('.btn-lock.lock1').length && useMystery)
		$('.btn-lock.lock1').trigger('tap');
	if ($('.btn-lock.lock0').length && !useMystery)
		$('.btn-lock.lock0').trigger('tap');
	if ($('.btn-attack-start.display-on').length)
		$('.btn-attack-start.display-on').trigger('tap');
}

function raidSmartFighting() {
	isMaxMystery('all');
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if (enemyTotal > 1300000) {
		var enemyHp = $('.hp-show:first>span').html().split('<br>')[1].replace('%', '');
		// If enemy's HP is lower than 50%, send assist
		if (enemyHp <= 50 && !$('.btn-assist.disable').length && /raid_multi/i.test(location.hash)) {
			$('.btn-assist').trigger('tap');
			setTimeout(function () {
				if ($('.btn-usual-text:contains(救援依頼)').length)
					$('.btn-usual-text:contains(救援依頼)').trigger('tap');
				setTimeout(function () {
					if ($('.btn-usual-ok').length)
						$('.btn-usual-ok').trigger('tap');
					$('.btn-usual-cancel').trigger('tap');
					setTimeout(function () {
						location.reload();
					}, 300);
				}, 1000);
			}, 1000);
			return;
		}
		// Check if skill is not ready and reload
		$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability>div:first-child').each(function(){
			var target = $(this).attr('class').split(/\s+/)[1].replace('ability-character-num-', '').split('-');
			var targetChar = parseInt(target[0]) - 1;
			var targetSkill = target[1];
			var canTargetUse = $('.prt-member>.lis-character' + targetChar + '>.prt-ability-state>.ability' + targetSkill).attr('state') == 2;
			var isTargetExist = $('.prt-member>.lis-character' + targetChar + '>.prt-ability-state>.ability' + targetSkill).attr('state') != 0;
			var canSourceUse = $(this).parent().attr('class').split(/\s+/)[1] == 'btn-ability-available';
			if ((canTargetUse && !canSourceUse) || (!isTargetExist && canSourceUse))
				location.reload();
		});
		// Gran's Buff Eliminate
		if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="150101_sw_"])').length && $('.btn-ability-available>div[ability-name=ディスペル]').length > 1 && stage.gGameStatus.boss.param[0].condition.buff !== undefined && stage.gGameStatus.boss.param[0].condition.buff !== null && stage.gGameStatus.boss.param[0].condition.buff.length > 0) {
			$('.btn-ability-available>div[ability-name=ディスペル]').trigger('tap');
			stage.gGameStatus.boss.param[0].condition.buff = [];
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
		// Magisa's Summon Devil Buff
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])').length && !$('.btn-command-character>.prt-status>.img-ico-status-s[data-status=1370]').length) {
			$('.btn-ability-available>div[ability-id=510]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Shiku's Water Buff
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3030106000"])').length && !$('.btn-command-character>.prt-status>.img-ico-status-s[data-status=1068]').length && $('.btn-ability-available>div[ability-id=509]').length > 1) {
			$('.btn-ability-available>div[ability-id=509]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Use all skill, order : yellow(3) > green(2) > blue(4) > red(1)
		// Expect list: Yusutesu(5322-3, 2117-1), Yoda(2172-1, 3173-3, 555-2), Magisa(510-3), Darkfencer(1201-1), Gran(ディスペル-4), Sara(352-3, 294-3), Meru(4107-1, 195-3), Katarina(2133-1), Shiku(4117-1, 509-3), Lancelot(408-3), Joke(427-3)
		// BUG: If can not use skill, will stop here
		// TODO: var canUseSkill = !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1111]').length;
		else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=3173]):not([ability-id=510]):not([ability-id=352]):not([ability-id=294]):not([ability-id=195]):not([ability-id=509]):not([ability-id=408]):not([ability-id=427])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=3]:not([ability-id=5322]):not([ability-id=3173]):not([ability-id=510]):not([ability-id=352]):not([ability-id=294]):not([ability-id=195]):not([ability-id=509]):not([ability-id=408]):not([ability-id=427])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=555])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=2]:not([ability-id=555])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-name=ディスペル])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=4]:not([ability-name=ディスペル])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172]):not([ability-id=1201]):not([ability-id=2117]):not([ability-id=4107]):not([ability-id=2133]):not([ability-id=4117])').length) {
			$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172]):not([ability-id=1201]):not([ability-id=2117]):not([ability-id=4107]):not([ability-id=2133]):not([ability-id=4117])').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Magisa's Summon Devil Attack
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])').length && $('.hp-show:first>span').html().split('/')[0] <= 1000000 && $('.btn-ability-available>div[ability-id=510]').length > 1) {
			$('.btn-ability-available>div[ability-id=510]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// DarkFencer's Slow
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="150101_sw_"])').length && stage.pJsnData.boss.param[0].recast > stage.pJsnData.boss.param[0].recastmax) {
			location.reload();
			return;
		} else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="150101_sw_"])').length && $('.btn-ability-available>div[ability-id=1201]').length > 1 && stage.pJsnData.boss.param[0].recast < stage.pJsnData.boss.param[0].recastmax) {
			$('.btn-ability-available>div[ability-id=1201]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Meru's claw
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040022000"])').length && $('.btn-ability-available>div[ability-id=4107]').length > 1 && !isMaxMystery('3040022000')) {
			$('.btn-ability-available>div[ability-id=4107]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040022000"])').length && $('.btn-ability-available>div[ability-id=195]').length > 1 && !isMaxMystery('3040022000')) {
			$('.btn-ability-available>div[ability-id=195]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Yusutesu's Shoot
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040069000"])').length && $('.btn-ability-available>div[ability-id=2117]').length > 1 && !isMaxMystery('3040069000')) {
			$('.btn-ability-available>div[ability-id=2117]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Katarina's Blade
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040054000"])').length && $('.btn-ability-available>div[ability-id=2133]').length > 1 && !isMaxMystery('3040054000')) {
			$('.btn-ability-available>div[ability-id=2133]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Shiku's Blade
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3030106000"])').length && $('.btn-ability-available>div[ability-id=4117]').length > 1 && !isMaxMystery('3030106000')) {
			$('.btn-ability-available>div[ability-id=4117]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Lancelot's Buff
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3030108000"])').length && $('.btn-ability-available>div[ability-id=408]').length > 1 && !isMaxMystery('3030108000')) {
			$('.btn-ability-available>div[ability-id=408]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Joke's Buff
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3030014000"])').length && $('.btn-ability-available>div[ability-id=427]').length > 1 && !isMaxMystery('3030014000')) {
			$('.btn-ability-available>div[ability-id=427]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
		// Sara's Defense
		else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040041000"])').length && $('.btn-ability-available>div[ability-id=352]').length > 1 && stage.pJsnData.boss.param[0].recast == 1) {
			$('.btn-ability-available>div[ability-id=352]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040041000"])').length && $('.btn-ability-available>div[ability-id=294]').length > 1 && stage.pJsnData.boss.param[0].recast == 1) {
			$('.btn-ability-available>div[ability-id=294]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
	} else {
		if (!simpleMasterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	dropRateUpAttack();
}

function isMaxMystery(target) {
	// If char don't die and can use Mystery
	var char1 = ($('.lis-character0.btn-command-character.blank').length ||
		$('.prt-member>.lis-character0.btn-command-character>.prt-gauge-special.character0>.prt-black-mask').is(':visible')) ? 0 : parseInt($('.lis-character0>.prt-percent>span:first').html());
	var char2 = ($('.lis-character1.btn-command-character.blank').length ||
		$('.prt-member>.lis-character1.btn-command-character>.prt-gauge-special.character1>.prt-black-mask').is(':visible')) ? 0 : parseInt($('.lis-character1>.prt-percent>span:first').html());
	var char3 = ($('.lis-character2.btn-command-character.blank').length ||
		$('.prt-member>.lis-character2.btn-command-character>.prt-gauge-special.character2>.prt-black-mask').is(':visible')) ? 0 : parseInt($('.lis-character2>.prt-percent>span:first').html());
	var char4 = ($('.lis-character3.btn-command-character.blank').length ||
		$('.prt-member>.lis-character3.btn-command-character>.prt-gauge-special.character3>.prt-black-mask').is(':visible')) ? 0 : parseInt($('.lis-character3>.prt-percent>span:first').html());
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
	if (target == 'all') {
		var someoneMax = char1 >= 100 || char2 >= 100 || char3 >= 100 || char4 >= 100;
		var someoneAlmost = (char1 >= 90 && char1 < 100) || (char2 >= 90 && char2 < 100) || (char3 >= 90 && char3 < 100) || (char4 >= 90 && char4 < 100);
		if (someoneMax && someoneAlmost)
			useMystery = false;
		else if (someoneMax && !someoneAlmost)
			useMystery = true;
	} else {
		var position = $('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="' + target + '"])').attr('pos');
		switch (position) {
			case '0':
				return char1 >= 100;
			case '1':
				return char2 >= 100;
			case '2':
				return char3 >= 100;
			case '3':
				return char4 >= 100;
			default:
				return false;
		}
	}
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
	else if ($('.btn-ability-available>div[ability-name=トレジャーハントII]').length > 1 && canUseSkill)
		$('.btn-ability-available>div[ability-name=トレジャーハントII]').trigger('tap');
	else if ($('.btn-ability-available>div[ability-id=6002]').length > 1 && canUseSkill)
		$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
	else if (stage.pJsnData.boss.param[0].recast == 1 && stage.pJsnData.boss.param[0].name == 'Lv60 リヴァイアサン・マグナ') {
		checkMysteryThenAttack();
		setTimeout(function () {
			location.reload();
		}, 500);
		return;
	}
	// Don't attack when other action running
	else if (!$('.btn-command-character.mask-black-fade').length && !$('.btn-command-character.mask-black').length) {
		checkMysteryThenAttack();
		// Prevent repeat attacks
		var enemyNow = $('.hp-show:first>span').html().split('/')[0];
		if (enemyNow > 1300000) {
			setTimeout(function () {
				if ($('.btn-attack-start.display-on').length)
					location.reload();
			}, 1200);
		}
	}
	setTimeout(analyzingURL, 1500);
}

var smallSolution = -1;
var largeSolution = -1;

function checkSolution() {
	if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
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
	if ($('.btn-chat:not(.comment)>.ico-attention').is(':visible') && /raid_multi/i.test(location.hash)) {
		$('.btn-chat:not(.comment)>.ico-attention').trigger('tap');
		setTimeout(function () {
			if ($('.lis-stamp[chatid=19]').length)
				$('.lis-stamp[chatid=19]').trigger('tap');
			if ($('.btn-usual-close').length)
				$('.btn-usual-close').trigger('tap');
		}, 1000);
		return false;
	}
	if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src*="3040064000"])').length) {
		if (smallSolution == -1 || smallSolution === undefined || largeSolution == -1 || largeSolution === undefined) {
			checkSolution();
			return false;
		}
		var hp = 100 * parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
		if (hp <= 50 && (smallSolution > 0 || largeSolution > 0)) {
			if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
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
		var maxMystery = isMaxMystery('3040064000');
		var threeStatus = getThreeStatus();
		var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length > 1;
		var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;
		if (threeStatus === 0 && canUseStatus && canUseSkill) {
			$('.btn-ability-available>div[ability-id=555]').trigger('tap');
			return false;
		}
		if (threeStatus === 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length > 1 && canUseSkill) {
			$('.btn-ability-available>div[ability-id=3173]').trigger('tap');
			return false;
		}
		if (threeStatus === 0 && $('.btn-ability-available>div[ability-id=2172]').length > 1 && canUseSkill) {
			$('.btn-ability-available>div[ability-id=2172]').trigger('tap');
			return false;
		}
		if (threeStatus == 3 && maxMystery) {
			useMystery = true;
		}
		if (threeStatus != 3 && maxMystery) {
			useMystery = false;
		}
	}
	return true;
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
		if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
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
		if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
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
	if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src*="3040064000"])').length) {
		var maxMystery = isMaxMystery('3040064000');
		var threeStatus = getThreeStatus();
		var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length > 1;
		var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;
		useMystery = true;
		if (threeStatus != 3 && canUseStatus && canUseSkill && maxMystery) {
			$('.btn-ability-available>div[ability-id=555]').trigger('tap');
			return false;
		}
	}
	return true;
}

function stageRolling() {
	stageMsg('==Rolling Stage==');
	if ($('.btn-command-forward').length)
		$('.btn-command-forward').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function raid() {
	stageMsg('==Raid Stage==');
	if ($('.btn-result').is(':visible'))
		$('.btn-result').trigger('tap');
	if (!$('#mkt_ability_use_bar>.prt-ability-list>.lis-ability').is(':visible')) {
		setTimeout(analyzingURL, 1000);
		return;
	}
	var isRabbit = stage.pJsnData.boss.param.length == 3 && stage.pJsnData.boss.param[2].name == 'Lv12 ホワイトラビット' && stage.pJsnData.boss.param[2].hp != '0';
	if (isRabbit) {
		if (!$('.btn-targeting.enemy-3.lock-on').is(':visible') || $('.btn-targeting.enemy-3.invisible').length) {
			$('.btn-targeting.enemy-3.invisible').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.btn-summon-available[summon-code=2030026000]').length && $('.summon-on').length) {
			summonByCode('2030026000');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.btn-summon-available[summon-code=2040025000]').length && $('.summon-on').length) {
			summonByCode('2040025000');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.btn-ability-available>div[ability-name=トレジャーハントII]').length > 1) {
			$('.btn-ability-available>div[ability-name=トレジャーハントII]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		} else if ($('.btn-ability-available>div[ability-id=6002]').length > 1) {
			$('.btn-ability-available>div[ability-id=6002]').trigger('tap');
			setTimeout(analyzingURL, 1000);
			return;
		}
	}
	useMystery = true;
	var enemyTotal = $('.hp-show:first>span').html().split('/')[1].split('<br>')[0];
	if (enemyTotal >= 500000)
		if (!simpleMasterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	else if (enemyTotal >= 1000000)
		if (!masterYoda()) {
			setTimeout(analyzingURL, 1000);
			return;
		}
	else if (enemyTotal >= 1500000) {
		raidSmartFighting();
		return;
	}
	if ($('.summon-on').length) {
		summonByCode('all');
		setTimeout(analyzingURL, 1000);
		return;
	}
	if ($('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
		$('#mkt_ability_use_bar>.prt-ability-list>.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
		setTimeout(analyzingURL, 1000);
		return;
	}
	dropRateUpAttack();
}

function battleResult() {
	stageMsg('==Result Stage==');
	if ($('.btn-usual-ok').length)
		$('.btn-usual-ok').trigger('tap');
	else if ($('.btn-control').length)
		$('.btn-control').trigger('tap');
	setTimeout(analyzingURL, 1000);
}

function assist() {
	stageMsg('==Assist Stage==');
	if ($('#tab-multi.active').length) {
		$('#tab-multi.active').trigger('tap');
		setTimeout(function () {
			// You can see pic of summon at src/assist
			if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000_hell]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2030002000]').trigger('tap');
			else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040128000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
				$('.img-raid-thumbnail[alt=2040128000_hell]').trigger('tap');
			else
				return;
			setTimeout(function () {
				if ($('.prt-item-disp:last>.prt-use-button>.btn-use-full').length)
					$('.prt-item-disp:last>.prt-use-button>.btn-use-full').trigger('tap');
			}, 3000);
		}, 1000);
	} else if ($('#tab-event.active').length) {
		$('#tab-event.active').trigger('tap');
	}
	setTimeout(analyzingURL, 3000);
}

function exchange() {
	stageMsg('==Exchange Stage==');
	if ($('.frm-list-select').length) {
		$('.frm-list-select').val(1);
		$('.frm-list-select').trigger('change');
	}
	if ($('.btn-exchange').length)
		$('.btn-exchange').trigger('tap');
	setTimeout(function () {
		if ($('.num-set').length) {
			$('.num-set').val($('.num-set>option:last-child').val());
			$('.num-set').trigger('change');
		}
		setTimeout(function () {
			if ($('.btn-usual-text.exchange').length)
				$('.btn-usual-text.exchange').trigger('tap');
			setTimeout(analyzingURL, 100);
		}, 300);
	}, 500);
}

function questError() {
	if ($('.pop-common-error.pop-show>.prt-popup-body>.txt-popup-body:contains(既にバトルは終了しました)').is(':visible')) {
		stageMsg('==questError Stage==');
		//TODO: detect where to go
		//history.go(-1);
	}
	setTimeout(analyzingURL, 1000);
}

function rejectFriend() {
	if ($('#waiting_tabs.active').length) {
		stageMsg('==rejectFriend Stage==');
		$('#cnt-waiting>div>div>div>.prt-friend-detail>.prt-friend-name>.txt-rank').each(function(){
			var rank = parseInt($(this).html().replace('Rank', ''));
			if (rank < 90) {
				if (!$('.pop-usual.pop-show').is(':visible'))
					$(this).parent().parent().parent().children('.btn-friend-action').trigger('tap');
				if ($('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請がきています))>.prt-popup-subbody>.btn-usual-cancel').is(':visible'))
					$('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請がきています))>.prt-popup-subbody>.btn-usual-cancel').trigger('tap');
				if ($('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請を本当に却下しますか))+div>.btn-usual-ok').is(':visible'))
					$('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請を本当に却下しますか))+div>.btn-usual-ok').trigger('tap');
				if ($('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請を却下しました))+div>.btn-usual-ok').is(':visible'))
					$('.prt-popup-body:has(.txt-popup-body:contains(フレンド申請を却下しました))+div>.btn-usual-ok').trigger('tap');
			}
		});
	}
	setTimeout(analyzingURL, 1000);
}
