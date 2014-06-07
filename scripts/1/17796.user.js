// ==UserScript==
// @include       https://*.fogbugz.com/*
// ==/UserScript==

// IMPORTANT: set the @include to your FogBugz url

// Based on a script for FogBugz 6 written by Samuel Neff of Atellislabs. 
// His script can be found at http://userscripts.org/scripts/show/14968
// I've altered that script to work with FogBugz5 and to set the tab label
// to start with the case #, so you can quickly tell which tab is which.
// Al N, December 2007


    var xpath = "/html/body[@id='www-fogcreek-com-fogbugz']/div[@id='mainArea']/div[@id='pgListContainer']/p";

    var container = document.evaluate(xpath,
                document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    // Add new Tabs button at top and bottom of case list
    	

    
    // top    	
    if (document.getElementById('groupTitle_1') || document.getElementById('groupTitle_All') ) {
    	var groupTitleElem;

        if (document.getElementById('groupTitle_1')) {    	
            groupTitleElem = document.getElementById('groupTitle_1');
        }
        else if (document.getElementById('groupTitle_All')) {
            groupTitleElem = document.getElementById('groupTitle_All');
        }        	
        
        // left this code here as it seems this was the top id once
        // if (document.getElementById('groupTitle_prototype')) {    	
        // groupTitleElem = document.getElementById('groupTitle_prototype');
        //}

        var groupTdElem = groupTitleElem.getElementsByTagName('td')[0];
        var tabs2 = tabs.cloneNode(true);
        var tabTd = document.createElement('td');
        tabTd.setAttribute('colspan','2');
        tabTd.appendChild(tabs2);
        groupTitleElem.insertBefore(tabTd, groupTitleElem.firstChild);
        tabs2.addEventListener("click", fogBugzOpenInTabs, false);        
    }
    
    
    } else if (document.getElementById('idAndTitleView')) {
    	
    // make the case # the first text in each tab title
    var caseTitlePattern = /FogBugz\s(\d+)/;
    var fogbugzTitle = document.title;
    if (caseTitlePattern.test(fogbugzTitle)) {
        document.title = fogbugzTitle + ' FogBugz';


    } else { 
	    return;
    } 

        