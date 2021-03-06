// ==UserScript==
// @name           Demonoid Auto Sort By Seeds
// @namespace      http://userscripts.org/users/99238
// @description    Automatically sorts results by seeds
// @include        http://www.demonoid.com/files/*
// @include        http://www.demonoid.me/files/*
// ==/UserScript==

function addSortInput() {
var s = document.evaluate("//input[@name='sort']", document, null, 9, null).singleNodeValue;
if(s) {s.value = "S";}
}

if(/\/files\/.+category=.+$/.test(location.href) && !/(\&|\?)sort=S/.test(location.href)) {
location.href = location.href.replace(/\&sort=(\w+)?/g, '') + '&sort=S';
}

window.addEventListener("load", addSortInput, false);