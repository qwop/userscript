// ==UserScript==
// @description     Clean up the home page of French newspaper Liberation.fr
// @namespace       Platypus
// @include         http://www.liberation.fr*/
// ==/UserScript==
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[2]/DIV[6]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[2]/DIV[8]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[2]/DIV[9]/TABLE[1]/TBODY[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
remove_it(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[2]/DIV[10]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);
set_style_script(window.document,document.evaluate('/HTML[1]/BODY[1]/TABLE[3]/TBODY[1]/TR[1]/TD[2]/DIV[2]/TABLE[1]/TBODY[1]/TR[3]/TD[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,"height: 300px;",null,null);
set_style_script(window.document,document.getElementById('LayerCulture'),"height: 295px;",null,null);