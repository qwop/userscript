// ==UserScript==
// @name         ymail-basic. ADVANCED TURBO
// @description  Make BASIC Yahoo! MAIL more ADVANCED, SHIFT+CLICK for range-(un)select e-mails / TURBO select all / TURBO actions (e-mail moves, star/read/unread flags, etc.) will trigger immediately upon select / keyboard shortcuts (CTRL+A, DEL, ←, →) / Remove ads crap
// @version      2014.0420.1910
// @since        2013.9.12.
// @namespace    https://userscripts.org/177655
// @author       PATATE12 aka. jesus2099/shamo
// @licence      CC BY-NC-SA 3.0 (https://creativecommons.org/licenses/by-nc-sa/3.0/)
// @grant        none
// @include      http://*mail.yahoo.com/neo/b/*
// @include      https://*mail.yahoo.com/neo/b/*
// @exclude      *://*mail.yahoo.com/mc/md.php*
// @run-at       document-end
// ==/UserScript==
(function() {"use strict";
	/*---CONFIG---*/
	var KEYBOARD_SHORTCUTS = true; /*CTRL+A: select all, DEL: delete e-mail, LEFT ARROW: previous message, RIGHT ARROW: next message*/
	var REMOVE_CRAP = true; /*FULL SCREEN DISPLAY. removes various distracting craps (ads, etc.)*/
	/*---CONFIG---*/
	var userjs = {"key":177655,"name":"ymail-basic. ADVANCED TURBO"};
	var DEBUG = localStorage.getItem("jesus2099debug");
	var shortcuts = {
		"27": {"key":"ESC","button":["#top_backSearch", "td.main div.contentbuttonbar span.btn > input#cancelbuttontop[name='action_cancel_compose']", "td.navigation ul.folders li.selected > a"]},
		"37": {"key":"←","button":"td.main > div.container > a.action.arrows.left, td.main div.contentnav > div.pagination > span#top_pagination > a + a"},
		"39": {"key":"→","button":"td.main > div.container > a.action.arrows.right, td.main div.contentnav > div.pagination > span#top_pagination > span.pageno > a:not([href^='#'])"},
		"46": {"key":"DEL","button":"td.main div.contentbuttonbar input[id='top_delete'][type='submit']"},
		"CTRL+65": {"noreload":true,"key":"A","button":"td.main div.contentnav a#select_all.action"},
		"65": {"key":"A","button":"td.main div.contentbuttonbar span.btn > input[type='submit'][name='action_msg_replyall']"},
		"70": {"key":"F","button":"td.main div.contentbuttonbar span.btn > input[type='submit'][name='action_msg_fwd']"},
		"73": {"key":"I","button":"td.main > div.container > div.spamwarning > a[href*='blockimages=none']"},
		"77": {"key":"M","button":"td.main div.contentbuttonbar select[name='top_action_select'] > option[value='msg.flag']"},
		"78": {"key":"N","button":"div#globalbuttonbartop.globalbuttonbar span.btn > input.composeicon[type='submit']"},
		"82": {"key":"R","button":"td.main div.contentbuttonbar span.btn > input[type='submit'][name='action_msg_reply']"},
		"83": {"key":"S","button":"td.main div.contentbuttonbar span.btn > input#top_spam[type='submit'][name='action_msg_topspam'], td.main div.contentbuttonbar span.btn > input#top_ham[type='submit'][name='msg_topham'], td.main div.contentbuttonbar select[name='top_action_select'] > option[value='msg.ham'], td.main div.contentbuttonbar select[name='top_action_select'] > option[value='msg.spam']"},
		"85": {"key":"U","button":"td.main div.contentbuttonbar select[name='top_action_select'] > option[value='msg.unread']"},
	};
	var emails = document.querySelectorAll("table#datatable > tbody > tr > td > h2 > a.mlink");
	if (emails) {
		/*select multiple e-mails with shift+click first last (range click)*/
		var lastemcb = -1;
		var emcbs = document.querySelectorAll("table#datatable > tbody > tr > td > input.selectmsg[type='checkbox'][name='mid']");
		var selectall = document.querySelector("td.main div.contentnav a#select_all.action");
		if (selectall && emcbs) {
			hackit(selectall, "(TURBO)");
			selectall.addEventListener("click", function(e){
				stop(e);
				if (emcbs.length > 0) {
					sendEvent(emcbs[0], "ctrl+click");
				}
			}, false);
		}
		for (var emcb=0; emcb < emcbs.length; emcb++) {
			hackit(emcbs[emcb], "SHIFT+CLICK for range-(un)select\nCTRL+CLICK for (un)select all");
			emcbs[emcb].addEventListener("click", function(e) {
				if (e.ctrlKey || e.shiftKey && lastemcb > -1) {
					var i = 0;
					var max = emcbs.length;
					if (!e.ctrlKey) {
						i = indexOf(this, emcbs);
						max = Math.max(lastemcb, i);
						i = Math.min(lastemcb, i);
					}
					for (; i < max; i++) {
						if (emcbs[i].checked != this.checked) { emcbs[i].checked = this.checked; }
					}
					lastemcb = -1;
				}
				else {
					lastemcb = indexOf(this, emcbs);
				}
			}, false);
		}
		/*auto apply actions (star/read/unread flags, move, etc.)*/
		var autofire = [
			{ "triggers": "div.contentbuttonbar select[name='top_action_select']", "submit": "div.contentbuttonbar input.action[type='submit'][name='self_action_msg_topaction']" },
			{ "triggers": "div.sortpane select[name*='sor']", "submit": "div.sortpane input.action[type='submit'][name='self_action_msg_filter']" },
			{ "triggers": "table.uh td.uh-rt select.uh-mnu[name='jumpTo']", "submit": "table.uh td.uh-rt button.uh-mnu-btn[type='submit']" }
		];
		for (var af = 0; af < autofire.length; af++) {
			var triggers = document.querySelectorAll(autofire[af].triggers);
			if (triggers.length > 0 && document.querySelector(autofire[af].submit)) {
				for (var tr = 0; tr < triggers.length; tr++) {
					hackit(triggers[tr], "(Action will trigger immediately uppon select)");
					triggers[tr].setAttribute("afsbmt", autofire[af].submit);
					triggers[tr].addEventListener("change", function(e) {
						try { doThis(document.querySelector(this.getAttribute("afsbmt"))); } catch(e) {}
					}, false);
				}
				
			}
		}
		/*keyboard shortcuts*/
		if (KEYBOARD_SHORTCUTS) {
			document.addEventListener("keydown", function(e){
				var key = (e.ctrlKey?"CTRL+":"")+e.keyCode;
				try {
					if (DEBUG) console.log(userjs.name+" key "+key+(shortcuts[key]?" on "+e.target+".\n("+shortcuts[key].key+") → "+shortcuts[key].button:""));
					if (!e.target || !e.target.tagName || !e.target.tagName.match(/input|select|textarea/i) || e.target.tagName.match(/input/i) && e.target.getAttribute("type") && !e.target.getAttribute("type").match(/password|text/i)) {
						doThis(shortcuts[key].button, shortcuts[key].noreload);
						return stop(e);
					}
				} catch(e) {}
			}, false);
			for (var sc in shortcuts) { if (shortcuts.hasOwnProperty(sc)) {
				try { hackit(shortcuts[sc].button, "", "["+sc.replace(/\d+$/, shortcuts[sc].key)+"]"); } catch(e) {}
			} }
		}
		/*remove crap*/
		if (REMOVE_CRAP) {
			document.head.appendChild(document.createElement("style")).setAttribute("type", "text/css");
			var j2delcrapss = document.styleSheets[document.styleSheets.length-1];
			j2delcrapss.insertRule([
				"a[href*='//beap.adss.yahoo.com/']",
				"div[class$='-ad']",
				"div[class^='ad-']",
				"img[src*='//beap.adss.yahoo.com/']",
				"td.sky-ad",
				"tr.layoutfixer td.c3"
			].join(",")+"{display:none}", j2delcrapss.cssRules.length);
			try {
				getParent(document.querySelector("table.tbl tr > td.spnsr"), "tr").style.setProperty("display", "none");
			} catch(e) {}
		}
	}
	function hackit(_obj, title, text) {
		var obj = findNode(_obj);
		obj.style.setProperty("background-color", "#cfc");
		obj.style.setProperty("color", "#030");
		obj.style.setProperty("cursor", "help");
		obj.setAttribute("title", (obj.getAttribute("title")?obj.getAttribute("title")+" ":"")+title);
		if (text) {
			if (obj.tagName && obj.tagName == "INPUT") {
				obj.setAttribute("value", obj.getAttribute("value")+" "+text);
			}
			else if (obj.tagName && obj.textContent.match(/\w+/)) {
				var label = obj.firstChild.tagName?obj.firstChild:obj;
				label.appendChild(document.createTextNode(" "+text));
			}
		}
	}
	function findNode(argh) {
		if (typeof argh == "string") return document.querySelector(argh);
		else if (argh.tagName) return argh;
		else if (argh.length) for (var vrouf,paf=0; paf < argh.length; paf++) if (vrouf = document.querySelector(argh[paf])) return vrouf;
	}
	function getParent(obj, tag, cls) {
		var cur = obj;
		if (cur.parentNode) {
			cur = cur.parentNode;
			if (cur.tagName.toUpperCase() == tag.toUpperCase() && (!cls || cls && cur.className.match(new RegExp("\\W*"+cls+"\\W*")))) {
				return cur;
			} else {
				return getParent(cur, tag, cls);
			}
		} else {
			return null;
		}
	}
	function doThis(butt, noreload) {
		var button = findNode(butt);
		var opt = (button.tagName == "OPTION");
		var inp = opt?button.parentNode:button;
		if (opt) inp.selectedIndex = button.index;
		if (!noreload) inp.style.setProperty("background-color", "gold");
		sendEvent(inp, opt?"change":"click");
	}
	function indexOf(element, array) {
		var i = -1;
		for (var a=0; a < array.length; a++) {
			if (array[a] == element) {
				i = a;
				break;
			}
		}
		return i;
	}
	function sendEvent(n, _e){
		var e = _e.toLowerCase();
		var ev;
		if (e.match(/click|mouse/)) {
			var params = {};
			params.mods = [];
			if (e.match(/\+/)) {
				params.mods = e.split("+");
				e = params.mods.pop();
			}
			ev = document.createEvent("MouseEvents");
			ev.initMouseEvent(e, true, true, self, 0, 0, 0, 0, 0, params.mods.indexOf("ctrl")>-1, params.mods.indexOf("alt")>-1, params.mods.indexOf("shift")>-1, params.mods.indexOf("meta")>-1, 0, null);
		}
		else {
			ev = document.createEvent("HTMLEvents");
			ev.initEvent(e, true, true);
		}
		n.dispatchEvent(ev);
	}
	function stop(e) {
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		e.preventDefault();
		return false;
	}
})();