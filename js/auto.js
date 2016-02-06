
var s = document.createElement('script');
var u = 'http://hioggia.github.io/eatWhat/2/casino_bingo.js';
var t = "function mp(){var s=document.createElement('script');s.onerror=function(){location.reload()};s.src='"+u+"';document.body.appendChild(s)};function sb(){if(window.$ && !$('#ready').is(':visible')){setTimeout(mp,3000);console.info('请稍后。')}else{setTimeout(function(){sb()},1000)}}sb()";
s.innerHTML = t;
document.body.appendChild(s);
