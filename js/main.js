/*jshint scripturl:true*/
/*jshint esnext: true */
(function () {
    // Restore windows.console
    var iframeTemp = document.createElement('iframe');
    iframeTemp.style.display = 'none';
    document.body.appendChild(iframeTemp);
    window.console = iframeTemp.contentWindow.console;
    // Overring default alert
    window.alert = function (msg) {
        console.log('Alert: ' + msg);
        location.reload();
    };
    // Create script switcher button
    var stopBtn = document.createElement('li');
    stopBtn.className = 'BH29UqMRA7nnSLfpZ1Yxk';
    stopBtn.onclick = function () {
        toggleScript();
    };
    stopBtn.innerHTML = '<span id="stopBtn" value="0" style="color: #7a8593;line-height: 28px;">Stop</span>';
    $('ul[data-reactid=".0.0.0.1"]').append(stopBtn);
    // Create quick-action menu
    var quickMenu = document.createElement('div');
    quickMenu.id = 'cnt-submenu-navi';
    $('#cnt-submenu-navi').after(quickMenu);
    var assistLink = document.createElement('div');
    assistLink.className = 'btn-sub-assist';
    assistLink.onclick = function () {
        location.hash = "#quest/assist";
    };
    assistLink.innerHTML = 'Assist';
    quickMenu.appendChild(assistLink);
    var casinoLink = document.createElement('div');
    casinoLink.className = 'btn-sub-casino';
    casinoLink.onclick = function () {
        location.hash = "#casino/exchange";
    };
    casinoLink.innerHTML = 'Casino';
    quickMenu.appendChild(casinoLink);
    // Start analyzing
    analyzingURL();
})();

var timeMagnification = 1.2;

// Promise version set-timeout
function sleep(time) {
    time = parseFloat(time) * (Math.random() + 0.8) * timeMagnification;
    console.log('%c' + 'sleep ' + Number(time).toFixed(2) + 'ms', 'color: #808080');
    return new Promise(resolve => setTimeout(resolve, time));
}

// Save console error message
(function (console) {
    console.save = function (data, filename) {
        if (!data) {
            console.error('Console.save: No data');
            return;
        }
        if (!filename)
            filename = 'console.json';
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

var ignoreError = false;
Game.reportError = function (msg, url, line, column, err, callback) {
    var recordLog = 'Message: ' + msg + '\r\nUrl: ' + url + '\r\nLine: ' + line + '\r\nColumn: ' + column + '\r\nError: ' + err + '\r\nCallback: ' + callback;
    errorMsg(recordLog);
    // msg.indexOf("Script error") > -1
    var needReload = msg.indexOf("'0' of undefined") > -1 || msg.indexOf("'1' of undefined") > -1 || msg.indexOf("'2' of undefined") > -1 || msg.indexOf("'3' of undefined") > -1 || msg.indexOf("'4' of undefined") > -1 || msg.indexOf("'5' of undefined") > -1 || msg.indexOf("'6' of undefined") > -1 || msg.indexOf("'7' of undefined") > -1 || msg.indexOf("'8' of undefined") > -1 || msg.indexOf("'9' of undefined") > -1 || msg.indexOf("'attributes' of undefined") > -1 || msg.indexOf("'indexOf' of undefined") > -1 || msg.indexOf("'children' of null") > -1 || msg.indexOf("Unexpected token") > -1 || msg.indexOf("POPUP") > -1 || msg.indexOf("'level' of undefined") > -1 || msg.indexOf("'item' of undefined") > -1 || msg.indexOf("indexOf") > -1 || msg.indexOf("'boss' of undefined") > -1;
    if (needReload && !ignoreError) {
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
        if (ignoreError)
            console.save(recordLog, 'errorRecord-' + datetime + '.log');
    }
};

// Setting localStorage with expiration
var storage = {
    save: function (key, jsonData, expirationMS) {
        if (typeof(Storage) == 'undefined')
            return false;
        var record = {
            value: JSON.stringify(jsonData),
            timestamp: new Date().getTime() + expirationMS
        };
        localStorage.setItem(key, JSON.stringify(record));
        return jsonData;
    },
    load: function (key) {
        if (typeof(Storage) == 'undefined')
            return false;
        var record = JSON.parse(localStorage.getItem(key));
        if (!record)
            return false;
        return (new Date().getTime() < record.timestamp && JSON.parse(record.value));
    }
};

function saveDailyMagna(fire, water, earth, wind, light, dark) {
    // The expiration of reset time at five tomorrow
    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    var day = tomorrow.getDate();
    var month = tomorrow.getMonth();
    var year = tomorrow.getFullYear();
    var expirationTime = new Date(year, month, day, 5, 0, 0, 0) - new Date();
    storage.save('dailyMagna', {
        fire: fire,
        water: water,
        earth: earth,
        wind: wind,
        light: light,
        dark: dark
    }, expirationTime);
}

var runTimes = 0;

function errorMsg(msg) {
    console.log('%c' + msg, 'background-color: #ffd0da; color: #c10000');
}

function stageMsg(msg) {
    console.log('%c' + msg, 'color: #30aeff');
}

function toggleScript() {
    if ($('#stopBtn').attr('value') == '1') {
        console.log('Starting Script ...');
        $('#stopBtn').attr('value', '0');
        $('#stopBtn').html('Stop');
        analyzingURL();
    } else {
        console.log('Stopping Script ...');
        $('#stopBtn').attr('value', '1');
        $('#stopBtn').html('Start');
    }
}

function $skillContainText(textData) {
    return $('.btn-ability-available>div[text-data*="' + textData + '"]');
}

function analyzingURL() {
    if ($('#stopBtn').attr('value') == '1')
        return;
    // PIN reminder
    if ($('.prt-popup-header:contains(認証)').length) {
        var audio = new Audio(alertUrl);
        audio.play();
        toggleScript();
        return;
    }
    // Every 300 times of analyzing, reload to avoid error occurs.
    if (runTimes > 300) {
        location.reload();
        return;
    }
    runTimes++;
    var hash = location.hash;
    console.log('URL Hash : ' + hash);
    var notBattle = !/supporter/i.test(hash) && !/raid_multi/i.test(hash) && !/result_multi/i.test(hash) && !/raid/i.test(hash);
    // Tab workflow for coopraid & assist & autoExtraEvent & autoEvent & dailyMagna
    if (localStorage.getItem('coopraid') !== null) {
        var notCoopraid = !/coopraid/i.test(hash) && !/supporter/i.test(hash) && !/raid_multi/i.test(hash) && !/quest\/assist\/unclaimed/i.test(hash);
        if (localStorage.coopraid == tabId && notCoopraid) {
            sleep(1000).then(() => {
                location.hash = '#coopraid';
                analyzingURL();
            });
            return;
        }
    }
    if (localStorage.getItem('assist') !== null) {
        var notAssist = !/quest\/assist/i.test(hash) && !/supporter/i.test(hash) && !/raid_multi/i.test(hash) && !/quest\/assist\/unclaimed/i.test(hash);
        if (localStorage.assist == tabId && notAssist) {
            sleep(1000).then(() => {
                location.hash = '#quest/assist';
                analyzingURL();
            });
            return;
        }
    }
    if (localStorage.getItem('autoExtraEvent') !== null) {
        if (localStorage.autoExtraEvent == tabId && notBattle && !/quest\/extra\/event/i.test(hash)) {
            sleep(1000).then(() => {
                location.hash = '#quest/extra/event';
                analyzingURL();
            });
            return;
        }
    }
    if (localStorage.getItem('autoExtra') !== null) {
        if (localStorage.autoExtra == tabId && notBattle && !/quest\/extra/i.test(hash)) {
            sleep(1000).then(() => {
                location.hash = '#quest/extra';
                analyzingURL();
            });
            return;
        }
    }
    var autoEventRegex = new RegExp('event\/' + autoEventUrl, 'i');
    if (localStorage.getItem('autoEvent') !== null) {
        var notAutoEvent = !autoEventRegex.test(hash) && notBattle && !/quest\/scene/i.test(hash) && !/quest\/stage/i.test(hash);
        if (localStorage.autoEvent == tabId && notAutoEvent) {
            sleep(1000).then(() => {
                location.hash = '#event/' + autoEventUrl;
                analyzingURL();
            });
            return;
        }
    }
    if (localStorage.getItem('magna') !== null && storage !== null && storage !== undefined) {
        var dailyMagna = storage.load('dailyMagna');
        // Not exist or expired
        if (dailyMagna === false)
            saveDailyMagna(3, 3, 3, 3, 3, 3);
        else if (localStorage.magna == tabId && notBattle) {
            if (dailyMagna.fire > 0) {
                saveDailyMagna(dailyMagna.fire - 1, dailyMagna.water, dailyMagna.earth, dailyMagna.wind, dailyMagna.light, dailyMagna.dark);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300091/1';
                    analyzingURL();
                });
                return;
            } else if (dailyMagna.water > 0) {
                saveDailyMagna(dailyMagna.fire, dailyMagna.water - 1, dailyMagna.earth, dailyMagna.wind, dailyMagna.light, dailyMagna.dark);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300151/1';
                    analyzingURL();
                });
                return;
            } else if (dailyMagna.earth > 0) {
                saveDailyMagna(dailyMagna.fire, dailyMagna.water, dailyMagna.earth - 1, dailyMagna.wind, dailyMagna.light, dailyMagna.dark);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300191/1';
                    analyzingURL();
                });
                return;
            } else if (dailyMagna.wind > 0) {
                saveDailyMagna(dailyMagna.fire, dailyMagna.water, dailyMagna.earth, dailyMagna.wind - 1, dailyMagna.light, dailyMagna.dark);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300041/1';
                    analyzingURL();
                });
                return;
            } else if (dailyMagna.light > 0) {
                saveDailyMagna(dailyMagna.fire, dailyMagna.water, dailyMagna.earth, dailyMagna.wind, dailyMagna.light - 1, dailyMagna.dark);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300221/1';
                    analyzingURL();
                });
                return;
            } else if (dailyMagna.dark > 0) {
                saveDailyMagna(dailyMagna.fire, dailyMagna.water, dailyMagna.earth, dailyMagna.wind, dailyMagna.light, dailyMagna.dark - 1);
                sleep(1000).then(() => {
                    location.hash = '#quest/supporter/300251/1';
                    analyzingURL();
                });
                return;
            } else
                localStorage.removeItem('magna');
        }
    }
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
    else if (/gacha/i.test(hash))
        gacha();
    else if (autoEventRegex.test(hash))
        autoEvent();
    else if (/raid_multi/i.test(hash))
        raidMulti();
    else if (/raid/i.test(hash))
        raid();
    else if (/result_multi/i.test(hash) || /result/i.test(hash))
        battleResult();
    else if (/quest\/assist\/unclaimed/i.test(hash))
        unclaimed();
    else if (/quest\/assist/i.test(hash))
        assist();
    else if (/quest\/stage/i.test(hash))
        stageRolling();
    else if (/quest\/index/i.test(hash))
        questError();
    else if (/friend/i.test(hash))
        rejectFriend();
    else if (/quest\/extra\/event/i.test(hash))
        autoExtraEvent();
    else if (/quest\/extra/i.test(hash))
        autoExtra();
    else if (/event/i.test(hash))
        eventReopen();
    else if (/sell/i.test(hash))
        sellNormalWeapon();
    else if (/list\/detail_weapon/i.test(hash))
        detailWeapon();
    else if (/quest\/scene/i.test(hash))
        skipScene();
    else {
        runTimes--;
        sleep(5000).then(() => analyzingURL());
    }
}

function coopraid() {
    stageMsg('==Coopraid Stage==');
    if ($('.btn-join').length)
        $('.btn-join').trigger('tap');
    else if ($('.txt-popup-body:contains(未確認バトル)').is(':visible'))
        $('.btn-usual-ok').trigger('tap');
    sleep(1000).then(() => analyzingURL());
}

function offer() {
    stageMsg('==Offer Stage==');
    if ($('.prt-wanted-list>div').length) {
        sleep(800).then(() => {
            // Avoid entering bad room
            var $room = $('.txt-room-comment:not(:contains(募)):not(:contains(BOT)):not(:contains(ＢＯＴ)):not(:contains(禁)):not(:contains(初心)):not(:contains(順)):not(:contains(貼)):not(:contains(相互)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-1)');
            var $room2 = $('.txt-room-comment:not(:contains(募)):not(:contains(BOT)):not(:contains(ＢＯＴ)):not(:contains(禁)):not(:contains(初心)):not(:contains(順)):not(:contains(貼)):not(:contains(相互)):not(:contains(待機)):not(:contains(放置)):not(:contains(隔離)):not(:contains(ツーラー)):not(:contains(ツ-ラ-)):not(:contains(監禁)):not(:contains(スライム)):not(:contains(爆))+.prt-room-info>.prt-room-detail>.prt-base-data:has(.prt-invite-type-6)');
            if ($room.length)
                $room.trigger('tap');
            else if ($room2.length)
                $room2.trigger('tap');
            return sleep(500);
        }).then(() => {
            if ($('.btn-usual-join').length)
                $('.btn-usual-join').trigger('tap');
            return sleep(500);
        }).then(() => {
            if ($('.btn-usual-ok').length)
                $('.btn-usual-ok').trigger('tap');
            return sleep(500);
        }).then(() => {
            if ($('.btn-refresh-list').length)
                $('.btn-refresh-list').trigger('tap');
            return sleep(500);
        }).then(() => {
            if ($('.btn-usual-cancel').length)
                $('.btn-usual-cancel').trigger('tap');
            return sleep(500);
        }).then(() => analyzingURL());
        return;
    }
    sleep(1000).then(() => analyzingURL());
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
    if ($('.txt-popup-body:contains(未確認バトル)').is(':visible') && $('.btn-usual-ok').length)
        $('.btn-usual-ok').trigger('tap');
    if ($('.btn-make-ready-large.not-ready').length)
        $('.btn-make-ready-large.not-ready').trigger('tap');
    else if ($('.btn-execute-ready.se-ok').length)
        $('.btn-execute-ready.se-ok').trigger('tap');
    // If owner send thanks & time < 58 minutes, leave room
    else if (($('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp9"]:visible) + .prt-char-status>.ico-owner').length || $('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp10"]:visible) + .prt-char-status>.ico-owner').length) && $('.txt-count-down').length && parseInt($('.txt-count-down').html().replace('残り ', '').replace('分', '')) < 58)
        sendRoomStamp('leave');
    // If others(more than two) send stamp, to do so for polite
    else if (!$('.prt-member-balloon.btn-member-balloon:visible + div + .prt-member-name:contains(' + userName + ')').length && $('.prt-member-name:contains(' + userName + ')').is(':visible') && $('.txt-room-comment:not(:contains(挨拶)):not(:contains(無言))').length && $('.prt-member-balloon.btn-member-balloon:visible:not(:has(div>img[src*="stamp9"])):not(:has(div>img[src*="stamp10"]))').length > 1)
        sendRoomStamp();
    // If this room freeze, leave room
    else if (runTimes > 240 && $('.txt-count-down').length && parseInt($('.txt-count-down').html().replace('残り ', '').replace('分', '')) < 55)
        sendRoomStamp('leave');
    sleep(1000).then(() => analyzingURL());
}

function leaveRoom() {
    if ($('.btn-close-room').length)
        $('.btn-close-room').trigger('tap');
    else if ($('.btn-leave-room').length)
        $('.btn-leave-room').trigger('tap');
    sleep(500).then(() => {
        if ($('.btn-close').length)
            $('.btn-close').trigger('tap');
        else if ($('.btn-leave').length)
            $('.btn-leave').trigger('tap');
        return sleep(500);
    }).then(() => {
        if ($('.btn-usual-close').length)
            $('.btn-usual-close').trigger('tap');
    });
}

function sendRoomStamp(state) {
    if (state == 'leave') {
        if (!$('.prt-member-balloon.btn-member-balloon:has(div>img[src*="stamp9"]:visible) + div + .prt-member-name:contains(' + userName + ')').length) {
            if ($('.btn-members-stamp').length)
                $('.btn-members-stamp').trigger('tap');
            sleep(500).then(() => {
                if ($('.lis-stamp.selectable>img[data-stamp-id=9]').length)
                    $('.lis-stamp.selectable>img[data-stamp-id=9]').trigger('tap');
                if ($('.btn-usual-cancel').length)
                    $('.btn-usual-cancel').trigger('tap');
            });
        } else
            leaveRoom();
    } else {
        if ($('.btn-members-stamp').length)
            $('.btn-members-stamp').trigger('tap');
        sleep(500).then(() => {
            if ($('.lis-stamp.selectable>img[data-stamp-id=4]').length)
                $('.lis-stamp.selectable>img[data-stamp-id=4]').trigger('tap');
            if ($('.btn-usual-cancel').length)
                $('.btn-usual-cancel').trigger('tap');
        });
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
    var isRabbit = /supporter\/101441/i.test(location.hash);
    var isROnlyForWind = /supporter\/101121/i.test(location.hash);
    var isEventForFighter = /supporter\/709621/i.test(location.hash) || /supporter\/709631/i.test(location.hash) || /supporter\/706821/i.test(location.hash) || /supporter\/706831/i.test(location.hash);
    var isEventForFireSolo = /supporter\/709961/i.test(location.hash) || /supporter\/709981/i.test(location.hash) || /supporter\/709601/i.test(location.hash) || /supporter\/710171/i.test(location.hash) || /supporter\/710661/i.test(location.hash) || /supporter\/710891/i.test(location.hash) || /supporter\/711751/i.test(location.hash) || /supporter\/711761/i.test(location.hash);
    var isEventForEarth = false;
    var isEventForWind = false;
    var isEventForFire = false;
    var isEventForWater = false;
    var isEventForLight = false;
    var isEventForDark = false;

    if ($('.txt-raid-name').is(':visible')) {
        switch ($('.btn-type.selected').attr('data-type')) {
        case '1':
            isEventForFire = true;
            break;
        case '2':
            isEventForWater = true;
            break;
        case '3':
            isEventForEarth = true;
            break;
        case '4':
            isEventForWind = true;
            break;
        case '5':
            isEventForLight = true;
            break;
        case '6':
            isEventForDark = true;
            break;
        }
    } else {
        isEventForEarth = /supporter\/300161/i.test(location.hash) || /supporter\/708491/i.test(location.hash) || /supporter\/708501/i.test(location.hash) || /supporter\/500171/i.test(location.hash) || /supporter\/500731/i.test(location.hash) || /supporter\/500741/i.test(location.hash) || /supporter\/710351/i.test(location.hash) || /supporter\/710361/i.test(location.hash) || /supporter\/710501/i.test(location.hash) || /supporter\/710511/i.test(location.hash) || /supporter\/711041/i.test(location.hash) || /supporter\/711051/i.test(location.hash) || /supporter\/712101/i.test(location.hash) || /supporter\/712111/i.test(location.hash) || /supporter\/500621/i.test(location.hash) || /supporter\/714641/i.test(location.hash) || /supporter\/714631/i.test(location.hash) || /supporter\/714621/i.test(location.hash);

        isEventForWind = /supporter\/300261/i.test(location.hash) || /supporter\/708641/i.test(location.hash) || /supporter\/708651/i.test(location.hash) || /supporter\/709951/i.test(location.hash) || /supporter\/709971/i.test(location.hash) || /supporter\/709571/i.test(location.hash) || /supporter\/709591/i.test(location.hash) || /supporter\/709361/i.test(location.hash) || /supporter\/710091/i.test(location.hash) || /supporter\/711141/i.test(location.hash) || /supporter\/711151/i.test(location.hash) || /supporter\/500631/i.test(location.hash) || /supporter\/712301/i.test(location.hash) || /supporter\/712311/i.test(location.hash);

        isEventForFire = /supporter\/300051/i.test(location.hash) || /supporter\/708791/i.test(location.hash) || /supporter\/708801/i.test(location.hash) || /supporter\/500211/i.test(location.hash) || $('.prt-raid-thumbnail>img[alt=8101223]').length /*Grandin*/ || /supporter\/711091/i.test(location.hash) || /supporter\/711101/i.test(location.hash) || /supporter\/500641/i.test(location.hash) || /supporter\/713811/i.test(location.hash) || /supporter\/713801/i.test(location.hash) || /supporter\/713791/i.test(location.hash);

        isEventForWater = /supporter\/300101/i.test(location.hash) || /supporter\/500701/i.test(location.hash) || /supporter\/500711/i.test(location.hash) || /supporter\/599811/i.test(location.hash) || /supporter\/708941/i.test(location.hash) || /supporter\/708951/i.test(location.hash) || /supporter\/708961/i.test(location.hash) || /supporter\/708971/i.test(location.hash) || /supporter\/709201/i.test(location.hash) || /supporter\/709211/i.test(location.hash) || /supporter\/709441/i.test(location.hash) || /supporter\/709451/i.test(location.hash) || /supporter\/711191/i.test(location.hash) || /supporter\/711201/i.test(location.hash) || /supporter\/500611/i.test(location.hash) || /supporter\/714581/i.test(location.hash) || /supporter\/714571/i.test(location.hash) || /supporter\/714561/i.test(location.hash);

        isEventForLight = /supporter\/300281/i.test(location.hash) || /supporter\/710131/i.test(location.hash) || /supporter\/710741/i.test(location.hash) || /supporter\/710931/i.test(location.hash) || /supporter\/711601/i.test(location.hash) || /supporter\/711611/i.test(location.hash) || /supporter\/711401/i.test(location.hash) || /supporter\/711411/i.test(location.hash) || /supporter\/711901/i.test(location.hash) || /supporter\/711911/i.test(location.hash) || /supporter\/500661/i.test(location.hash);

        isEventForDark = /supporter\/300271/i.test(location.hash) || /supporter\/709801/i.test(location.hash) || /supporter\/709811/i.test(location.hash) || /supporter\/300561/i.test(location.hash) || /supporter\/710701/i.test(location.hash) || /supporter\/710971/i.test(location.hash) || /supporter\/500651/i.test(location.hash);
    }

    if ($('.prt-deck-select').is(':visible'))
        console.log('Team selected.');
    else if (isEventForEarth || isEventForFighter) {
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
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(土):not(:contains(「大地」)):not(:contains(チェインバースト))').trigger('tap');
        // 土100% Anima
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(創樹方陣):not(:contains(「大地」))').trigger('tap');
        // 土
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(土)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(土)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
    } else if (isEventForWind || isROnlyForWind) {
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
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」)):not(:contains(チェインバースト))').trigger('tap');
        // 風
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(風)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(風)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
    } else if (isEventForFire || isEventForFireSolo) {
        // 火100% Anima
        if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(機炎方陣):not(:contains(「業火」))').trigger('tap');
        // 火80%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(火):not(:contains(「業火」))').trigger('tap');
        // 火70%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(火):not(:contains(「業火」))').trigger('tap');
        // 火60%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(火):not(:contains(「業火」))').trigger('tap');
        // 火50%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(火):not(:contains(「業火」)):not(:contains(チェインバースト))').trigger('tap');
        // 火
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(火)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(火)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
    } else if (isEventForWater) {
        // 水80% + 20%hp
        if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(HP):contains(水):not(:contains(「渦潮」))').trigger('tap');
        // 水80%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(水):not(:contains(「渦潮」))').trigger('tap');
        // 水60% + 20%hp
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(水):not(:contains(「渦潮」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(水):not(:contains(「渦潮」))').trigger('tap');
        // 水60%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(水):not(:contains(「渦潮」))').trigger('tap');
        // 水50%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(水):not(:contains(「渦潮」)):not(:contains(チェインバースト))').trigger('tap');
        // 水100% Anima
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(海神方陣):not(:contains(「渦潮」))').trigger('tap');
        // 水
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(水)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(水)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
    } else if (isEventForLight) {
        // 光120%
        if ($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(光):not(:contains(「雷電」)):not(:contains(チェインバースト))').trigger('tap');
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
        // 光キャラ50% + 20%hp
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(光):not(:contains(「雷電」))').trigger('tap');
        // 光75%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(光):not(:contains(「雷電」))').trigger('tap');
        // 光60%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(光):not(:contains(「雷電」))').trigger('tap');
        // 光50%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(光):not(:contains(「雷電」)):not(:contains(チェインバースト))').trigger('tap');
        // 光100% Anima
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(騎解方陣):not(:contains(「雷電」))').trigger('tap');
        // 光
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(光)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(光)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
    } else if (isEventForDark) {
        // 闇キャラ60% + 40%hp
        if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇120%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(120):contains(闇):not(:contains(「憎悪」)):not(:contains(チェインバースト))').trigger('tap');
        // 闇100%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇75% + 15%hp
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇キャラ50% + 20%hp
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇75%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(75):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇60% + 20%hp
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(HP):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇60%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(闇):not(:contains(「憎悪」))').trigger('tap');
        // 闇50%
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」)):not(:contains(チェインバースト))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(闇):not(:contains(「憎悪」)):not(:contains(チェインバースト))').trigger('tap');
        // 闇100% Anima
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(黒霧方陣):not(:contains(「憎悪」))').trigger('tap');
        // 闇
        else if ($('.prt-supporter-detail>.prt-summon-skill:contains(闇)').length)
            $('.prt-supporter-detail>.prt-summon-skill:contains(闇)').trigger('tap');
        // Others
        else if ($('.prt-supporter-detail').length)
            $('.prt-supporter-detail').trigger('tap');
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
    // 風80%
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(80):contains(風):not(:contains(「竜巻」))').trigger('tap');
    // 風70%
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(70):contains(風):not(:contains(「竜巻」))').trigger('tap');
    // 風60%
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(60):contains(風):not(:contains(「竜巻」))').trigger('tap');
    // 風100% Anima
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(100):contains(嵐竜方陣):not(:contains(「竜巻」))').trigger('tap');
    // 風50%
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」)):not(:contains(チェインバースト))').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(50):contains(風):not(:contains(「竜巻」)):not(:contains(チェインバースト))').trigger('tap');
    // 風
    else if ($('.prt-supporter-detail>.prt-summon-skill:contains(風)').length)
        $('.prt-supporter-detail>.prt-summon-skill:contains(風)').trigger('tap');
    // Others
    else if ($('.prt-supporter-detail').length)
        $('.prt-supporter-detail').trigger('tap');
    sleep(500).then(() => {
        if (isEventForEarth)
            selectTeam('1-2');
        else if (isEventForWind)
            selectTeam('1-3');
        else if (isEventForFire)
            selectTeam('1-4');
        else if (isEventForWater)
            selectTeam('1-1');
        else if (isRabbit)
            selectTeam('1-5');
        else if (isEventForDark)
            selectTeam('2-0');
        else if (isEventForLight)
            selectTeam('2-1');
        else if (isEventForFireSolo)
            selectTeam('2-2');
        else if (isROnlyForWind)
            selectTeam('2-4');
        else if (isEventForFighter)
            selectTeam('2-5');
        else
            selectTeam('1-0');
    });
}

function selectTeam(n) {
    // pos[0] = Slot 1 ~ 7, pos[1] = Team 0 ~ 5
    var pos = n.split('-');
    sleep(500).then(() => {
        if (!$('.btn-select-group[data-id=' + pos[0] + '].selected').length)
            $('.btn-select-group[data-id=' + pos[0] + ']').trigger('tap');
        return sleep(500);
    }).then(() => {
        if ($('.btn-select-group[data-id=' + pos[0] + '].selected').length && !$('.flex-control-nav>li:eq(' + n + ')>a.flex-active').length)
            $('.flex-control-nav>li:eq(' + pos[1] + ')>a').click();
        return sleep(500);
    }).then(() => {
        if ($('.btn-usual-ok').length && $('.btn-select-group[data-id=' + pos[0] + '].selected').length && $('.flex-control-nav>li:eq(' + pos[1] + ')>a.flex-active').length)
            $('.btn-usual-ok').trigger('tap');
        return sleep(500);
    }).then(() => analyzingURL());
}

var useMystery = true;
var enemyHpThresholdLevel0 = 500000;
var enemyHpThresholdLevel1 = 1000000;
var enemyHpThresholdLevel2 = 3000000;
var enemyHpThresholdLevel3 = 7000000;

function raidMulti() {
    if ($('.btn-result').is(':visible'))
        $('.btn-result').trigger('tap');
    // Wait for loading
    if (typeof stage.gGameStatus === 'undefined' || $('.prt-ready').is(':visible') || $('.prt-black-bg').is(':visible')) {
        sleep(1000).then(() => analyzingURL());
        return;
    }
    // Reload if error occurs or boss-dead message shown
    if ($('.prt-error-infomation').is(':visible') || $('.prt-popup-header:contains(このバトルは終了しました)').is(':visible')) {
        location.reload();
        return;
    }
    // Reload if all boss is dead (Must after loading)
    var numOfBossDead = 0;
    for (var i = 0; i < stage.gGameStatus.boss.param.length; i++) {
        if (stage.gGameStatus.boss.param[i].hp == '0') {
            numOfBossDead++;
        }
        if (numOfBossDead >= stage.gGameStatus.boss.param.length) {
            location.reload();
            return;
        }
    }
    useMystery = true;
    // Press OK expect using エリクシール
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
        stageMsg('==Raid Coopraid Stage==');
        // If no other persons, withdraw
        if ($('.lis-user').length == 1) {
            if ($('.btn-withdraw:contains(離脱する)').is(':visible')) {
                $('.btn-withdraw:contains(離脱する)').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if ($('.btn-withdrow.breakaway').is(':visible')) {
                $('.btn-withdrow.breakaway').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if (!$('.prt-popup-header:contains(バトルメニュー)').is(':visible')) {
                $('.btn-raid-menu.menu').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        }
        var enemyTotal = 0;
        for (i = 0; i < stage.gGameStatus.boss.param.length; i++)
            enemyTotal += parseInt(stage.gGameStatus.boss.param[i].hpmax);
        if (enemyTotal >= enemyHpThresholdLevel3) {
            raidSmartFighting();
            return;
        } else if (enemyTotal >= enemyHpThresholdLevel2) {
            if (stage.gGameStatus.attacking == 1) {
                console.log('Other action running ... ');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if (!masterYoda()) {
                sleep(1000).then(() => analyzingURL());
                return;
            } else if ($('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
                $('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        } else if (enemyTotal >= enemyHpThresholdLevel1) {
            if (stage.gGameStatus.attacking == 1) {
                console.log('Other action running ... ');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if (!simpleMasterYoda()) {
                sleep(1000).then(() => analyzingURL());
                return;
            }
        }
    } else {
        stageMsg('==Raid Multi Stage==');
        var enemyHpNow = 0;
        for (i = 0; i < stage.gGameStatus.boss.param.length; i++)
            enemyHpNow += parseInt(stage.gGameStatus.boss.param[i].hp);
        var isMVP = $('.lis-user.rank1.player>.prt-rank:contains(1位)').is(':visible');
        if (enemyHpNow <= enemyHpThresholdLevel2 && !isMVP) {
            if (stage.gGameStatus.attacking == 1) {
                console.log('Other action running ... ');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if (!simpleMasterYoda()) {
                sleep(1000).then(() => analyzingURL());
                return;
            }
        } else if (enemyHpNow <= enemyHpThresholdLevel3 && !isMVP) {
            if (stage.gGameStatus.attacking == 1) {
                console.log('Other action running ... ');
                sleep(1000).then(() => analyzingURL());
                return;
            } else if (!masterYoda()) {
                sleep(1000).then(() => analyzingURL());
                return;
            } else if ($('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
                $('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        } else {
            raidSmartFighting();
            return;
        }
    }
    if (stage.gGameStatus.attacking == 1) {
        console.log('Other action running ... ');
        sleep(1000).then(() => analyzingURL());
    } else {
        checkMysteryThenAttack();
        if (reload) {
            sleep(1000).then(() => {
                if (stage.gGameStatus.attacking == 1)
                    location.reload();
                else
                    analyzingURL();
            });
        } else
            sleep(1000).then(() => analyzingURL());
    }
}

// Choose-the-best-Enemy System
function lockEnemy(enemy) {
    var position = parseInt(enemy) + 1;
    if (!$('.btn-targeting.enemy-' + position + '.lock-on').is(':visible') || $('.btn-targeting.enemy-' + position + '.invisible').length) {
        $('.btn-targeting.enemy-' + position + '.invisible').trigger('tap');
        return false;
    } else
        return true;
}

var treasureMax = false;

function raidSmartFighting() {
    isMaxMystery('all');
    var enemyHpNow = 0;
    var weaknessEnemy = 0;
    var bossEnemy = 0;
    var min = Number.MAX_VALUE,
    max = 0;
    for (var i = 0; i < stage.gGameStatus.boss.param.length; i++) {
        var hpNow = parseInt(stage.gGameStatus.boss.param[i].hp);
        var hpMax = parseInt(stage.gGameStatus.boss.param[i].hpmax);
        var enemyName = stage.gGameStatus.boss.param[i].name.ja;
        enemyHpNow += hpNow;
        if (hpNow < min && hpNow !== 0) {
            min = hpNow;
            weaknessEnemy = i;
        }
        if (hpMax > max) {
            max = hpMax;
            bossEnemy = i;
        }
        // Some special boss
        if (enemyName == 'Lv100 ジ・オーダー・グランデ' || enemyName == 'Lv100 調停の翼' || enemyName == 'Lv100 ティアマト・マグナ＝エア') {
            weaknessEnemy = i;
            bossEnemy = i;
            break;
        }
        if (enemyName == 'Lv100 シュヴァリエ・マグナ' && parseInt(stage.gGameStatus.boss.param[2].hp) > 0) {
            weaknessEnemy = 2;
            bossEnemy = 2;
            break;
        } else if (enemyName == 'Lv100 シュヴァリエ・マグナ' && parseInt(stage.gGameStatus.boss.param[2].hp) === 0) {
            weaknessEnemy = 0;
            bossEnemy = 0;
            break;
        }
    }
    var isStreetFighter = $('.txt-battle.round').length || $('.txt-battle.stage').length;
    if (enemyHpNow > enemyHpThresholdLevel1 || isStreetFighter) {
        // Send stamp to get large-solution
        if (enemyHpNow > enemyHpThresholdLevel2 && $('.btn-chat:not(.comment)>.ico-attention').is(':visible') && /raid_multi/i.test(location.hash)) {
            $('.btn-chat:not(.comment)>.ico-attention').trigger('tap');
            sleep(500).then(() => {
                if ($('.lis-stamp[chatid=19]').length)
                    $('.lis-stamp[chatid=19]').trigger('tap');
                return sleep(500);
            }).then(() => {
                if ($('.btn-usual-close').length)
                    $('.btn-usual-close').trigger('tap');
                return sleep(500);
            }).then(() => analyzingURL());
            return;
        }
        var enemyHpPercent = parseInt(stage.gGameStatus.boss.param[bossEnemy].hp) / parseInt(stage.gGameStatus.boss.param[bossEnemy].hpmax) * 100;
        var bossName = stage.gGameStatus.boss.param[bossEnemy].name.ja;
        var assistBlackList = bossName == 'Lv60 朱雀' || bossName == 'Lv75 ティラノス' || bossName == 'Lv75 ビザールビースト' || bossName == 'Lv75 エメラルドホーン' || enemyHpNow < enemyHpThresholdLevel2;
        // If enemy's HP is lower than 50% and is MVP or all dead and only one player, send assist
        if (!assistBlackList && /raid_multi/i.test(location.hash) && stage.pJsnData.assist[3].is_enable && ((enemyHpPercent <= 50 && $('.lis-user.rank1.player>.prt-rank:contains(1位)').is(':visible')) || ($('.lis-user').length == 1 && $('.prt-member>.btn-command-character.blank').length == 4))) {
            $('.btn-assist').trigger('tap');
            sleep(1000).then(() => {
                if ($('.prt-popup-header:contains(救援依頼)').is(':visible') && $('.btn-usual-text:contains(救援依頼)').length)
                    $('.btn-usual-text:contains(救援依頼)').trigger('tap');
                return sleep(1000);
            }).then(() => analyzingURL());
            return;
        }
        // Don't attack when other action running
        if (stage.gGameStatus.attacking == 1) {
            console.log('Other action running ... ');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        var someoneDead = false;
        for (i = 0; i < stage.pJsnData.player.param.length; i++)
            if (parseInt(stage.pJsnData.player.param[i].hp) === 0) {
                someoneDead = true;
                break;
            }
        if (someoneDead && $skillContainText('復活').length) {
            $skillContainText('復活').trigger('tap');
            if ($('.effect:contains(復活)').is(':visible') && $('.prt-character>.btn-command-character:not(.mask-black)').length)
                $('.prt-character>.btn-command-character:not(.mask-black)').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Petra's Phantom
        if ($skillContainText('味方単体に幻影効果').length) {
            $skillContainText('味方単体に幻影効果').trigger('tap');
            if ($('.effect:contains(味方単体に幻影効果)').is(':visible') && $('.prt-character>.btn-command-character:not(.mask-black):has(img[src*=3040036000])').length)
                $('.prt-character>.btn-command-character:not(.mask-black):has(img[src*=3040036000])').trigger('tap');
            else if ($('.effect:contains(味方単体に幻影効果)').is(':visible') && $('.prt-character>.lis-character0.btn-command-character:not(.mask-black)').length)
                $('.prt-character>.lis-character0.btn-command-character:not(.mask-black)').trigger('tap');
            else if ($('.effect:contains(味方単体に幻影効果)').is(':visible') && $('.prt-character>.btn-command-character:not(.mask-black)').length)
                $('.prt-character>.btn-command-character:not(.mask-black)').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        var useSkill = true;
        // If Light Boss has full react and not at break mode, don't use skills
        if (stage.gGameStatus.boss.param[bossEnemy].name.ja == 'Lv75 シュヴァリエ・マグナ' && stage.pJsnData.boss.param[bossEnemy].recast == 1 && stage.gGameStatus.bossmode.looks.mode[bossEnemy] != 3) {
            useSkill = false;
            useMystery = false;
        }
        var enemyHasBuff = stage.gGameStatus.boss.param[bossEnemy].condition.buff !== undefined && stage.gGameStatus.boss.param[bossEnemy].condition.buff !== null && stage.gGameStatus.boss.param[bossEnemy].condition.buff.length > 0;
        if (enemyHasBuff) {
            for (i = 0; i < stage.gGameStatus.boss.param[bossEnemy].condition.buff.length; i++) {
                var statusTemp = parseInt(stage.gGameStatus.boss.param[bossEnemy].condition.buff[i].status);
                // Ignore if Enemy only has Treasure Dropup buff
                if (stage.gGameStatus.boss.param[bossEnemy].condition.buff.length == 1 && stage.gGameStatus.boss.param[bossEnemy].condition.buff[i].status.indexOf('1036') > -1) {
                    enemyHasBuff = false;
                    break;
                }
                // If Light Boss has deffense up, don't use skills
                else if (statusTemp >= 1013 && statusTemp <= 1019 && stage.gGameStatus.boss.param[bossEnemy].name.ja == 'Lv75 シュヴァリエ・マグナ') {
                    useSkill = false;
                    useMystery = false;
                    break;
                }
                // If Grande has phantom, waiting
                else if (statusTemp == 1313) {
                    sleep(1000).then(() => analyzingURL());
                    return;
                }
            }
        }
        // If can't use skill, just attack
        if ($('.prt-popup-header:contains(アビリティ使用)+div+div:contains(アビリティ使用不可状態のため)').is(':visible')) {
            $('.btn-usual-close').trigger('tap');
            sleep(1000).then(() => dropRateUpAttack);
        }
        // Gran's Buff Eliminate
        if (stage.gGameStatus.boss.param[bossEnemy].name.ja != 'Lv75 シュヴァリエ・マグナ' && $('.btn-ability-available>div[ability-name=ディスペル]').length && enemyHasBuff) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-name=ディスペル]').trigger('tap');
            stage.gGameStatus.boss.param[bossEnemy].condition.buff = [];
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // For Light Boss, use it only if has 1003 status
        else if (stage.gGameStatus.boss.param[bossEnemy].name.ja == 'Lv75 シュヴァリエ・マグナ' && $('.btn-ability-available>div[ability-name=ディスペル]').length && enemyHasBuff) {
            for (i = 0; i < stage.gGameStatus.boss.param[bossEnemy].condition.buff.length; i++) {
                if (stage.gGameStatus.boss.param[bossEnemy].condition.buff[i].status == '1003') {
                    $('.btn-ability-available>div[ability-name=ディスペル]').trigger('tap');
                    sleep(1000).then(() => analyzingURL());
                    return;
                }
            }
        }
        // For refreshing recast data of game(sometimes delay)
        if (stage.pJsnData.boss.param[bossEnemy].recast > stage.pJsnData.boss.param[bossEnemy].recastmax)
            reload = true;
        if (!useSkill) {
            console.log('Not using skill this turn ...');
            useSkill = true;
        } else if ($('.summon-on').length && enemyHpNow > enemyHpThresholdLevel2) {
            summonByCode('all');
            return;
        } else if (!cureEveryone()) {
            sleep(1000).then(() => analyzingURL());
            return;
        } else if (!masterYoda(weaknessEnemy)) {
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Kurarisu's Atomic Resolution
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040046000"])').length && $('.btn-ability-available>div[ability-id=2300]').length) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=2300]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Magisa's Summon Devil Buff
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])').length && !$('.btn-command-character>.prt-status>.img-ico-status-s[data-status=1370]').length && $('.btn-ability-available>div[ability-id=510]').length) {
            $('.btn-ability-available>div[ability-id=510]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Magisa's Summon Devil Attack
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])').length && $('.btn-ability-available>div[ability-id=510]').length && stage.gGameStatus.boss.param[bossEnemy].hp < 1200000 && stage.gGameStatus.turn > 5) {
            if (!lockEnemy(weaknessEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=510]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Use all skill, order : Yellow(3) > Green(2) > Blue(4) > Red(1)
        /* Expect list:
         ** OverDrive(オーバードライブ, モードゲージ - 1,3,4)
         ** Break(ブレイク - 1,3,4)
         ** Double/Triple Attack(アタック, 連続攻撃 - 1,3)
         ** Mystery Rise(奥義ゲージ - 1,3)
         ** Healing(参戦者のHP, 全体のHP - 2)
         ** Resurrection(復活 - 2)
         ** Weakened Released(弱体効果を1つ回復 - 2)
         ** Slow(スロウ-1)
         ** Percival(1961-2)
         ** Yoda(2172-1, 3173-3, 555-2)
         ** Magisa(510-3)
         ** Sara(352-3, 294-3)
         ** Beatorikusu(579-3, 580-3, 575-3)
         ** Ninja(7030-3)
         ** Siete(5128-3)
         ** Aruberu(164-3)
         ** Sawsis(3149-3)
         ** Gran(ディスペル-4, アイテムドロップ-4)
         ** Darkfencer(1201-1, 1500-4) */
        // Yellow Skills
        else if ($('.btn-ability-available>div:nth-child(1)[icon-type=3]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([text-data*=連続攻撃]):not([text-data*=アタック]):not([text-data*=奥義ゲージ]):not([ability-id=3173]):not([ability-id=510]):not([ability-id=352]):not([ability-id=294]):not([ability-id=579]):not([ability-id=580]):not([ability-id=575]):not([ability-id=7030]):not([ability-id=5128]):not([ability-id=164]):not([ability-id=3149])').length) {
            $('.btn-ability-available>div:nth-child(1)[icon-type=3]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([text-data*=連続攻撃]):not([text-data*=アタック]):not([text-data*=奥義ゲージ]):not([ability-id=3173]):not([ability-id=510]):not([ability-id=352]):not([ability-id=294]):not([ability-id=579]):not([ability-id=580]):not([ability-id=575]):not([ability-id=7030]):not([ability-id=5128]):not([ability-id=164]):not([ability-id=3149])').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Green Skills
        else if ($('.btn-ability-available>div:nth-child(1)[icon-type=2]:not([text-data*=全体のHP]):not([text-data*=参戦者のHP]):not([text-data*=復活]):not([text-data*=弱体効果を1つ回復]):not([ability-id=555])').length) {
            $('.btn-ability-available>div:nth-child(1)[icon-type=2]:not([text-data*=全体のHP]):not([text-data*=参戦者のHP]):not([text-data*=復活]):not([text-data*=弱体効果を1つ回復]):not([ability-id=555])').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Blue Skills
        else if ($('.btn-ability-available>div:nth-child(1)[icon-type=4]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([ability-name=ディスペル]):not([text-data*=アイテムドロップ]):not([ability-id=1961]):not([ability-id=1500]):not([ability-id=2328])').length) {
            $('.btn-ability-available>div:nth-child(1)[icon-type=4]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([ability-name=ディスペル]):not([text-data*=アイテムドロップ]):not([ability-id=1961]):not([ability-id=1500]):not([ability-id=2328])').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Red Skills
        else if ($('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([text-data*=連続攻撃]):not([text-data*=アタック]):not([text-data*=奥義ゲージ]):not([text-data*=スロウ]):not([ability-id=2172])').length) {
            if (!lockEnemy(weaknessEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([text-data*=ブレイク]):not([text-data*=オーバードライブ]):not([text-data*=モードゲージ]):not([text-data*=連続攻撃]):not([text-data*=アタック]):not([text-data*=奥義ゲージ]):not([text-data*=スロウ]):not([ability-id=2172])').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Some skills using at single
        else if (!usingSpecialSkill(weaknessEnemy)) {
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Sawsis's dodge
        else if ($('.btn-ability-available>div[ability-id=3149]').length && parseInt($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040079000"])>.prt-percent>span').html()) > 25) {
            $('.btn-ability-available>div[ability-id=3149]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Rakamu's shoot (Shoot it anyway if is Dark Boss)
        else if ($('.btn-ability-available>div[ability-id=2461]').length && (!isMaxMystery('3040059000') || stage.gGameStatus.boss.param[bossEnemy].name.ja == 'Lv75 セレスト・マグナ')) {
            if (!lockEnemy(weaknessEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=2461]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Magisa's Summon Devil Attack For Dying
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])').length && parseInt($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040011000"])>.prt-gauge-hp>div').attr('style').replace('width: ', '').replace('%;', '')) <= 10 && $('.btn-ability-available>div[ability-id=510]').length) {
            if (!lockEnemy(weaknessEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=510]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // OverDrive attack & effect
        else if ($skillContainText('オーバードライブ').length && stage.gGameStatus.bossmode.looks.mode[bossEnemy] == 2) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $skillContainText('オーバードライブ').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // OverDrive reduce
        else if (stage.gGameStatus.bossmode.looks.mode[bossEnemy] == 2 &&
            $('.btn-ability-available>div').filter(function () {
                if ($(this).attr('text-data'))
                    return $(this)
                        .attr('text-data').match(/^((?!ブレイク).)*モードゲージ.*$/);
                }).length) {
                if (!lockEnemy(bossEnemy)) {
                    sleep(500).then(() => analyzingURL());
                    return;
                }
                $('.btn-ability-available>div').filter(function () {
                    if ($(this).attr('text-data'))
                        return $(this).attr('text-data').match(/^((?!ブレイク).)*モードゲージ.*$/);
                }).trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        // Break
        else if ($skillContainText('ブレイク').length && stage.gGameStatus.bossmode.looks.mode[bossEnemy] == 3) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $skillContainText('ブレイク').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Rashid's V-type
        else if (parseInt($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3030126000"])>.prt-percent>span').html()) > 50 && $('.btn-ability-available>div[ability-id=2328]').length) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=2328]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Ninja's Ninjutsu
        else if (!isMaxMystery('210201_') && $('.btn-ability-available>div[ability-id=7030]').length) {
            if (!$('.name:contains(忍術)').is(':visible'))
                $('.btn-ability-available>div[ability-id=7030]').trigger('tap');
            else if (!$('.ico-ninja-mark1.active').length)
                $('.ico-ninja-mark1').trigger('tap');
            else if (!$('.ico-ninja-mark4.active').length && $('.ico-ninja-mark1.active').length)
                $('.ico-ninja-mark4').trigger('tap');
            else if ($('.ico-ninja-mark4.active').length && $('.ico-ninja-mark1.active').length)
                $('.btn-usual-text:contains(忍術発動)').trigger('tap');
            sleep(500).then(() => analyzingURL());
            return;
        }
        // Double/Triple Attack For All Team
        else if (isMaxMystery('numbers') < 2 &&
            $('.btn-ability-available>div').filter(function () {
                if ($(this).attr('text-data'))
                    return $(this)
                        .attr('text-data').match(/(全体の|全員)+((?!自分).)*(アタック|連続攻撃)+/g);
                }).length) {
                $('.btn-ability-available>div').filter(function () {
                    if ($(this).attr('text-data'))
                        return $(this).attr('text-data').match(/(全体の|全員)+((?!自分).)*(アタック|連続攻撃)+/g);
                }).trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        // Mystery Rise For All Team
        else if (isMaxMystery('numbers') < 2 &&
            $('.btn-ability-available>div').filter(function () {
                if ($(this).attr('text-data'))
                    return $(this)
                        .attr('text-data').match(/味方全体((?!HP|自分).)*(奥義ゲージ)+/g);
                }).length) {
                $('.btn-ability-available>div').filter(function () {
                    if ($(this).attr('text-data'))
                        return $(this).attr('text-data').match(/味方全体((?!HP|自分).)*(奥義ゲージ)+/g);
                }).trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        // Slow Attack
        else if ($skillContainText('スロウ').length && stage.pJsnData.boss.param[bossEnemy].recast < stage.pJsnData.boss.param[bossEnemy].recastmax) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $skillContainText('スロウ').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // DarkFencer's Gravity
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="150101_sw_"])').length && $('.btn-ability-available>div[ability-id=1500]').length) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=1500]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // OverDrive attack for far away form OD
        else if (stage.gGameStatus.bossmode.looks.mode[bossEnemy] != 2 && stage.gGameStatus.bossmode.looks.gauge[bossEnemy] < 80 &&
            $('.btn-ability-available>div').filter(function () {
                if ($(this).attr('text-data'))
                    return $(this)
                        .attr('text-data').match(/オーバードライブ.*ダメージ/g);
                }).length) {
                if (!lockEnemy(bossEnemy)) {
                    sleep(500).then(() => analyzingURL());
                    return;
                }
                $('.btn-ability-available>div').filter(function () {
                    if ($(this).attr('text-data'))
                        return $(this).attr('text-data').match(/オーバードライブ.*ダメージ/g);
                }).trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        // Sara's Protect
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040041000"])').length && $('.btn-ability-available>div[ability-id=352]').length && stage.pJsnData.boss.param[bossEnemy].recast == 1 && stage.gGameStatus.bossmode.looks.mode[bossEnemy] != 3) {
            $('.btn-ability-available>div[ability-id=352]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Sara's Defense
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040041000"])').length && $('.btn-ability-available>div[ability-id=294]').length && stage.pJsnData.boss.param[bossEnemy].recast == 1 && stage.gGameStatus.bossmode.looks.mode[bossEnemy] != 3) {
            $('.btn-ability-available>div[ability-id=294]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Beatorikusu's Time-Increase For 8 o'clock
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040070000"])>.prt-status>.img-ico-status-s[data-status=14703]').length && $('.btn-ability-available>div[ability-id=579]').length) {
            $('.btn-ability-available>div[ability-id=579]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Beatorikusu's Time-Stop For 12 o'clock & Has 8 o'clock status
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040070000"])>.prt-status>.img-ico-status-s[data-status=14701]').length && $('.btn-command-character:not(.blank)>.prt-status>.img-ico-status-s[data-status=14703]').length && $('.btn-ability-available>div[ability-id=580]').length) {
            $('.btn-ability-available>div[ability-id=580]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Beatorikusu's Time-Jump For 4 o'clock
        else if ($('.prt-member>.btn-command-character:not(.blank):has(.img-chara-command[src*="3040070000"])').length && $('.btn-ability-available>div[ability-id=575]').length && stage.gGameStatus.turn == 1) {
            $('.btn-ability-available>div[ability-id=575]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Serueru's Buff
        else if ($('.btn-ability-available>div[ability-id=137]').length) {
            $('.btn-ability-available>div[ability-id=137]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Siete's MaxMystery
        else if ($('.btn-command-character>.prt-status>.img-ico-status-s[data-status=8029]').length && $('.btn-ability-available>div[ability-id=5128]').length && isMaxMystery('numbers') === 0) {
            $('.btn-ability-available>div[ability-id=5128]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Aruberu's Thunder
        else if ($('.btn-ability-available>div[ability-id=164]').length && !isMaxMystery(3040045000)) {
            $('.btn-ability-available>div[ability-id=164]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Percival's Fear (Must be the last one to use)
        else if (stage.pJsnData.boss.param[bossEnemy].recast != 1 && stage.gGameStatus.bossmode.looks.mode[bossEnemy] != 3 && $('.btn-ability-available>div[ability-id=1961]').length) {
            if (!lockEnemy(bossEnemy)) {
                sleep(500).then(() => analyzingURL());
                return;
            }
            $('.btn-ability-available>div[ability-id=1961]').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
        // Lock enemy as weakness
        else if (!lockEnemy(weaknessEnemy)) {
            sleep(500).then(() => analyzingURL());
            return;
        }
    } else {
        if (stage.gGameStatus.attacking == 1) {
            console.log('Other action running ... ');
            sleep(1000).then(() => analyzingURL());
            return;
        } else if (!simpleMasterYoda()) {
            sleep(1000).then(() => analyzingURL());
            return;
        }
        if (enemyHpNow > enemyHpThresholdLevel1) {
            var canUseSkill = !$('.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.prt-status>.img-ico-status-s[data-status=1111]').length;
            if ($('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length && canUseSkill) {
                $('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
                sleep(1000).then(() => analyzingURL());
                return;
            }
        }
    }
    dropRateUpAttack();
}

function usingSpecialSkill(weaknessEnemy) {
    if (weaknessEnemy !== null && weaknessEnemy !== undefined)
        lockEnemy(weaknessEnemy);
    var done = true;
    // Double/Triple Attack For Single
    $('.btn-ability-available>div').filter(function () {
        if ($(this).attr('text-data'))
            return $(this).attr('text-data').match(/^(自分|効果中|次の攻撃)*((?!全体).)*(アタック|連続攻撃)+/g);
    }).each(function () {
        var targetCharPos = parseInt($(this).attr('class').split('num-')[1].split('-')[0]) - 1;
        var targetChar = $('.prt-member>.btn-command-character:not(.blank)[pos=' + targetCharPos + ']>img').attr('src').split('/').pop().split('_')[0];
        if (!isMaxMystery(targetChar)) {
            $(this).trigger('tap');
            done = false;
            return;
        }
    });
    // Mystery Rise For Single
    if (done) {
        $('.btn-ability-available>div').filter(function () {
            if ($(this).attr('text-data'))
                return $(this).attr('text-data').match(/^((?!味方全体).)*(奥義ゲージ)+((?!消費|変換|減少).)*$/);
        }).each(function () {
            var targetCharPos = parseInt($(this).attr('class').split('num-')[1].split('-')[0]) - 1;
            var targetChar = $('.prt-member>.btn-command-character:not(.blank)[pos=' + targetCharPos + ']>img').attr('src').split('/').pop().split('_')[0];
            if (!isMaxMystery(targetChar)) {
                $(this).trigger('tap');
                done = false;
                return;
            }
        });
    }
    return done;
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
        else if (someoneMax && !someoneAlmost) {
            useMystery = true;
            reload = true;
        }
    } else if (target == 'numbers') {
        var numbers = 0;
        if (char1 >= 100)
            numbers++;
        if (char2 >= 100)
            numbers++;
        if (char3 >= 100)
            numbers++;
        if (char4 >= 100)
            numbers++;
        return numbers;
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
    if (stage.gGameStatus.attacking == 1) {
        console.log('Other action running ... ');
        sleep(1000).then(() => analyzingURL());
        return;
    }
    if (!$('.prt-command-summon.summon-show').length)
        $('.summon-on').trigger('tap');
    sleep(500).then(() => {
        if (!$('.prt-popup-header:contains(星晶獣情報)').is(':visible'))
            $('.btn-summon-available' + parameter).trigger('tap');
        return sleep(500);
    }).then(() => {
        if ($('.btn-usual-ok.btn-summon-use').length)
            $('.btn-usual-ok.btn-summon-use').trigger('tap');
        return sleep(500);
    }).then(() => {
        if ($('.btn-usual-cancel').length)
            $('.btn-usual-cancel').trigger('tap');
        return sleep(500);
    }).then(() => {
        if ($('.btn-command-back.display-on').length)
            $('.btn-command-back.display-on').trigger('tap');
        sleep(500).then(() => analyzingURL());
    });
}

function checkMysteryThenAttack() {
    if ($('.btn-lock.lock1').length && useMystery)
        $('.btn-lock.lock1').trigger('tap');
    if ($('.btn-lock.lock0').length && !useMystery)
        $('.btn-lock.lock0').trigger('tap');
    if ($('.btn-attack-start.display-on').length)
        $('.btn-attack-start.display-on').trigger('tap');
}

var reload = false;

// Use summon & skill rise drop rate then attack
function dropRateUpAttack() {
    var i = 0;
    var canUseSkill = !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character0>.prt-status>.img-ico-status-s[data-status=1111]').length;
    var enemyHasBuff = stage.gGameStatus.boss.param[0].condition.buff !== undefined && stage.gGameStatus.boss.param[0].condition.buff !== null && stage.gGameStatus.boss.param[0].condition.buff.length > 0;
    // Detect if treasureMax
    if (enemyHasBuff)
        for (i = 0; i < stage.gGameStatus.boss.param[0].condition.buff.length; i++)
            if (stage.gGameStatus.boss.param[0].condition.buff[i].status.indexOf('1036_9') > -1)
                treasureMax = true;
    // Don't attack when other action running
    if (stage.gGameStatus.attacking == 1)
        console.log('Other action running ... ');
    else if ($('.summon-on').length && $('.btn-summon-available[summon-code=2030026000]').length) {
        summonByCode('2030026000');
        return;
    } else if ($('.summon-on').length && $('.btn-summon-available[summon-code=2040025000]').length) {
        summonByCode('2040025000');
        return;
    } else if ($skillContainText('アイテムドロップ').length && canUseSkill && !treasureMax)
        $skillContainText('アイテムドロップ').trigger('tap');
    else {
        checkMysteryThenAttack();
        if (enemyHasBuff) {
            for (i = 0; i < stage.gGameStatus.boss.param[0].condition.buff.length; i++) {
                var statusTemp = parseInt(stage.gGameStatus.boss.param[0].condition.buff[i].status);
                // If Light Boss has deffense up, reload after attack
                if (statusTemp >= 1013 && statusTemp <= 1019 && stage.gGameStatus.boss.param[0].name.ja == 'Lv75 シュヴァリエ・マグナ') {
                    reload = true;
                    break;
                }
                // If enemy has phantom, waiting
                else if (statusTemp == 1313) {
                    sleep(1000).then(() => analyzingURL());
                    return;
                }
            }
        }
        // For refresh Water boss's buff, and Light Boss if trun < 2
        if (reload || (stage.pJsnData.boss.param[0].recast == 1 && (stage.pJsnData.boss.param[0].name.ja == 'Lv60 リヴァイアサン・マグナ' || stage.pJsnData.boss.param[0].name.ja == 'Lv75 シュヴァリエ・マグナ')) || (stage.pJsnData.boss.param[0].name.ja == 'Lv75 シュヴァリエ・マグナ' && stage.gGameStatus.turn < 2)) {
            sleep(1000).then(() => {
                if (stage.gGameStatus.attacking == 1)
                    location.reload();
                else
                    analyzingURL();
            });
            return;
        }
    }
    sleep(1500).then(() => analyzingURL());
}

function cureEveryone() {
    var smallSolution = parseInt(stage.gGameStatus.temporary.small);
    var largeSolution = parseInt(stage.gGameStatus.temporary.large);
    var cureIndex = 0;
    var hp1 = 100 * parseFloat($('.lis-character0>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character0>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
    if (hp1 <= 60 && hp1 !== 0)
        cureIndex++;
    if (hp1 <= 40 && hp1 !== 0)
        cureIndex++;
    var hp2 = 100 * parseFloat($('.lis-character1>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character1>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
    if (hp2 <= 60 && hp2 !== 0)
        cureIndex++;
    if (hp2 <= 40 && hp2 !== 0)
        cureIndex++;
    var hp3 = 100 * parseFloat($('.lis-character2>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character2>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
    if (hp3 <= 60 && hp3 !== 0)
        cureIndex++;
    if (hp3 <= 40 && hp3 !== 0)
        cureIndex++;
    var hp4 = 100 * parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').css('width')) / parseFloat($('.lis-character3>.prt-gauge-hp>.prt-gauge-hp-inner:first').parent().css('width'));
    if (hp4 <= 60 && hp4 !== 0)
        cureIndex++;
    if (hp4 <= 40 && hp4 !== 0)
        cureIndex++;

    var $undebuffSkill = $('.btn-ability-available>div:nth-child(1)[icon-type=2][text-data*=弱体効果を1つ回復]');
    var $healingSkill = $('.btn-ability-available>div:nth-child(1)[icon-type=2][text-data*=全体のHP], .btn-ability-available>div:nth-child(1)[icon-type=2][text-data*=参戦者のHP]');
    // undebuffSkill
    if (cureIndex > 3 && $undebuffSkill.length && $('.prt-status>.img-ico-status-s[data-status=1033],.prt-status>.img-ico-status-s[data-status=1012]').length > 2 && ($healingSkill.length || largeSolution > 0)) {
        $undebuffSkill.trigger('tap');
        return false;
    } else if (cureIndex > 3 && $('.prt-status>.img-ico-status-s[data-status=1033],prt-status>.img-ico-status-s[data-status=1012]').length > 2)
        cureIndex = 0;
    // healingSkill
    if (cureIndex > 3 && $healingSkill.length) {
        $healingSkill.trigger('tap');
        return false;
    }
    if (cureIndex > 3 && largeSolution > 0) {
        if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
            $('.btn-temporary').trigger('tap');
        sleep(500).then(() => {
            smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
            largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
            console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
            if ($('.lis-item.item-large.btn-temporary-large:not(.disable)>img').length) {
                $('.lis-item.item-large.btn-temporary-large>img').trigger('tap');
                sleep(500).then(() => {
                    if ($('.btn-usual-use').length)
                        $('.btn-usual-use').trigger('tap');
                    return sleep(500);
                }).then(() => {
                    if ($('.btn-usual-cancel').length)
                        $('.btn-usual-cancel').trigger('tap');
                });
            } else if ($('.lis-item.item-large.btn-temporary-large.disable>img').length) {
                if ($('.btn-usual-cancel').length)
                    $('.btn-usual-cancel').trigger('tap');
            }
        });
        return false;
    }
    if ($('.lis-character0>.prt-status>.img-ico-status-s[data-status=1033],.lis-character0>.prt-status>.img-ico-status-s[data-status=1012]').length)
        hp1 = 100;
    if ($('.lis-character1>.prt-status>.img-ico-status-s[data-status=1033],.lis-character1>.prt-status>.img-ico-status-s[data-status=1012]').length)
        hp2 = 100;
    if ($('.lis-character2>.prt-status>.img-ico-status-s[data-status=1033],.lis-character2>.prt-status>.img-ico-status-s[data-status=1012]').length)
        hp3 = 100;
    if ($('.lis-character3>.prt-status>.img-ico-status-s[data-status=1033],.lis-character3>.prt-status>.img-ico-status-s[data-status=1012]').length)
        hp4 = 100;
    var someoneDanger = (hp1 < 50 && hp1 > 0) || (hp2 < 50 && hp2 > 0) || (hp3 < 50 && hp3 > 0) || (hp4 < 50 && hp4 > 0);
    if (smallSolution > 0 && someoneDanger) {
        if (!$('.pop-usual.pop-raid-item.pop-show>.prt-popup-header:contains(アイテムを使用)').is(':visible'))
            $('.btn-temporary').trigger('tap');
        sleep(500).then(() => {
            smallSolution = $('.lis-item.item-small.btn-temporary-small>img+div+.txt-having>.having-num').html();
            largeSolution = $('.lis-item.item-large.btn-temporary-large>img+div+.txt-having>.having-num').html();
            console.log('Get solution : ' + smallSolution + ', ' + largeSolution);
            if ($('.lis-item.item-small.btn-temporary-small:not(.disable)>img').length) {
                $('.lis-item.item-small.btn-temporary-small>img').trigger('tap');
                sleep(500).then(() => {
                    if (hp1 < 50 && hp1 > 0 && $('.lis-character0:first').length)
                        $('.lis-character0:first').trigger('tap');
                    else if (hp2 < 50 && hp2 > 0 && $('.lis-character1:first').length)
                        $('.lis-character1:first').trigger('tap');
                    else if (hp3 < 50 && hp3 > 0 && $('.lis-character2:first').length)
                        $('.lis-character2:first').trigger('tap');
                    else if (hp4 < 50 && hp4 > 0 && $('.lis-character3:first').length)
                        $('.lis-character3:first').trigger('tap');
                    if ($('.btn-usual-cancel').length)
                        $('.btn-usual-cancel').trigger('tap');
                });
            } else if ($('.lis-item.item-small.btn-temporary-small.disable>img').length) {
                if ($('.btn-usual-cancel').length)
                    $('.btn-usual-cancel').trigger('tap');
            }
        });
        return false;
    }
    return true;
}

function masterYoda(weaknessEnemy) {
    if (weaknessEnemy !== null && weaknessEnemy !== undefined)
        lockEnemy(weaknessEnemy);
    if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src*="3040064000"])').length) {
        var maxMystery = isMaxMystery('3040064000');
        var threeStatus = getThreeStatus();
        var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length;
        var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;
        if (threeStatus === 0 && canUseStatus && canUseSkill) {
            $('.btn-ability-available>div[ability-id=555]').trigger('tap');
            return false;
        }
        if (threeStatus === 0 && !canUseStatus && $('.btn-ability-available>div[ability-id=3173]').length && canUseSkill) {
            $('.btn-ability-available>div[ability-id=3173]').trigger('tap');
            return false;
        }
        if (threeStatus === 0 && $('.btn-ability-available>div[ability-id=2172]').length && canUseSkill) {
            $('.btn-ability-available>div[ability-id=2172]').trigger('tap');
            return false;
        }
        if (threeStatus == 3 && maxMystery) {
            useMystery = true;
            var enemyHpNow = 0;
            for (var i = 0; i < stage.gGameStatus.boss.param.length; i++)
                enemyHpNow += parseInt(stage.gGameStatus.boss.param[i].hp);
            reload = true;
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

function simpleMasterYoda() {
    if ($('.prt-member>.lis-character3:not(.blank):has(.img-chara-command[src*="3040064000"])').length) {
        var maxMystery = isMaxMystery('3040064000');
        var threeStatus = getThreeStatus();
        var canUseStatus = $('.btn-ability-available>div[ability-id=555]').length;
        var canUseSkill = !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1241]').length && !$('.lis-character3>.prt-status>.img-ico-status-s[data-status=1111]').length;
        useMystery = true;
        if (threeStatus != 3 && canUseStatus && canUseSkill && maxMystery) {
            $('.btn-ability-available>div[ability-id=555]').trigger('tap');
            return false;
        }
        if (threeStatus == 3 && maxMystery) {
            var enemyHpNow = 0;
            for (var i = 0; i < stage.gGameStatus.boss.param.length; i++)
                enemyHpNow += parseInt(stage.gGameStatus.boss.param[i].hp);
            reload = true;
        }
    }
    return true;
}

function stageRolling() {
    stageMsg('==Rolling Stage==');
    if ($('.btn-command-forward').length)
        $('.btn-command-forward').trigger('tap');
    sleep(1000).then(() => analyzingURL());
}

function raid() {
    stageMsg('==Raid Stage==');
    if ($('.btn-result').is(':visible'))
        $('.btn-result').trigger('tap');
    // Wait for loading
    if (typeof stage.gGameStatus === 'undefined' || $('.prt-ready').is(':visible') || $('.prt-black-bg').is(':visible')) {
        sleep(1000).then(() => analyzingURL());
        return;
    }
    var isStreetFighter = $('.txt-battle.round').length || $('.txt-battle.stage').length;
    if (isStreetFighter) {
        if ($('.prt-popup-header:contains(バトルサービス)').is(':visible') && !$('.btn-battle-service.disable').length) {
            var score = parseInt($('.txt-point-before').html());
            if (score < 560)
                $('.txt-service-name:contains(サービスを受けない)').trigger('tap');
            else
                $('.txt-service-name:contains(スコアチャンス)').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        } else if ($('.prt-popup-header:contains(バトルサービス)').is(':visible') && $('.btn-battle-service.disable').length) {
            $('.btn-usual-ok').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
    }
    var isRabbit = stage.gGameStatus.boss.param.length == 3 && stage.gGameStatus.boss.param[2].name.ja == 'Lv12 ホワイトラビット' && stage.gGameStatus.boss.param[2].hp != '0';
    if (isRabbit) {
        if (!$('.btn-targeting.enemy-3.lock-on').is(':visible') || $('.btn-targeting.enemy-3.invisible').length) {
            $('.btn-targeting.enemy-3.invisible').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        } else if ($('.summon-on').length && $('.btn-summon-available[summon-code=2030026000]').length) {
            summonByCode('2030026000');
            return;
        } else if ($('.summon-on').length && $('.btn-summon-available[summon-code=2040025000]').length) {
            summonByCode('2040025000');
            return;
        } else if ($skillContainText('アイテムドロップ').length) {
            $skillContainText('アイテムドロップ').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
    }
    useMystery = true;
    var enemyTotal = 0;
    for (i = 0; i < stage.gGameStatus.boss.param.length; i++)
        enemyTotal += parseInt(stage.gGameStatus.boss.param[i].hpmax);
    if (enemyTotal >= enemyHpThresholdLevel2 || isStreetFighter) {
        raidSmartFighting();
        return;
    } else if (enemyTotal >= enemyHpThresholdLevel1) {
        if (!masterYoda()) {
            sleep(1000).then(() => analyzingURL());
            return;
        }
    } else if (enemyTotal >= enemyHpThresholdLevel0) {
        if (!simpleMasterYoda()) {
            sleep(1000).then(() => analyzingURL());
            return;
        } else if ($('.summon-on').length) {
            summonByCode('all');
            return;
        } else if ($('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').length) {
            $('.btn-ability-available>div:nth-child(1)[icon-type=1]:not([ability-id=2172])').trigger('tap');
            sleep(1000).then(() => analyzingURL());
            return;
        }
    }
    dropRateUpAttack();
}

function battleResult() {
    stageMsg('==Result Stage==');
    if ($('.btn-usual-ok').length)
        $('.btn-usual-ok').trigger('tap');
    else if ($('.btn-control').length)
        $('.btn-control').trigger('tap');
    sleep(1000).then(() => analyzingURL());
}

var enableUsingBP = false;
var bpMinValue = 2;

function assist() {
    stageMsg('==Assist Stage==');
    if ($('.txt-popup-body:contains(未確認バトル)').is(':visible'))
        $('.btn-usual-ok').trigger('tap');
    if ($('.ico-receive-reward').is(':visible'))
        $('.btn-usual-text').trigger('tap');
    if ($('#tab-multi.active').length) {
        $('#tab-multi.active').trigger('tap');
        sleep(1000).then(() => {
            // You can see pic of summon at src/assist
            if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
                $('.img-raid-thumbnail[alt=2030002000_hell]').trigger('tap');
            else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2030002000])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
                $('.img-raid-thumbnail[alt=2030002000]').trigger('tap');
            else if ($('.prt-raid-thumbnail:has(.img-raid-thumbnail[alt=2040065000_hell])+.prt-raid-info>.prt-raid-status:has(.prt-use-ap)').length)
                $('.img-raid-thumbnail[alt=2040065000_hell]').trigger('tap');
            else
                return;
            sleep(3000).then(() => {
                if ($('.prt-item-disp:last>.prt-use-button>.btn-use-full').length)
                    $('.prt-item-disp:last>.prt-use-button>.btn-use-full').trigger('tap');
            });
        });
    } else if ($('#tab-event.active').length) {
        $('#tab-event.active').trigger('tap');
    }
    if ($('.prt-popup-header:contains(アイテム使用完了)').is(':visible') && enableUsingBP)
        $('.btn-usual-ok').trigger('tap');
    else if ($('.prt-popup-header:contains(BPが足りません)').is(':visible') && enableUsingBP)
        $('.btn-use-full.index-3').trigger('tap');
    else if (parseInt($('.prt-user-bp-value').attr('title')) >= bpMinValue || enableUsingBP) {
        var targetHpPercentMax = parseInt($('.prt-user-bp-value').attr('title')) == 5 ? 0 : 75;
        var $targetMutiBattle = false;
        $('.prt-raid-gauge:has(+.prt-use-ap[data-ap=' + bpMinValue + '])').children().each(function () {
            var targetBlackList = $(this).parent().parent().parent().parent().children('.prt-raid-thumbnail').children('img').attr('alt').indexOf('_high') > -1;
            var targetHpPercent = parseInt($(this).css('width').replace('px', ''));
            if (targetHpPercent > targetHpPercentMax && !targetBlackList) {
                targetHpPercentMax = targetHpPercent;
                $targetMutiBattle = $(this);
            }
        });
        if ($targetMutiBattle)
            $targetMutiBattle.trigger('tap');
    }
    sleep(3000).then(() => analyzingURL());
}

function exchange() {
    stageMsg('==Exchange Stage==');
    if ($('.frm-list-select').length) {
        $('.frm-list-select').val(1);
        $('.frm-list-select').trigger('change');
    }
    if (/coopraid\/lineup/i.test(location.hash) && $('.btn-exchange').length)
        $('.btn-exchange').trigger('tap');
    else if ($('.lis-item:has(.prt-item-name>div:not(:contains(鋼)):not(:contains(晶)):not(:contains(デビルエレメント)))>div>.btn-exchange').length)
        $('.lis-item:has(.prt-item-name>div:not(:contains(鋼)):not(:contains(晶)):not(:contains(デビルエレメント)))>div>.btn-exchange').trigger('tap');
    sleep(500).then(() => {
        if ($('.num-set').length) {
            $('.num-set').val($('.num-set>option:last-child').val());
            $('.num-set').trigger('change');
        }
        return sleep(500);
    }).then(() => {
        if ($('.btn-usual-text.exchange').length)
            $('.btn-usual-text.exchange').trigger('tap');
        return sleep(500);
    }).then(() => analyzingURL());
}

function unclaimed() {
    stageMsg('==Unclaimed Stage==');
    if (!$('#prt-unclaimed-list>div.txt-no-list').length)
        $('#prt-unclaimed-list>div:first').trigger('tap');
    else if ($('#prt-unclaimed-list>div.txt-no-list').is(':visible'))
        history.go(-1);
    sleep(1000).then(() => analyzingURL());
}

function questError() {
    if ($('.pop-common-error.pop-show>.prt-popup-body>.txt-popup-body:contains(既にバトルは終了しました)').is(':visible') || $('.txt-popup-body:contains(未確認バトル)').is(':visible')) {
        stageMsg('==questError Stage==');
        $('.btn-usual-ok').trigger('tap');
    }
    sleep(1000).then(() => analyzingURL());
}

function rejectFriend() {
    if ($('#waiting_tabs.active').length) {
        stageMsg('==rejectFriend Stage==');
        $('#cnt-waiting>div>div>div>.prt-friend-detail>.prt-friend-name>.txt-rank').each(function () {
            var rank = parseInt($(this).html().replace('Rank', ''));
            if (rank < 100) {
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
    sleep(1000).then(() => analyzingURL());
}

function gacha() {
    stageMsg('==Gacha Stage==');
    if (localStorage.getItem('gachaShowHand') === null || $('#cjs-gacha').is(':visible'))
        localStorage.gachaShowHand = false;
    if ($('.prt-gacha-infomation>button').length) {
        if (JSON.parse(localStorage.gachaShowHand))
            $('.prt-gacha-infomation>button').html('Stop Gacha');
        else
            $('.prt-gacha-infomation>button').html('Show Hand');
        $('.prt-gacha-infomation>button').attr('onclick', 'javascript:localStorage.gachaShowHand = !JSON.parse(localStorage.gachaShowHand)');
    }
    if ($('.txt-available-times').length && localStorage.gachaShowHand)
        $('.txt-available-times').trigger('tap');
    else if ($('.txt-available-times10').length && localStorage.gachaShowHand)
        $('.txt-available-times10').trigger('tap');
    sleep(1000).then(() => analyzingURL());
}

var enableUsingAP = true;
var autoEventUrl = 'treasureraid049';
var eventTargetCode = -1;

function autoEvent() {
    stageMsg('==Auto Event Stage==');
    if (localStorage.autoEvent == tabId) {
        var costAP = 50;
        var canEnter = enableUsingAP || (!enableUsingAP && parseInt($('.txt-stamina-value').attr('title').split('/')[0]) >= costAP);
        if ($('.txt-next-quest').length)
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(クエスト再開)').is(':visible'))
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(アイテム使用完了)').is(':visible') && enableUsingAP)
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(APが足りません)').is(':visible') && enableUsingAP)
            $('.btn-use-full.index-1').trigger('tap');
        else if ($('.prt-quest-info.free-quest').is(':visible'))
            $('.prt-quest-info.free-quest').trigger('tap');
        // Ancient Battlefield - Meat [0]
        else if (eventTargetCode === 0 && $('.prt-popup-header:contains(古戦場の魔物に挑戦)').is(':visible'))
            $('.btn-multi-battle.ico-clear:last').trigger('tap');
        else if (eventTargetCode === 0 && $('#enemy_1').length && canEnter)
            $('#enemy_1').trigger('tap');
        // Ancient Battlefield - Boss [1]
        else if (eventTargetCode == 1 && $('.btn-offer:last').is(':visible'))
            $('.btn-offer:last').trigger('tap');
        else if (eventTargetCode == 1 && $('#enemy_0').length && canEnter)
            $('#enemy_0').trigger('tap');
        // Four Elements Befall [2]
        else if (eventTargetCode == 2 && $('.prt-popup-header:contains(四象に挑戦)').is(':visible') && $('.prt-icon-bonus').length)
            $('.prt-icon-bonus').trigger('tap');
        else if (eventTargetCode == 2 && $('.img-raid-boss').length && canEnter && parseInt($('.prt-point').html().split('/')[0]) < 30000)
            $('.img-raid-boss').trigger('tap');
        else if (eventTargetCode == 2 && $('.btn-select-multi').length && canEnter && parseInt($('.prt-point').html().split('/')[0]) < 30000)
            $('.btn-select-multi').trigger('tap');
        // Normal Event [3]
        else if (eventTargetCode == 3 && $('.prt-popup-header:contains(サバイバルモード)').is(':visible'))
            $('.btn-boss-battle.clear:last').trigger('tap');
        else if (eventTargetCode == 3 && $('.btn-event-raid.multi').length && canEnter)
            $('.btn-event-raid.multi:first').trigger('tap');
        // Cooperation Event
        else if ($('.btn-boss-detail').length && canEnter)
            $('.btn-boss-detail').trigger('tap');
    }
    sleep(1000).then(() => analyzingURL());
}

function autoExtraEvent() {
    stageMsg('==Auto Extra Event Stage==');
    if (localStorage.autoExtraEvent == tabId) {
        var targetEvent = 0;
        var targetLevel = -1;
        var costAP = 30;
        var canEnter = enableUsingAP || (!enableUsingAP && parseInt($('.txt-stamina-value').attr('title').split('/')[0]) >= costAP);
        if ($('.prt-popup-header:contains(クエスト再開)').is(':visible'))
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(アイテム使用完了)').is(':visible') && enableUsingAP)
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(APが足りません)').is(':visible') && enableUsingAP)
            $('.btn-use-full.index-1').trigger('tap');
        // Priority 0 AP & Hardest
        else if ($('.btn-set-quest[data-ap=0]:last').length)
            $('.btn-set-quest[data-ap=0]:last').trigger('tap');
        // Default target level
        else if (targetLevel >= 0 && $('.btn-set-quest:eq(' + targetLevel + ')').length)
            $('.btn-set-quest:eq(' + targetLevel + ')').trigger('tap');
        // Priority No limited & Hardert
        else if ($('.btn-set-quest[data-limited_count=""]:last').length)
            $('.btn-set-quest[data-limited_count=""]:last').trigger('tap');
        // Priority Hell difficulty
        else if ($('.btn-stage-detail.ex-hell').length)
            $('.btn-stage-detail.ex-hell').trigger('tap');
        else if ($('.btn-stage-detail:eq(' + targetEvent + ')').length && canEnter)
            $('.btn-stage-detail:eq(' + targetEvent + ')').trigger('tap');
    }
    sleep(1000).then(() => analyzingURL());
}

function autoExtra() {
    stageMsg('==Auto Extra Stage==');
    if (localStorage.autoExtra == tabId) {
        var targetEvent = 3;
        var targetLevel = 1;
        var costAP = 20;
        var canEnter = enableUsingAP || (!enableUsingAP && parseInt($('.txt-stamina-value').attr('title').split('/')[0]) >= costAP);
        if ($('.prt-popup-header:contains(クエスト再開)').is(':visible'))
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(アイテム使用完了)').is(':visible') && enableUsingAP)
            $('.btn-usual-ok').trigger('tap');
        else if ($('.prt-popup-header:contains(APが足りません)').is(':visible') && enableUsingAP)
            $('.btn-use-full.index-1').trigger('tap');
        else if ($('.btn-set-quest:eq(' + targetLevel + ')').length)
            $('.btn-set-quest:eq(' + targetLevel + ')').trigger('tap');
        else if ($('.btn-stage-detail:eq(' + targetEvent + ')').length && canEnter)
            $('.btn-stage-detail:eq(' + targetEvent + ')').trigger('tap');
    }
    sleep(1000).then(() => analyzingURL());
}

function eventReopen() {
    stageMsg('==Event Reopen Stage==');
    if ($('.prt-popup-header:contains(クエスト再開)').is(':visible') && localStorage.autoEvent == tabId)
        $('.btn-usual-ok').trigger('tap');
    sleep(1000).then(() => analyzingURL());
}

function sellNormalWeapon() {
    stageMsg('==Sell Normal Weapon Stage==');
    if ($('.prt-popup-header:contains(売却確認)').is(':visible') && !$('.lis-sell-item:has(.prt-selected-quality)').length)
        $('.btn-usual-text:contains(売却)').trigger('tap');
    else if ($('.prt-popup-header:contains(売却結果)').is(':visible'))
        $('.btn-usual-ok').trigger('tap');
    else if ($('.btn-item:not(.selected)[data-rarity=1]:not(:has(.prt-quality))').length && parseInt($('.selected-num').html()) < 20)
        $('.btn-item:not(.selected)[data-rarity=1]:not(:has(.prt-quality))').trigger('tap');
    else if ($('.btn-settle[disable=false]').length && parseInt($('.selected-num').html()) > 0)
        $('.btn-settle[disable=false]').trigger('tap');
    sleep(500).then(() => analyzingURL());
}

function sellSliverCoin() {
    stageMsg('==Sell Sliver Coin Stage==');
    if ($('.prt-popup-header:contains(売却確認)').is(':visible') && $('.prt-set-num').length && $('.prt-set-num').val() != 90) {
        $('.prt-set-num').val(90);
        $('.prt-set-num').trigger('change');
    } else if ($('.prt-popup-header:contains(売却確認)').is(':visible') && $('.prt-set-num').length && $('.prt-set-num').val() == 90)
        $('.btn-usual-text').trigger('tap');
    else if ($('.btn-sell-article[data-item-id=20002]').length)
        $('.btn-sell-article[data-item-id=20002]').trigger('tap');
    sleep(500).then(() => sellSliverCoin());
}

function unlimitedEnhancement() {
    stageMsg('==Unlimited Enhancement Stage==');
    if ($('.btn-follow-again').is(':visible'))
        $('.btn-follow-again').trigger('tap');
    else if ($('.prt-popup-header:contains(素材確認)').is(':visible') && $('.btn-usual-ok').length)
        $('.btn-usual-ok').trigger('tap');
    else if ($('.btn-synthesis').is(':visible'))
        $('.btn-synthesis').trigger('tap');
    else if ($('.btn-recommend').is(':visible'))
        $('.btn-recommend').trigger('tap');
    sleep(1500).then(() => unlimitedEnhancement());
}

function unlimitedPresent() {
    stageMsg('==Unlimited Present Stage==');
    if ($('.prt-popup-header:contains(所持数オーバー)').is(':visible') && $('.btn-usual-ok').length)
        $('.btn-usual-ok').trigger('tap');
    else if ($('.prt-popup-header:contains(プレゼント受取)').is(':visible') && $('.btn-usual-ok').length)
        $('.btn-usual-ok').trigger('tap');
    else if ($('.btn-get-all:last').is(':visible'))
        $('.btn-get-all:last').trigger('tap');
    sleep(1500).then(() => unlimitedPresent());
}

var decomposeFinish = false;
var decomposeInterval;

function detailWeapon() {
    stageMsg('==Detail Weapon Stage==');
    if ($('.prt-enhance-button').length && !$('#decomposeBtn').length) {
        var decomposeBtn = document.createElement('div');
        decomposeBtn.style.cssText = 'background: url("http://gbf.game-a.mbga.jp/assets/img_light/sp/ui/button-sb0b05c8227.png") no-repeat 0 -1790px;background-size: 223px 2789px;width: 141px;height: 36px;display: inline-block;padding-top: 10px;box-sizing: border-box;color: #f2eee2;text-shadow: 0 0 1px #253544,0 0 1px #253544,0 0 1px #253544,0 0 1px #253544,0 0 2px #253544,0 0 2px #253544,0 0 2px #253544,0 0 2px #253544;font-size: 12px;text-align: center;text-decoration: none;line-height: 1;';
        decomposeBtn.setAttribute('id', 'decomposeBtn');
        decomposeBtn.innerHTML = '高速エレメント化';
        decomposeBtn.onclick = function () {
            decomposeFinish = false;
            decomposeInterval = setInterval(decompose, 1000);
        };
        $('.prt-enhance-button').append(decomposeBtn);
    }
    sleep(1000).then(() => analyzingURL());
}

function decompose() {
    stageMsg('==Decompose Stage==');
    if (decomposeFinish)
        clearInterval(decomposeInterval);
    else if ($('.prt-decompose-button').is(':visible'))
        $('.btn-decompose').trigger('tap');
    else if ($('.prt-popup-header:contains(エレメント化結果)').is(':visible') && $('.btn-usual-ok').length) {
        $('.btn-usual-ok').trigger('tap');
        decomposeFinish = true;
    } else if ($('.prt-popup-header:contains(エレメント化確認)').is(':visible') && $('.btn-decompose').length)
        $('.btn-decompose').trigger('tap');
    else if ($('.btn-decompose-confirm').is(':visible'))
        $('.btn-decompose-confirm').trigger('tap');
}

var enableSkipScene = false || localStorage.autoEvent == tabId;
var wrapperCounter = 0;
function skipScene() {
    stageMsg('==Skip Scene Stage==');
    if (enableSkipScene) {
        if ($('.btn-skip').is(':visible')) {
            $('.btn-skip').trigger('tap');
            sleep(500).then(() => {
                if ($('.btn-usual-ok').is(':visible'))
                    $('.btn-usual-ok').trigger('tap');
            });
            wrapperCounter = 0;
        }
    }
    if ($('#wrapper').is(':visible')) {
        if (wrapperCounter > 5) {
            wrapperCounter = 0;
            history.go(-1);
        }
        ++wrapperCounter;
    }
    sleep(1000).then(() => analyzingURL());
}
