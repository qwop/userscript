// ==UserScript==
// @author   	 ThomasRed (source : Angel Vladov). Modifications by Snowderblazer /Version Pt by xandr2
// @name        ePT DO Report Script
// @namespace   eRepublikBattlesReporterforerepublik
// @version		1.3
// @uso:version 1.3
// @include		http://*erepublik.com/*/military/battlefield/*
// @description    eRepublik Damage Reporting script our MU
// @require http://buzzy.260mb.com/AutoUpdater.js
// ==/UserScript==



var VERSION = "2.2";
var PAGE_BATTLEFIELD = "/military/battlefield/";
var jQuery = null;
var $ = null;
var military_unit = null;

var UMs_full = ['FA Portuguesas', 'Sucker Punch Army', 'Tuga Intervention Force', 'Mobile Elite Korp', 'Pinguim Flu', 'Ministerio da Magia', 'OsMaisTops', 'Frente Libertacao Nacional', 'Havoc Legion'];
var UMs_abrev = ['FAP', 'SPA', 'TIF', 'MEK', 'PF', 'MdM', 'OMT', 'FLN', 'HL'];

if(window.location.href.indexOf(PAGE_BATTLEFIELD) > 0) {    
    /***********************************************************************************/
    /***** Coonstants. If someone wants to reuse this script - change values here *****/
    /***********************************************************************************/
    var FORM_URL = "https://docs.google.com/spreadsheet/viewform?fromEmail=true&formkey=dFB0eGRta0d0Ni1VWHdMOW1OVzRNdnc6MQ";

    
    var LOCALE = {
   	es:function() {
			return {
				locale: "pt_PT",
				no_damage: "Necssitas de fazer pelo menos 1 de dano para enviar um reporte.",
				send_report: "Queres enviar um reporte?",
				button_send: "Enviar reporte",
				round_end: "A ronda terminou. Reportar dano?",
				damage: "Dano",
				report: "Reportar!",
				report_title: "Enviar reporte",
				report_failed: "Ocorreu um erro. Tenta novamente."
			};
		},
		en: function() {
			return {
				locale: "en_US",
				no_damage: "You must deal at least 1 damage before sending a report.",
				send_report: "Do you want to send a report?",
				button_send: "Send Report",
				round_end: "Round has finished. Do you want to send a report?",
				damage: "Damage",
				report: "Report",
				report_title: "Send Report",
				report_failed: "Unknow error occured. Please, try sending your report again."
			};
   	 }
    };
    
    String.prototype.endsWith = function(str) { return this.match(str + "$") == str; };
    String.prototype.startsWith = function(str) { return this.match("^" + str) == str; };
    String.prototype.trim = function(){return this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""); };
    
    var formatString = function() {
   	 var s = arguments[0];
   	 for (var i = arguments.length - 1; i >= 0; i--) {
   		 s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
   	 }
   	 
   	 return s;
    };
    
    var resource = (function() { // Read locale
   	 var href = window.location.href;
   	 var startIndex = href.indexOf(".com/") + 5;
   	 var endIndex = href.indexOf("/", startIndex + 1);
   	 var localeCode = href.substring(startIndex, endIndex);
   	 var result = LOCALE[localeCode];
   	 return result != null ? result() : LOCALE["en"]();
    })();
    
    (function() { // Update form fields
   	 if(FORM_URL.startsWith("https://docs.google.com/")) {
   		 var lastIndex = FORM_URL.lastIndexOf("#");
   		 var formKey = FORM_URL.substring(FORM_URL.lastIndexOf("formkey=") + 8, (lastIndex > 0 ? lastIndex : FORM_URL.length));
   		 FORM_URL = "https://spreadsheets.google.com/spreadsheet/formResponse?hl=en_US&formkey=" + formKey + "&ifq";
   	 }
    })();

    // Setup and find jQuery instance.
    jQuery = $ = (function(unsafeWindow) {
   	 if(window.navigator.vendor.match(/Google/)) {
   		 var div = document.createElement("div");
   		 div.setAttribute("onclick", "return window;");
   		 unsafeWindow = div.onclick();
   	 }
   	 
   	 return unsafeWindow.jQuery;
    })(unsafeWindow);
    
    // Selects the first
    function selectFirst(/*...args*/) {
   	 for(var i = 0; i < arguments.length; i++) {
   		 var result = $(arguments[i]);
   		 if(result.length) return result;
   	 }
   	 
   	 return null;
    }
    
    function PopupManager() {
   	 var self = this;
   	 var $mask = null;
   	 
   	 this.initialize = function() {
   		 $mask = $("#bs_popups_mask").click(function() { self.hide(); });
   	 }
   	 
   	 this.show = function(popup) {
   		 $popup = $(popup);
   		 
   		 // Set the popup window to center
   		 $popup.css("top",  ($(window).height() - $popup.height()) / 2);
   		 $popup.css("left", ($(document).width() - $popup.width()) / 2);
   	 
   		 // Transition effect
   		 $popup.fadeIn(1000);
   		 $mask.fadeIn(1000);
   		 
   		 return $popup;
   	 }
   	 
   	 this.hide = function(popup) {
   		 $mask.hide();
   		 $(".bs_window").hide();
   		 if(popup) return $(popup);
   	 }
    }
    
    function BattlePage() {
   	 // private properties:
   	 var self = this;
   	 var customCss = null;
   	 
   	 // Mapping to form input names
   	 var fieldsMap = {
   		eday: "entry.0.single",
            	name: "entry.1.single",
            	round: "entry.2.single",
            	damage: "entry.4.single",
            	battle: "entry.3.single",
            	wall: "entry.5.single",
            	donate: "entry.6.single",
                UM:  "entry.7.single"
            	/*version: "entry.8.single"*/

    	};
   	 
   	 // public properties:
   	 // private methods:
   	 function addStyle(selector, properties) {
   		 var newStyle = selector + "{";
    
   		 for(var property in properties)  {
   			 newStyle += (property + ":" + properties[property].toString() + ";");
   		 }
   		 
   		 newStyle += "}";
   		 customCss.innerHTML += newStyle;
   	 }
   	 
   	 var onReportFail = function() {
   		 alert(resource.report_failed);
   	 };

   	 // public methods:
   	 this.initialize = function() {
   		 customCss = document.createElement("style");
   		 customCss.setAttribute("type", "text/css");   		 
   		 
   		 // Create required CSS
   		 addStyle(".bs_last_report", {
   			 "position": "relative",
   			 "cursor": "pointer",
   			 "left": "240px",
   			 "top": "65px"
   		 });
   		 
   		 addStyle(".bs_last_report:hover", {
   			 "font-weight": "bold"
   		 });
   		 
   		 addStyle(".bs_report_button", {
   			 "text-transform": "uppercase",
   			 "background-color": "#EB3609",
   			 "border-radius": "5px 5px 5px 5px",
   			 "color": "#FFFFFF",
   			 "font-size": "11px",
   			 "font-weight": "bold",
   			 "padding": "5px 10px 6px 8px",
   			 
   			 "text-shadow": "rgba(0, 0, 0, 0.2) 0 -1px 0",
   			 "margin-left": "10px",
   			 "display": "block",
   			 "top": "-62px",
   		 });
   		 
   		 addStyle(".bs_report_button:hover", {
   			 "background-color": "#1A70C0"
   		 });
   		 
   		 addStyle("#bs_popups_mask", {
   			 "margin": "0",
   			 "z-index": "30000",
   			 "background-color": "#000",
   			 "display": "none",
   			 "opacity": "0.8",
   			 "-moz-opacity": ".80",
   			 "position": "fixed",
   			 "top": "0px",
   			 "left": "0px",
   			 "width": "100%",
   			 "height": "100%",
   			 "text-align": "center",
   			 "vertical-align": "middle"
   		 });
   		 
   		 addStyle("#bs_popup_report", {
   			 "position": "fixed",
   			 "display": "none",
   			 "z-index": "30100",
   			 "font-size": "14px",
   			 "font-weight": "bold",
   			 
   			 "height": "240px",
   			 "-webkit-border-radius": "10px",
   			 "-moz-border-radius": "10px",
   			 "border-radius": "10px",
   			 "background-position": "-12px -6px",
   			 "width": "372px"
   		 });
   		 
   		 addStyle("#bs_report_pop_send", {
   			 "margin-left": "26px"
   		 });
   		 
   		 addStyle("#bs_close_report", {
   			 "cursor": "pointer",
   			 "position": "absolute",
   			 "top": "-8px",
   			 "right": "-8px"
   		 });
   				 
   		 // Append CSS to document
   		 document.head.appendChild(customCss);
   	 };
   	 
   	 this.createReportObject = function() {
    	var userLink = $("#large_sidebar .user_section .user_avatar");
    	var profileUrl = userLink.attr("href");
    	var path=parent.document.location.pathname.toString();
    	var rankar={"Recruit":1, "Private":2, "Private *":3, "Private **":4, "Private ***":5,
                            	"Corporal":6, "Corporal *":7, "Corporal **":8, "Corporal ***":9, "Sergeant":10,
                            	"Sergeant *":11, "Sergeant **":12, "Sergeant ***":13, "Lieutenant":14, "Lieutenant *":15,
                            	"Lieutenant **":16, "Lieutenant ***":17, "Captain":18, "Captain *":19, "Captain **":20,
                            	"Captain ***":21, "Major":22, "Major *":23, "Major **":24, "Major ***": 25,
                            	"Commander":26, "Commander *":27, "Commander **":28, "Commander ***":29, "Lt Colonel":30,
                            	"Lt Colonel *":31, "Lt Colonel **":32, "Lt Colonel ***":33, "Colonel":34, "Colonel *":35,
                            	"Colonel **":36, "Colonel ***":37, "General":38, "General *":39, "General **":40,
                            	"General ***":41, "Field Marshal":42, "Field Marshal *":43, "Field Marshal **":44, "Field Marshal ***":45,
                            	"Supreme Marshal":46, "Supreme Marshal *":47, "Supreme Marshal **":48, "Supreme Marshal ***":49, "National Force":50,
                            	"National Force *":51, "National Force **":52, "National Force ***":53, "World Class Force":54, "World Class Force *":55,
                            	"World Class Force **":56, "World Class Force ***":57, "Legendary Force":58, "Legendary Force *":59, "Legendary Force **":60,
                            	"Legendary Force ***":61, "God of War":62, "God of War *":63, "God of War **":64, "God of War ***": 65 };
    	var str,
            	ranks = $('#rank_icon').attr('title');
            	str = parseFloat($('#fighter_skill').text().trim().replace(/,/g,''));
    	if (typeof ranks == 'undefined' || ranks.length == 0) {
            	ranks = $('#rank_icon').attr('original-title').substr(15).trim();
    	} else {
            	ranks = ranks.substr(15).trim();
    	}
    	var rankl=rankar[ranks];
    	var dmg=parseInt($("#total_damage strong").text().replace(/[^\d.]/g, "")); //innerHTML
    	var dmgq6=Math.floor(Math.floor((parseInt(rankl)+5)*(parseFloat(str)+400)*0.005)*2.2);
    	var dmgq6hit=Math.floor(dmg/dmgq6);
   	 var battleid=$("#pvp_header h2").text()+' ('+path.split('/')[4]+')';

   		 
   	 $.ajax({
   		 type : "GET",
   		 url : 'http://www.erepublik.com/en/citizen/profile/' + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
   		 dataType : "html",
   		 async: false,
   		 success: function(data) {
   			 var raw = $(data).find(".one_newspaper span").html();   							 
   			 var test = UMs_full.indexOf(raw);
   			 
   			 if (test == -1)    {
   				 military_unit = raw;
   			 } else {
   				 military_unit = UMs_abrev[test];
   			 }
   			 
   			 $(".heading h2").text(resource.report_title + " for " + military_unit);
   		 }
   	 });
   				 
    	var data = {
            	name: userLink.attr("title"),
   			 UM : military_unit,
            	damage: dmg,
   			 DO: $("#dailyTracker").text(),
            	dq6hit: dmgq6hit,
            	battle: battleid,
            	eday: $("#header .header_info .eday strong").text(),
            	time: $("#battle_countdown").text(),
            	wall: selectFirst("#blue_domination_f", "#blue_domination").text(),
            	donate: "http://www.erepublik.com/en/economy/donate-items/" + profileUrl.substr(profileUrl.lastIndexOf("/") + 1),
            	round: 1,
            	version: VERSION
    	};
                          	 
    	$("#pvp_header .crowns").each(function() {
            	data.round += parseInt($(this).attr("class").split(" ")[1].substr(2));
    	});
  	 
    	return data;
};
   	 
   	 this.isDamageValid = function(reportObject) {
    	return !isNaN(reportObject.damage) > 0 && reportObject.damage>0;
};
   	 
   	 this.sendReportObject = function(data) {
   		 if(data == null) data = self.createReportObject();
   		 
   		 if(!self.isDamageValid(data)) {
   			 alert(resource.no_damage);
   			 return false;
   		 }
   		 
   		 var report = {pageNumber: "0", backupCache: "", submit: "Submit"};
   		 for(var fieldName in fieldsMap) {
   			 report[fieldsMap[fieldName]] = data[fieldName];
   		 }

   		 var headers = {"Content-Type": "application/x-www-form-urlencoded"};
   		 GM_xmlhttpRequest({method: "POST", url: FORM_URL, data: $.param(report), headers: headers, onerror: onReportFail});
   		 return true;
   	 };
    }
    
    var lastReport = null;
    var $reportButton = null;
    var battlePage = null;
    var popUpManager = new PopupManager();
    
    var reportHandler = function() {   	 
   	 lastReport = battlePage.createReportObject();
   	 
   	 if(battlePage.isDamageValid(lastReport)) {
   		 popUpManager.show("#bs_popup_report").find("#bs_report_pop_dmg").text(lastReport.damage);
   	 }
   	 else {
   		 alert(resource.no_damage);
   	 }
   	 
   	 return false;
    };
    
    var reportEndHandler = function() {    
   	 if(confirm(resource.round_end)) {
   		 reportHandler();
   	 }
   	 
   	 return false;
    };
    
    var sendLastReport = function() {
   	 if(battlePage.sendReportObject(lastReport)) {
   		 $reportButton.css("display", "none");
   	 }
   	 
   	 popUpManager.hide();
    };
    
    function createReportDialog() {
   	 var $reportDialog = $('<div id="bs_popup_report" class="pop enemy_defeated bs_window"> \
   		 <div class="heading">   																										\
   			 <img id="bs_close_report" alt="Close window" src="http://www.erepublik.com/images/modules/pvp/close_button.png">   		\
   			 <h2>' + resource.report_title + '</h2>   																					\
   		 </div>                                                                                                                     	\
   		 <div class="content" style="margin-left: 30px">                                                                            	\
   			 <div>                                                                                                                  	\
   				 <img alt="" src="http://www.erepublik.com/images/modules/pvp/war_effort.png" class="symbol">                       	\
   				 <strong>' + resource.damage + ': </strong><big id="bs_report_pop_dmg"></big>   										\
   			 </div>                                                                                                                 	\
   		 </div>    																														\
   		 <div style="clear: both; height: 1.5em"></div>   																				\
   		 <a title="' + resource.button_send + '" href="#" id="bs_report_pop_send">' + resource.button_send + '</a>   					\
   	 </div>');
   	 
   	 $("body").append($reportDialog).append('<div id="bs_popups_mask"></div>');
   	 $("#bs_close_report").click(function() {
   		 popUpManager.hide();
   		 return false;
   	 });
   	 
   	 // Add listener this way because with jQuery the context will change and GM functions will stop working.
   	 document.getElementById("bs_report_pop_send").addEventListener("click", sendLastReport, false);
    }
    
    function createReportButtons() {
   	 // Report button on battle page
   	 $reportButton = $('<a class="bs_report_button" href="#">' + resource.report + '!</a>');
   	 $reportButton.appendTo($(".damage_aligner tr").append('<td id="bs_report_td"></td>')).bind("click", reportHandler);
   		 
   	 // Battle loading after round handling
   	 var lastButton = '<a class="bs_last_report" href="#">&lt;&lt; ' + resource.report + ' &gt;&gt;</a>';
   	 $([$("#battle_end"), $("#battle_loader")]).each(function() {
   		 $(this).append(lastButton).find(".bs_last_report").bind("click", reportEndHandler);
   	 });
    }
    
    $(document).ready(function() {
   	 createReportDialog();
   			 
   	 battlePage = new BattlePage();
   	 battlePage.initialize();
   	 popUpManager.initialize();
   		 
   	 createReportButtons();
    });

}

// ========= ADD FROM HERE ONWARDS TO YOUR SCRIPT =========
	// This auto update-notification script was made by Seifer
	// You can find it at http://userscripts.org/scripts/show/12193
	// ========================================================
	// === Edit the next four lines to suit your script. ===
	scriptName='ePT DO Report Script';
	scriptId='140024';
	scriptVersion=1.3;
	scriptUpdateText='Algumas correcções.';
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	background-color: yellow;'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	font-family: Tahoma;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 0px;'
					+'	top: 0px;'
					+'	padding: 3px 5px 3px 5px;'
					+'	border-style: outset;'
					+'	border-width: thin;'
					+'	z-index: inherit;'
					+'	background-color: #FF0000;'
					+'	color: #FFFFFF;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					document.getElementById('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					document.getElementById('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			          		document.getElementById('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
					document.getElementById('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(document.getElementById('gm_update_alert'));}, true);
			    	}
	    		}
		});
	}

