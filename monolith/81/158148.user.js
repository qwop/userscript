// ==UserScript==
// @name        Tumblr Saviour for Asks
// @namespace   ziddia
// @description Dodge a bullet in your ask box.
// @include     http://www.tumblr.com/inbox
// @include     http://www.tumblr.com/inbox/*
// @include     http://www.tumblr.com/blog/*/messages
// @include     http://www.tumblr.com/blog/*/messages/*
// @version     1
// ==/UserScript==

function needstobesaved(theStr){
  var blackList = new Array('iphone','ipad', 'homestuck', '#spoilers');
  var whiteList = new Array('bjorn', 'octopus');
  var blacklisted = false;
  var whitelisted = false;
  
  for(var i=0;i<=whiteList.length;i++) {
    var whiteWord = ''+whiteList[i];
    if(theStr.toLowerCase().indexOf(whiteWord.toLowerCase())>=0) {
      whitelisted = true;
    }
  }

  if (!whitelisted) {
    for(var i=0;i<=blackList.length;i++) {
      var blackWord = ''+blackList[i];
      if(theStr.toLowerCase().indexOf(blackWord.toLowerCase())>=0) {
        blacklisted = true;
      }
    }
  }
  return blacklisted;
}

var liPosts = document.getElementsByTagName('div');
var last_check = 0;
  
function check_for_saving() {
	for (var i=last_check;i<liPosts.length;i++) {
		if (liPosts[i].className.indexOf('post_text_wrapper') >= 0) {
			var savedfrom = needstobesaved(liPosts[i].innerHTML);
			if (savedfrom) {
				var div_filtered = document.createElement('div');
				div_filtered.style.display = 'none';

				while (liPosts[i].childNodes.length > 1) {
					div_filtered.appendChild(liPosts[i].childNodes[0]);
				}

				var div_notice = document.createElement('div');
				div_notice.className = 'post_info';
				div_notice.innerHTML = 'You have been saved from this post, it had something you didn\'t want to see in it. <a onclick="this.parentNode.style.display=\'none\'; this.parentNode.nextSibling.style.display=\'\'; return false;" href="#"><i>Click here</i></a> if you cannot resist the temptation.';

				liPosts[i].appendChild(div_notice);
				liPosts[i].appendChild(div_filtered);
			}
		}
	}
	last_check = liPosts.length;
}

function addGlobalStyle(css) {
  var elmHead, elmStyle;
  elmHead = document.getElementsByTagName('head')[0];
  elmStyle = document.createElement('style');
  elmStyle.type = 'text/css';
  elmHead.appendChild(elmStyle);
  elmStyle.innerHTML = css;
}

var better_rule = '.source_url {display:none !important;}';
try {
  document.styleSheets[0].insertRule(better_rule, 0);
} catch (e) {
  addGlobalStyle(better_rule);
}

setInterval(check_for_saving, 200);