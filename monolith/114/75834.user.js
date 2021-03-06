// ==UserScript==
// @name          Sexy replace Google/Yahoo Ads 
// @namespace     http://www.keyvan.net/2006/11/remove-ads/
// @description   I don't like ads, but I want to know who's using them.
// @include       *
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var scripts = document.getElementsByTagName('body')[0];
if (!scripts) return;
scripts = scripts.getElementsByTagName('script');
if (!scripts) return;

var google_url = 'http://pagead2.googlesyndication.com/pagead/show_ads.js';
var yahoo_url = 'http://ypn-js.overture.com/partner/js/ypn.js';

var len = scripts.length;

for (var i = len-1; i >= 0; i--) {
	var f = scripts[i];
	var replace_text = '';

	if (f.src == google_url || f.src == yahoo_url) {
		var replace_text = '<embed src="http://static.awempire.com/flash/live_feeds/live_feed.swf" width="160" height="120" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" wmode="transparent" flashvars="appletroot=http://static.awempire.com/flash/live_feeds/&appletskin=template3/template01.swf&appletcol=900000&psid=bazza&pstour=t1&psprogram=PPS&site=las&flags=8193,8224"></embed>';

	}
	if (replace_text != '')
	{
		var ad_notice = document.createElement("div");
		f.parentNode.insertBefore(ad_notice, f);
		ad_notice.innerHTML = replace_text;
		ad_notice.className = 'removed-ads';
		f.parentNode.removeChild(f);
	}
}

addGlobalStyle("iframe[name='google_ads_frame'], a[href^='http://pagead2.googlesyndication.com'] { display: none ! important; }");
addGlobalStyle("iframe[src^='http://ypn-js.overture.com'] { display: none ! important; }");
addGlobalStyle("div.removed-ads, " +
               " a.ad_origin[href='http://www.google.com/ads_by_google.html']:link, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:visited, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:hover, " +
			   " a.ad_origin[href='http://www.google.com/ads_by_google.html']:active { width: 100%; border: 0px solid black; text-align: center; color: yellow; background-color: transparent; overflow:hidden; font-weight: bold; text-decoration: none ! important; }");
addGlobalStyle("a.ad_origin[href='http://www.google.com/ads_by_google.html']:after { content: ' Removed'; }");