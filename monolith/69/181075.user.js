// ==UserScript==
// @name           Tusfiles Auto Downloader
// @description    Simply uncheck "use our download manager" and submit download button automatically from tusfiles.net
// @namespace      http://ssh-gue.blogspot.com/
// @author         Muehammad Yuezha Andrean
// @version        3.0.0
// @date           29-10-2013
// @include        http://www.tusfiles.net/*
// @include        http://tusfiles.net/*
// ==/UserScript==

var f=document.getElementsByTagName('form');
if(f[0].quick != null) {
	//uncheck "use out download manager
	f[0].quick.checked = false;

	//submit/click download button
	var d=document.getElementById('btn_download');
	if(d != null) d.click();
}