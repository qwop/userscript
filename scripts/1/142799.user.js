// ==UserScript==
// @name          Tumblr dashboard theme - asanusta-deluxe
// @namespace     http://userstyles.org
// @description	  Recommended resolution: 1920 x 1080
// @author        asanusta-deluxe
// @homepage      http://userstyles.org/styles/63727
// @include       http://www.tumblr.com*
// @run-at        document-start
// ==/UserScript==
(function() {
var css = "body {\n\n    background: url('http://25.media.tumblr.com/tumblr_m6jdidrqk91qc8uwxo1_1280.jpg') center right #000000 repeat fixed !important;\n\n  }\n\nol#posts li blockquote,\n\nbody.mceContentBody blockquote {\n\nmargin-left: 0 !important;\n\nmargin-right: 0 !important;\n\n\npadding-left: 10px !important;\n\nborder-width: 4px !important;\n\nborder-color: #000000 !important;\n\n}\n\nol#posts li blockquote blockquote,\n\nbody.mceContentBody blockquote blockquote {\n\nborder-color: #000000 !important;\n\n}\n\nol#posts li blockquote blockquote blockquote,\n\nbody.mceContentBody blockquote blockquote blockquote {\n\nborder-color: #000000 !important;\n\n}\n\nol#posts li blockquote blockquote blockquote blockquote,\n\nbody.mceContentBody blockquote blockquote blockquote blockquote {\n\nborder-color: #000000 !important;\n\n}\n\nol#posts li blockquote blockquote blockquote blockquote blockquote,\n\nbody.mceContentBody blockquote blockquote blockquote blockquote blockquote {\n\nborder-color: #000000 !important;\n\n}\n\n#dashboard_index #content {\n\n    background color: #ffffff; !important;\n\n\n  }\n\n#content {\n\n\n    background: rgba(27,0,45,0.25) !important;\n\n    -webkit-border-radius: 20px;\n\n    -moz-border-radius: 20px;\n\n    border-radius: 20px;\n\n    margin: auto;\n\n    padding: 20px 20px;\n\n  }\n\nh1 {\n\ncolor: #131313;\n\ntext-shadow: 0 0 3px #000000;\n\n}\n\n.no_posts_found, h1.dashboard_header {\n\ncolor: #000000;\n\n}\n\nimg#content_top, img#content_bottom {\n\ndisplay: none;\n\n}\n\n#right_column a#dashboard_switch_blog_menu_current #dashboard_switch_blog_arrow_current {\n\n    background: url(http://o.imm.io/Gys.png);\n\n\n  }\n\n#right_column .dashboard_nav_item {\n\n    background: url() repeat-x;\n\n    background-attachment: initial;\n\n    background-position-x: 50%;\n\n    background-position-y: 100%;\n\n    background-origin: initial;\n\n    background-clip: initial;\n\n    background-color: initial;\n\n}\n\n#right_column .dashboard_nav_item #hide_radar {\n\nbackground-image: url(http://o.imm.io/GyG.png);\n\nbackground-repeat-x: no-repeat;\n\nbackground-repeat-y: repeat;\n\nbackground-attachment: initial;\n\nbackground-position-x: 0%;\n\nbackground-position-y: 0%;\n\nbackground-origin: initial;\n\nbackground-clip: initial;\n\nbackground-color: #131313;\n\n}\n\n#right_column .dashboard_nav_item .dashboard_controls_radar_media.photo, #right_column .dashboard_nav_item .dashboard_controls_radar_media.photoset, #right_column .dashboard_nav_item .dashboard_controls_radar_media.video {\n\nbackground: rgba(0,0,0,0.0);\n\n}\n\n#nav .nav_item.active {\n\n    background: rgba(00,0,0,0.5) !important;\n\n  }\n\n#nav .nav_item .nav_item_nipple .nav_item_nipple_pixel {\n\n    background: rgba(00,0,0,0.5) !important;\n\n  }\n\nol#posts li.notification.alt {\n\n    background-color: rgba(0,0,0,0.5);\n\n}\n\nol#posts li.notification.first_notification {\n\n    background-color: rgba(0,0,0,0.5);\n\n}\n\nol#posts li.notification {\n\n    background-color: rgba(0,0,0,0.5);\n\n    border-bottom: 1px solid #000000;\n\n}\n\nol#posts li.notification.last_notification {\n\n    border-bottom: 1px solid #000000;\n\n}\n\nol#posts li.post .permalink {\n\n    background: rgba(00,0,0,0.5);\n\n}\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs {\n\nbackground: rgba(0,0,0,0.8);\n\nborder: solid #000000;\n\n}\n\nol#posts li.post .post_avatar{\n\nborder-bottom: 0px solid #000000;\n\n}\n\n#right_column .dashboard_nav_item #dashboard_controls_suggested_blogs .dashboard_controls_suggested_blog {\n\nborder-top: 1px solid #000000;\n\nborder-bottom: 1px solid #000000;\n\n}\n\n#right_column a#dashboard_switch_blog_menu_current:hover {\n\nbackground: url(http://o.imm.io/Gzl.png);\n\n}\n\n#right_column a#dashboard_switch_blog_menu_current:hover #dashboard_switch_blog_arrow_current {\n\nbackground: url(http://o.imm.io/Gzm.png);\n\n}\n\nform.dashboard_options_form {\n\nbackground-color: rgba(0,0,0,0.0);\n\nborder-bottom: 1px solid #000000;\n\nborder-bottom-left-radius: 10px 10px;\n\nborder-bottom-left-radius: 10px 10px;\n\nborder-bottom-right-radius: 10px 10px;\n\nborder-bottom-right-radius: 10px 10px;\n\nborder-top-left-radius: 10px 10px;\n\nborder-top-left-radius: 10px 10px;\n\nborder-top-right-radius: 10px 10px;\n\nborder-top-right-radius: 10px 10px;\n\ncolor: #000000;\n\ndisplay: block;\n\nfont-size: 13px;\n\nmargin-bottom: 25px;\n\npadding: 15px 22px;\n\n}\n\nform.dashboard_options_form .option_container {\n\nborder-top: 1px solid #000000;\n\n}\n\n.no_posts_found, h1.dashboard_header {\n\ncolor: #131313;\n\n}\n\n#logo {height: 0 !important;\n        width: 0 !important;\n	padding-left: 240px !important;\n	padding-top: 70px !important;\n        margin-top: 6px !important; \n	background: url(http://i.imgur.com/dy0WI.png) no-repeat !important;}\n\n.new_post_label .new_post_label_icon {\n\n\nbackground-image: url('http://i.imgur.com/Xw70k.png') !important;\nbackground-repeat: no-repeat;\nposition: absolute;\ndisplay: block;\nwidth: 76px;\nheight: 90px;\ntop: 5px !important;\nleft: 0px !important;\n}\n\n#return_to_top .return_to_top_icon{\n\nbackground: url('http://i.imgur.com/jrXHC.png') no-repeat transparent!important}\n\n.selection_nipple.white,.selection_nipple:not([class=\"selection_nipple white\"]){background-image:url(\"http://i.imgur.com/BbX4E.png\")!important;background-repeat:no-repeat!important;width:23px!important;height:77px!important;margin-top:-12px!important}.selection_nipple.white{background-position:0 0!important;width:35px!important;height:35px!important}.selection_nipple:not([class=\"selection_nipple white\"]){border-bottom:solid 11px rgba(0,0,0,0)!important}#inbox_button.tab.iconic.selected .selection_nipple:not([class=\"selection_nipple white\"]){margin-left:-10px!important}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();