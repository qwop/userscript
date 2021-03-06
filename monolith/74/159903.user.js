// ==UserScript==
// @name        drrr_reading_mode_s
// @namespace   function
// @include     http://drrrchat.com/room*
// @match       http://drrrchat.com/room*
// @version     2
// @run-at document-start 
// ==/UserScript==

window.setInterval2 = window.setInterval;
window.setInterval = function (a) {
    return false
}
function addLoadEvent(fn) {
    var init = function () {
        if (arguments.callee.done) return;
        arguments.callee.done = true;
        fn.apply(document, arguments)
    };
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", init, false)
    }
    if (/WebKit/i.test(navigator.userAgent)) {
        var _timer = setInterval(function () {
            if (/loaded|complete/.test(document.readyState)) {
                clearInterval(_timer);
                init()
            }
        }, 10)
    } /*@cc_on@*/
    /*@if(@_win32)document.write("<script id=\"__ie_onload\" defer=\"defer\" src=\"javascript:void(0)\"><\/script>");var script=document.getElementById("__ie_onload");script.onreadystatechange=function(){if(this.readyState=="complete"){init()}};/*@end@*/
    return true
}
addLoadEvent(function () {
    var h = document.getElementsByTagName("head")[0];
    if (h && window.location.href.match("drrrchat")) {
        var nScript = document.createElement("style");
        nScript.innerHTML = 'dt:after{content:"";position:absolute;top:0;left:-2px;width:26px;border-left:2px solid white;border-right:2px solid white;height:58px;}dt{line-height:12px!important;font-size:50%;position:relative;margin:0 6px;width:20px!important;}textarea{width:136px!important;height:70px!important;}#talks{margin-top:0;}div#bodyLounge{left:0;width:100%;margin-left:0;position:static;}dl.talk dd div.bubble p.body{font-family:"Microsoft Yahei";}dl.talk dd{max-width:90%!important;}#message .messageInput .user{width:auto;}dl.talk dt{background-position:top center;width:58px;over-flow:hidden;padding:54px 3px 0 3px;}img{width:1em!important;height:1em;}html{background:#000!important;}p.body{background:transparent!important;}body{background:#000!important;font-size:18px;font-family:"Microsoft JhengHei";}#socialButton{display:none;}.talk{min-height:auto!important;width:1000px!important}div#body{margin-left:0;position:static;Width:100%;225px;background:#000!important;}div.message_box{position:static;}div.message_box_inner{left:0;position:static;margin-left:0;}#message .messageInput textarea{padding:0;font-size:14px;height:36px;float:left;}ul.menu{float:left;}div.submit{clear:both;}#message div.submit input{margin:0;}';
        h.appendChild(nScript)
    }
    var a = document.createElement('script');
    a.type = "text/javascript";
    a.innerHTML = 'window.c_int=function(){if(typeof(window.jQuery)==\'undefined\'){}else{clearInterval(window.a);window.jQuery(function(b){var l=null,p=null,q=null,f=null,r=null,k=null,F=null,s=null,G=null,e=null,H=null,h=null,j=null,I=null,J=\"\",K=null,A=!1,u=!1,B=!1,n=!0,o=!0,v=!1,w=null,L=null,M=null,V=document.title,m=0,x=0,W=function(){var a=f.val();a.replace(/[\\r\\n]+/g,\"\");if(a.replace(/^[ \\n]+$/,\"\")==\"\")return a.replace(/^\\n+$/,\"\")==\"\"&&f.val(\"\"),!1;if(A)return!1;var b=q.serialize();if(a==J&&confirm(t(\"Will you stop sending the same message? If you click \'Cancel\' you can send it again.\")))return f.val(\"\"),!1;f.val(\"\");A=!0;s.val(t(\"Sending...\"));J=a;a.length-1>messageMaxLength&&(a=a.substring(0,messageMaxLength)+\"...\");var d=y(L),a=y(a),i=\'<dl class=\"talk\" id=\"\'+w+\'\">\';i+=\'<dt class=\"\'+M+\'\">\'+d+\"</dt>\";i+=\'<dd><div class=\"bubble\">\';i+=\'<p class=\"body \'+userColor+\'\">\'+a+\"</p>\";i+=\"</div></dd></dl>\";r.prepend(i);N();O();P(b);return!1},WOW=top.window.reader?(top.window.reader.api.post=function(dd){var a=dd;a.replace(/[\\r\\n]+/g,\"\");if(a.replace(/^[ \\n]+$/,\"\")==\"\"){return!1}var q={message:a};var b=window.jQuery.param(q);var d=y(L),a=y(a),i=\'<dl class=\"talk\" id=\"\'+w+\'\">\';i+=\'<dt class=\"\'+M+\'\">\'+d+\"</dt>\";i+=\'<dd><div class=\"bubble\">\';i+=\'<p class=\"body \'+userColor+\'\">\'+a+\"</p>\";i+=\"</div></dd></dl>\";r.prepend(i);N();O();P(b);return!1}):\"\",P=function(a){b.ajax({type:\"POST\",url:l,data:a,success:function(){m=0;A=!1;s.val(t(\"POST!\"))},error:function(){m+=1;b(\"<div />\").delay(500).queue(function(){P(a)})},dataType:\"text\"})},Q=function(){b.ajax({type:\"POST\",url:p+\"?fast=1\",data:{},success:function(a){m=0;B=!1;C(a);if(top.window.reader){top.window.reader.monitor(a)}},error:function(){m+=1;b(\"<div />\").delay(1500).queue(function(){Q()})},dataType:\"xml\"})},X=function(){b.post(p+\"?fast=1\",{},function(a){R();C(a)},\"xml\")},R=function(){b.post(p,{},function(a){R();C(a)},\"xml\")},C=function(a){var c=b(a).find(\"room > update\").text()*1;if(K==c||h.is(\":visible\"))x=0;else{var d=Y(a);if(d!=0){if(x+=1,x>3){u=!0,alert(d),location.href=duraUrl}}else x=0,K=c,c=b(a).find(\"room > name\").text(),document.title=c+\" | \"+V,H.text(c),roomLimitElement.text(b(a).find(\"room > limit\").text()),roomTotalElement.text(b(a).find(\"users\").length),b.each(b(a).find(\"talks\"),Z),$(a),b(a).find(\"host\").text()==w?e.find(\"li.setting\").show():e.find(\"li.setting\").hide()}},Z=function(){var a=b(this).find(\"id\").text();if(!(b(\"#\"+a).length>0)){var c=g(b(this).find(\"uid\").text()),d=g(b(this).find(\"name\").text()),i=g(b(this).find(\"message\").text()),f=g(b(this).find(\"icon\").text()),e=g(b(this).find(\"color\").text());g(b(this).find(\"time\").text());d=y(d);i=y(i);c==0||c==\"0\"?r.prepend(\'<div class=\"talk system\" id=\"\'+a+\'\">\'+i+\"</div>\"):c!=w&&(a=\'<dl class=\"talk\" id=\"\'+a+\'\">\',a+=\'<dt class=\"\'+f+\'\">\'+d+\"</dt>\",a+=\'<dd><div class=\"bubble\">\',a+=\'<p class=\"body \'+e+\'\">\'+i+\"</p>\",a+=\"</div></dd></dl>\",r.prepend(a),N());O()}},$=function(a){k.find(\"li\").remove();j.find(\"li\").remove();var c=b(a).find(\"users\").length;k.append(\"<li>(\"+c+\")</li>\");var d=b(a).find(\"host\").text();b.each(b(a).find(\"users\"),function(){var a=b(this).find(\"name\").text(),c=b(this).find(\"id\").text(),f=b(this).find(\"icon\").text(),e=\"\";d==c&&(e=\" \"+t(\"(host)\"));k.append(\"<li>\"+a+e+\"</li>\");d!=c&&(j.append(\"<li>\"+a+\"</li>\"),j.find(\"li:last\").css({background:\'transparent url(\"\'+duraUrl+\"/css/icon/\"+f+\'.png\") center top no-repeat\'}).attr(\"name\",c).click(function(){b(this).hasClass(\"select\")?(j.find(\"li\").removeClass(\"select\"),settingPannelButtons.attr(\"disabled\",\"disabled\")):(j.find(\"li\").removeClass(\"select\"),b(this).addClass(\"select\"),settingPannelButtons.removeAttr(\"disabled\"))}))});S()},Y=function(a){a=b(a).find(\"error\").text()*1;if(!(a==0||u))if(a==1)return t(\"Session time out.\");else if(a==2)return t(\"Room was deleted.\");else if(a==3)return t(\"Login error.\");return 0},N=function(){var a=b(\".bubble .body:first\"),c=a.parent(),d=a.width()+\"px\",e=a.height()+\"px\",f=5+a.width()+\"px\",g=5+a.height()+\"px\";if(o)try{messageSound.play()}catch(h){}(b(\"dl.talk:first dt\").click(T),(b.each(c,D),c.css({opacity:\"1!important\",width:\"22px!important\",height:\"16px!important\"}),a.css({\"border-width\":\"4px!important\",\"font-size\":\"1em!important\",\"text-indent\":\"0!important\",opacity:\"1!important\",width:f+\"!important\",height:g+\"!important\"})),(b.each(a,E),a.css({width:d+\"!important\",height:e+\"!important\"})))},y=function(a){a=a.replace(/&/g,\"&amp;\");a=a.replace(/\"/g,\"&quot;\");a=a.replace(/\'/g,\"&#039;\");a=a.replace(/</g,\"&lt;\");return a=a.replace(/>/g,\"&gt;\")},aa=function(){var a=f.val();if(a!=a.replace(/[\\r\\n]+/g,\"\")){return q.submit(),!1}},ba=function(){u=!0;b(\"*\").hide();b.post(l,{logout:\"logout\"},function(){location.href=duraUrl})},O=function(){if(b(\".talk\").length>50){for(;b(\".talk\").length>50;){b(\".talk:last\").remove()}}},S=function(){k.find(\"li:not(:last)\").each(function(){b(this).append(\", \")})},T=function(){var a=b(this).text(),c=f.val();f.focus();c.length>0?f.val(c+\" @\"+a):f.val(c+\"@\"+a+\" \")},g=function(a){return a=a.replace(/^\\s+|\\s+$/g,\"\")},E=function(){},D=function(){var a=b(this).find(\".body\").height()+30+8,a=(Math.round((180-a)/2)+23)*-1,c=b(this).find(\".body\").css(\"background-image\"),d=\"0px\";Math.floor(Math.random()*2)==1&&(d=\"-17px\");a+=1;b(this).find(\".body\").css({margin:\"0 0 0 15px\"});b(this).prepend(\"<div><div></div></div>\").css({margin:\"-16px 0 0 0\"});b(this).children(\"div\").css({position:\"relative\",\"float\":\"left\",margin:\"0 0 0 0\",top:\"39px\",left:\"-3px\",width:\"22px\",height:\"16px\",background:\"transparent \"+c+\" left \"+a+\"px repeat-x\"});b(this).children(\"div\").children(\"div\").css({width:\"100\",height:\"16\",background:\"transparent url(\'\"+duraUrl+\"/css/tail.png\') left \"+d+\" no-repeat\"})},ca=function(){e.find(\"li:hidden:not(.setting)\").show();var a=o?\"sound_on\":\"sound_off\",b=v?\"member_on\":\"member_off\",d=n?\"animation_on\":\"animation_off\";e.find(\"li.sound\").addClass(a);e.find(\"li.member\").addClass(b);e.find(\"li.animation\").addClass(d)},da=function(){o?(b(this).removeClass(\"sound_on\"),b(this).addClass(\"sound_off\"),o=!1):(b(this).removeClass(\"sound_off\"),b(this).addClass(\"sound_on\"),o=!0)},ea=function(){v?(b(this).removeClass(\"member_on\"),b(this).addClass(\"member_off\"),k.addClass(\"hide\"),k.css(\"height\",\"0px\"),v=!1):(b(this).removeClass(\"member_off\"),b(this).addClass(\"member_on\"),k.removeClass(\"hide\"),k.css(\"height\",\"2.5ex\"),v=!0)},fa=function(){n?(b(this).removeClass(\"animation_on\"),b(this).addClass(\"animation_off\"),n=!1):(b(this).removeClass(\"animation_off\"),b(this).addClass(\"animation_on\"),n=!0)},z=function(){settingPannelButtons.attr(\"disabled\",\"disabled\");I.css(\'display\',(I.css(\'display\')==\'block\'?\'none\':\'block\'));s.css(\'display\',(s.css(\'display\')==\'block\'?\'none\':\'block\'));h.css(\'height\',(h.css(\'height\')==\'200px\'?\'1px\':\'200px\'));h.removeClass(\"hide\")},ga=function(){var a=h.find(\"input[name=room_name]\").val(),c=h.find(\"select[name=limit]\").val();b.post(l,{room_name:a,limit:c},function(a){alert(a);z()})},ha=function(){var a=j.find(\"li.select\").attr(\"name\");confirm(t(\"Are you sure to handover host rights?\"))&&b.post(l,{new_host:a},function(a){alert(a);z()})},ia=function(){U(!1,t(\"Are you sure to kick this user?\"))},ja=function(){U(!0,t(\"Are you sure to ban this user?\"))},U=function(a,c){var d;d=j.find(\"li.select\").attr(\"name\");confirm(c)&&(d=a==!0?{ban_user:d,block:1}:{ban_user:d},b.post(l,d,function(a){alert(a);z()}))};(function(){var a=location.href.replace(/#/,\"\");l=a.replace(/\\?/,\"\")!=a?a+\"&ajax=1\":a+\"?ajax=1\";p=duraUrl+\"/ajax.php\";q=b(\"#message\");f=b(\"#message textarea\");r=b(\"#talks\");k=b(\"#members\");F=b(\"input[name=logout]\");s=b(\"input[name=post]\");G=b(\"dl.talk dt\");e=b(\"ul.menu\");H=b(\"#room_name\");roomLimitElement=b(\"#room_limit\");roomTotalElement=b(\"#room_total\");h=b(\"#setting_pannel\");j=b(\"#user_list\");settingPannelButtons=b(\"input[name=handover], input[name=ban], input[name=block]\");I=b(\".messageInput\");w=g(b(\"#user_id\").text());L=g(b(\"#user_name\").text());top.window.reader?(top.window.reader.api.myname=L.replace(/&/g,\"&amp;\")):\"\";M=g(b(\"#user_icon\").text());userColor=g(b(\"#user_color\").text());messageMaxLength=140;typeof GlobalMessageMaxLength!=\"undefined\"&&(messageMaxLength=GlobalMessageMaxLength);q.unbind(\'submit\');q.submit(W);f.keyup(aa);F.click(ba);G.click(T);e.find(\"li.sound\").click(da);e.find(\"li.member\").click(ea);e.find(\"li.animation\").click(fa);e.find(\"li.setting\").click(z);h.find(\"input[name=save]\").click(ga);h.find(\"input[name=handover]\").click(ha);h.find(\"input[name=ban]\").click(ia);h.find(\"input[name=block]\").click(ja);S();useComet?X():(window.istop)?\"\":setInterval2(function(){!B&&!u&&(B=!0,Q())},top.window.reader?(top.window.reader.api.timer=2000):6000)})()})}};window.a=setInterval2(function(){window.c_int()},500);';
    document.getElementsByTagName('head')[0].appendChild(a);
    if (!window.location.href.match("room") || top.window.location.href != window.location.href || top.window.istop) {
        return false
    } else {
        window.istop = true;
        document.body.innerHTML = '<style>/* caTUI a standard css forms */body{position:relative;}.caTUI{position:fixed;width:200px;height:100%;right:20px;top:0;background:#ccc;overflow:hidden;}</style><iframe id="if" src="http://drrrchat.com/room/?a=1" style="border:none;overflow:auto;position:fixed;top:0;left:0;width:100%;height:100%"></iframe>'
    }
    window.reader = {
        ml: 140,
        maxtime: 8,
        mintime: 4,
        bt: "",
        lc: 0,
        nc: [],
        np: 0,
        db: [""],
        dbm: 0,
        starttime: 0,
        lastmessage: "",
        api: {
            post: function () {},
            timer: 1500,
            myname: ""
        },
        init: function () {
            setTimeout(function () {
                var a = document.createElement('div');
                a.className = 'caTUI';
                a.innerHTML = '<h1>	caTreader 控制器</h1><div class="box">	<label for="r_title">书名：</label>	<input id="r_title" type="text" value=""/>	<label for="r_article">内容：</label>	<textarea id="r_article">内容</textarea>	<label for="r_maxtime">最大时间：</label>	<input id="r_maxtime" type="text" value="3"/>	<label for="r_mintime">最小时间：</label>	<input id="r_mintime" type="text" value="2"/>	<label for="r_np">起始行数：</label>	<input id="r_np" type="text" value="0"/>	<input id="r_ok" type="button" value="朗读！" onclick="window.reader.gofunction();"/><input id="r_ok" type="button" value="暂停" onclick="window.reader.pausefunction();"/><input id="r_ok" type="button" value="继续" onclick="window.reader.startfunction();"/></div>';
                document.body.appendChild(a)
            }, 500)
        },
        gofunction: function () {
            this.db = document.getElementById('r_article').value.split("\n");
            this.dbm = this.db.length;
            this.bt = document.getElementById('r_title').value;
            this.maxtime = Number(document.getElementById('r_maxtime').value) == NaN ? 8 : Number(document.getElementById('r_maxtime').value);
            this.mintime = Number(document.getElementById('r_mintime').value) == NaN ? 4 : Number(document.getElementById('r_mintime').value);
            this.np = Number(document.getElementById('r_np').value) == NaN ? 0 : Number(document.getElementById('r_np').value);
            var a = new Date();
            this.starttime = a.getTime();
            this.post("--" + this.bt + "--");
            this.nc = new Array();
            while (this.np < this.dbm && this.requirenc() === "") {
                this.np += 1
            }
            document.getElementById('r_np').value = this.np;
            this.nc = new Array();
            this.requirenc();
            this.startfunction()
        },
        monitor: function (d) {
            var a = d.getElementsByTagName('talks');
            var c = 0;
            var m = 0;
            for (var b = 0; b < a.length; b++) {
                if (Number(a[b].getElementsByTagName('time')[0].firstChild.textContent) > m) {
                    m = Number(a[b].getElementsByTagName('time')[0].firstChild.textContent);
                    c = b
                }
            }
            if (this.lastmessage != a[c].getElementsByTagName('message')[0].firstChild.textContent) {
                this.lastmessage = a[c].getElementsByTagName('message')[0].firstChild.textContent;
                this.filter(a[c].getElementsByTagName('message')[0].firstChild.textContent)
            }
            if (this.lc != 0) {
                this.read()
            }
        },
        startfunction: function () {
            if (this.np >= this.dbm) {
                this.post("刚才的故事结束了已经");
                return false
            }
            this.lc = 1
        },
        pausefunction: function () {
            this.lc = 0
        },
        filter: function (d) {
            if (this.lc != 0 && (d.match("已登陆房间") || d.match(/信息|info|情報/))) {
                var a = new Date();
                var t1 = Math.floor((a.getTime() - this.starttime) / 60000);
                var t2 = Math.floor((this.dbm - this.np) * this.maxtime * 0.7 * this.api.timer / 60000);
                this.post("我正在读《" + this.bt + "》呢，" + t1 + "分钟前开始的，故事大概还有" + t2 + "分钟呢。发送（继续|暂停|信息）指令可以控制我读书哦~");
                return true
            } else if (d.match(/暂停|pause|ポーズ/)) {
                if (d.match("@" + this.api.myname) || !d.match("@")) {
                    this.pausefunction();
                    return true
                }
            } else if (d.match(/继续|start|resume|go on|続|つづ/)) {
                if (d.match("@" + this.api.myname) || !d.match("@")) {
                    this.startfunction();
                    return true
                }
            }
        },
        requirenc: function () {
            if (this.nc.length == 0) {
                var r = this.db[this.np].replace(/\s/g, '');
                if (r == "") {
                    return ""
                }
                var a = this.db[this.np].length;
                var t1;
                if (a > this.ml) {
                    t1 = new Array;
                    for (var i = 0; i * this.ml < a; i++) {
                        t1.push(this.db[this.np].substr(i * this.ml, this.ml))
                    }
                    t1.reverse()
                } else {
                    t1 = [this.db[this.np]]
                }
                this.nc = t1;
                return true
            }
            return false
        },
        read: function () {
            if (this.lc > 1) {
                this.lc -= 1;
                return false
            }
            this.lc = (this.nc[this.nc.length - 1].length > (this.ml / 2)) ? this.maxtime : this.mintime;
            this.post(this.nc.pop());
            if (this.np + 1 >= this.dbm) {
                this.lc = 0;
                this.post("--End--");
                return false
            }
            this.np += 1;
            while (this.np < this.dbm && (this.requirenc() === "")) {
                this.np += 1
            }
            if (this.np >= this.dbm) {
                this.lc = 0;
                this.post("--End--");
                return false
            }
            this.requirenc();
            document.getElementById('r_np').value = this.np
        },
        post: function (a) {
            this.lastmessage = a;
            this.api.post(a)
        }
    };
    window.reader.init()
});