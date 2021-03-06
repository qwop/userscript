// ==UserScript==
// @name       easyRetweet
// @namespace  http://ooops.tk/
// @version    1.0.2
// @description  make retweet easily.
// @match      https://twitter.com/*
// @require   http://code.jquery.com/jquery.min.js
// @copyright  free use and modify.
// ==/UserScript==

(function($) {
  var enabled = "easy-retweet-enabled", script = null;
  var escapeQuotes = function(str) { return str.replace(/['"]/g, "\\$&"); };
  $("#page-container").delegate(".tweet", "mouseover", function() {
    if (!$(this).attr(enabled)) {
      $(this).attr(enabled, "true");
      var replyAction = $(this).find(".action-reply-container").first(); // guard against embedded copy ("permalink-tweet" vs "original-tweet") on individual tweet page
      var easyRetweetAction = replyAction.clone();
      var link = easyRetweetAction.find(".js-action-reply");
      link.removeClass("js-action-reply");
      link.removeAttr("data-modal");
      var label = "RT";
      link.attr("title", label);
      link.find("b").html(label);
      link.find("i").attr("class", "sm-rt");
      $(this).find('.action-rt-container').after(easyRetweetAction);

      link.click(function(event) {
        var tweet = $(this).closest(".tweet");
        var text = tweet.find(".js-tweet-text").first(); // guard as above
        text.find("a").each(function(index) {
          $(this).html($(this).data("expanded-url"));
        });
        var title = "Easy Retweet";
        var tweetcontent = " RT @" + tweet.data("screen-name") + ": " + text.text().trim();
        var dialog = $("#global-tweet-dialog");
        // if we have the new tweet dialog, use that
        if (dialog.length) {
          $("#global-new-tweet-button").trigger("click");
          dialog.find("h3").html(title);
          dialog.find("textarea").val(tweetcontent);
          var s = document.getElementById('tweet-box-global');
          s.selectionStart = s.selectionEnd = 0;
       }
        // else use the old one
        else if ($(".twttr-dialog-wrapper").length) {
          // if we have direct access to page vars (e.g. chrome and firefox), open the dialog directly
          if (window.twttr && twttr.widget && twttr.widget.TweetDialog) {
            new twttr.widget.TweetDialog({
              basic: false,
              modal: false,
              draggable: true,
              template: {
                title: title
              },
              defaultContent: content,
              origin: "new-tweet-titlebar-button"
            }).open().focus();
          }
          // else inject a script to do it (e.g. safari)
          else {
            if (script != null) {
              script.parentNode.removeChild(script);
            }
            script = document.createElement("script");
            script.textContent = 'if (window.twttr && twttr.widget && twttr.widget.TweetDialog) { ' +
              'new twttr.widget.TweetDialog({ ' +
                'basic: false, ' +
                'modal: false, ' +
                'draggable: true, ' +
                'template: { ' +
                  'title: "' + escapeQuotes(title) + '" ' +
                '}, ' +
                'defaultContent: "' + escapeQuotes(content) + '", ' +
                'origin: "new-tweet-titlebar-button" ' +
              '}).open().focus(); ' +
            ' }';
            document.body.insertBefore(script, document.body.firstChild);
          }
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
        
    }
  });
  	$('#global-tweet-dialog').find('textarea').keydown(function(e){
		if(e.ctrlKey && e.keyCode == 13){
			e.preventDefault();
			$('#global-tweet-dialog').find('button.primary-btn').click();
		 }
    });
    
})(jQuery.noConflict(true));

