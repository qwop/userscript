// ==UserScript==
// @name           Facebook smiley Cybercode & kaskus
// @namespace      http://cybercode.biz
// @description    membuat Teks Biasa menjadi Cybercode & kaskus Emote Di Facebook dengan tag default cybercode&kaskus emote Bisa di pakai untuk chat ataupun wall
// @require http://userscripts.org/scripts/source/114106.user.js
// @include http://www.facebook.com/*
// @include http://apps.facebook.com/*
// @include https://www.facebook.com/*
// @include https://apps.facebook.com/*

// @version        1.7.7
// ==/UserScript==
//
//      -Cybercode & KaskuS- Emoticons Relased
//      
//      Copyright 2010 chrisk8er <chrisk8er@nomail2me.com>
//      edited by http://www.facebook.com/krestianweken
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//      This program is free software; you can redistribute it and/or modify
//      it under the terms of the GNU General Public License as published by
//      the Free Software Foundation; either version 2 of the License, or
//      (at your option) any later version.
//      
//      This program is distributed in the hope that it will be useful,
//      but WITHOUT ANY WARRANTY; without even the implied warranty of
//      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//      GNU General Public License for more details.
//      
//      You should have received a copy of the GNU General Public License
//      along with this program; if not, write to the Free Software
//      Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
//      MA 02110-1301, USA.
//
//		All rights ReserveD This Script Modiffed By chrisk8er A.K.A chris On kaskuser 
//		-[PERINGATAN]- JANGAN MENGAKUI KODE INI MILIK ORANG LAIN 
//		JANGAN MODIFIKASI KODE INI SEIZIN OWNER
//		Respect To Owner 
//		Start Begin on code

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://cybercode.biz/forum/index.php?app=forums&module=extras&section=legends','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://cybercode.biz/images/smilies/kaskussmall/sundulgans.gif\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; bottom: -2px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);