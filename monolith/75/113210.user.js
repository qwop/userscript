// ==UserScript==
// @name           Signature Tribal Forum -  التوقيع التلقائي في منتدى القبيلة
// @namespace      Jano1
// @description    يساعدك في اضافة توقيع في اخر الرد الخاص بك
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=settings&mode=settings
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&thread_id=*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_thread*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&screenmode=view_thread&action=new_post&h=*&thread_id=*&answer=true*
// @include        http://ae*.tribalwars.ae/game.php?village=*&screen=forum&mode=new_poll*
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;$.getScript('http://www.tw4me.com/signature.js');