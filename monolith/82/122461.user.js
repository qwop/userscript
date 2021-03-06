// ==UserScript==
// @name           ITC.UA Navigation
// @description    Use keyboard navigation to read ITC.ua™. Keys: "j"=next, "k"=previous, "g"=goto, "?" or "h"=show help (like Google Reader)
// @namespace      http://userscripts.org/users/400940
// @source         http://userscripts.org/scripts/show/122461
// @identifier     http://userscripts.org/scripts/source/122461.user.js
// @author         Vadym Gulyi <me@vady.kiev.ua>
// @icon           http://img848.imageshack.us/img848/46/faviconxa.png
// @icon64         http://img26.imageshack.us/img26/3018/itclogo.png
// @date           2012-01-16
// @version        1.0.4
// @versiontext    Added detection of current scrolling view & page navigation.
// @include        http://itc.ua/
// @include        http://itc.ua/page/*
// ==/UserScript==

(function() {
    var allPosts, postTop, help;

	// injects custom css
	function addGlobalStyle(css) {
		var head = document.getElementsByTagName('head')[0];
		if (!head) return;
		var style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = css;
		head.appendChild(style);
	}

	// scrolling position marker
	function findPos(obj) {
		var curleft, curtop;
		curleft = 0;
		curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			} while (obj = obj.offsetParent);
		}
		return [curleft, curtop];
	}

	// make accent
	function highlightPost(itm) {
		var marker, viewOptions, oldPost
		// switch to list view
		marker = document.getElementById('list-of-posts'); // headlines, list, grid
		if(marker && marker.className != 'list') {
			marker.className = 'list';
			viewOptions = document.querySelectorAll('div#content ul.view-option li');
			for (var li=0;li<viewOptions.length;li++) {
				viewOptions[li].className = (viewOptions[li].id == 'list-view') ? 'current-view' : '';
			}
		}
		// remove old item highlighting
		oldPost = document.querySelector('div.currentPostBox');
		if(oldPost) oldPost.className = oldPost.className.replace(" currentPostBox", "");
		// make a new highlighting
		if(itm) {
			itm.className += " currentPostBox";
			postTop = findPos(itm);
			window.scroll(postTop[0], postTop[1]);
			itm.focus();
		}
	}

	// parse keyboard actions
	function keyPressed(theKey) {
		var getPost, pageTop, goTo, i;
		if (theKey === 102) { // f
			highlightPost(allPosts[0]);
		} else if (theKey === 108) { // l
			highlightPost(allPosts[allPosts.length-1]);
		} else if(theKey === 106 || theKey === 107) { // j+k
			goTo = 0;
			pageTop = window.pageYOffset || document.body.scrollTop;
			for(i = 0; i < allPosts.length; i++) {
				postTop = findPos(allPosts[i]);
				if(theKey === 106 && postTop[1] > pageTop && (postTop[1] < goTo || !goTo) || theKey === 107 && postTop[1] < pageTop && postTop[1] > goTo) {
					goTo = postTop[1];
					getPost = i;
					if(theKey === 106) break;
				}
			}
			if (goTo) {
				highlightPost(allPosts[getPost]);
			} else {
				// navigate through pages
				if(theKey === 106 && (goTo = document.querySelector('div#pagination .nextpostslink a')) !== false) location.href = goTo.href;
				else if(theKey === 107 && (goTo = document.querySelector('div#pagination .previouspostslink a')) !== false) location.href = goTo.href;
			}
		} else if (theKey === 103) { // g
			goTo = document.querySelector('div.currentPostBox h2.post-title a');
			if(goTo) window.open(goTo.href);
		} else if (theKey === 63 || theKey === 104 || theKey === 27) { // ?, h or Esc
			goTo = document.querySelector('div.hotkeystable');
			if (goTo !== null) {
				document.body.removeChild(goTo);
			} else if (theKey !== 27) {
				document.body.appendChild(help);
			}
		}
	}

	// common routines
	allPosts = document.querySelectorAll('div.post');
	addGlobalStyle(".currentPostBox {border-top: #000 2px solid;} \
					.hotkeystable {position:fixed;width:100%;height:100%;top:0;left:0;padding:.5em;margin:0;color:#fff;background:#333;z-index:1001;overflow:auto;-moz-opacity:0.95;opacity:0.95;filter:alpha(opacity=95)} \
					.oheading {font:bold normal xx-large 'Trebuchet MS', Arial, Helvetica, sans-serif;color:#FFC;text-align:center;margin:.3em .5em;padding:.2em 0;border-bottom:1px solid #FFC} \
					.hotkeystable ul {padding:0 2em;margin:0;list-style-type:none} \
					.hotkeystable ul li {font:large/2em 'Trebuchet MS', Arial, Helvetica, sans-serif;vertical-align:middle;color:#CCC;padding-top:.4em;margin:0} \
					.hotkeystable ul span {display:block;float:left;clear:left;text-align:center;width:1.6em;margin-bottom:.3em;margin-right:.5em;font-size:x-large;color:#000;background-color:#FFC;-moz-border-radius:3px;-webkit-border-radius:3px;border-radius:3px} \
					.hotkeystable div.notes {margin:1em 7em;font:italic normal small 'Trebuchet MS', Arial, Helvetica, sans-serif;color:#999} \
					.hotkeystable div.notes a {color:#FF0}");
	help = document.createElement("div");
	help.className = "hotkeystable";
	help.innerHTML = "<h2 class='oheading' title='Клавиатурные сокращения'>Keyboard shortcuts</h2> \
					<ul><li><span>j</span> &darr; листать вперед (next item)</li> \
					<li><span>k</span> &uarr; листать назад (previous item)</li> \
					<li><span>f</span> ↸ первая запись (first item)</li> \
					<li><span>l</span> ↧ последняя запись (last item)</li> \
					<li><span>g</span> &rarr; перейти по ссылке (open link)</li> \
					<li><span>h</span> &nbsp;?&nbsp; показать/скрыть подсказки (this help)</li></ul> \
					<div class='notes'>&copy;2012 itc.ua j/k headlines navigator by <a href='http://vady.kiev.ua/' title='Автор userscript&#039;а — (v) | inspired by Google Reader and Gawker Navigation' target='_blank'>(v)</a>. Скрипт для навигации по новостями на стартовой странице itc.ua (beta-версия), позволяет с помощью клавиатурных сокращений удобно просматривать новости. Нажмите [h] чтобы спрятать подсказки..</div>";
	document.addEventListener('keypress', function(e) {
		e = e || window.event;
		var char = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if(typeof e.target.type == "undefined" || !e.target.nodeName.match(/input|select|textarea/i)) keyPressed(char);
	}, true);
})();