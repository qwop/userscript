// ==UserScript==
// @name           Pennergame Berlin Bandenprofil v2.9 (Berlin updates by me ;))
// @namespace      11235813[Bande:Kuestenpenner]
// @description    Zeigt auch Promille an. Punktemarkierung: Gr�n= Kannste angreifen. Rot=kann dich angreifen, du ihn aber nicht.
// @include        http://berlin.pennergame.de/profil/bande:*
// ==/UserScript==
var userid1 = document.getElementsByTagName('html')[0].innerHTML.split("http://img.menelgame.pl/cache/pl_PL/avatare/");
var userid2 = userid1[1].split('_');
var userid=userid2[0];
var siglink = 'http://img.menelgame.pl/cache/signaturen/';

	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://img.menelgame.pl/dev/api/user.' + userid + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			
			var userpoints = dom.getElementsByTagName('points')[0].textContent;
			var angriffmax = Math.floor(userpoints*1.5);
			var angriffmin = Math.floor(userpoints*0.8);
			
			GM_setValue("angriffmax",angriffmax);
			GM_setValue("angriffmin",angriffmin);
			GM_setValue("userpoints",userpoints);
			
		}
					  });
var table = document.getElementsByTagName("table")[2];
var tr = table.getElementsByTagName("tr");
		


var siglink = "http://img.menelgame.pl/cache/pl_PL/signaturen/";
for (var x = 0; x <= tr.length; x++) {
	var text1 = tr[x].getElementsByTagName("td")[1].innerHTML.split('/profil/id:');
	tr[x].getElementsByTagName("td")[1].style.width = '100px';
	tr[x].style.valign = "middle";
		var id = text1[1].split('/">');
	var points =tr[x].getElementsByTagName('td')[2].textContent;
	var maxatt = Math.floor(points*1.5);
	var minatt = Math.floor(points*0.8);
	if (maxatt>=GM_getValue("userpoints") && minatt<=GM_getValue("userpoints")) {
		tr[x].getElementsByTagName('td')[2].style.color = "#DF3918"; 
		}
		if (GM_getValue("angriffmax")>points && GM_getValue("angriffmin") < points) {
		tr[x].getElementsByTagName('td')[2].style.color = "#99CC00"; 
		}
	Geldladen(id[0],x);
}




function Geldladen(id,x) {
	GM_xmlhttpRequest({
    	method: 'GET',
   	url: 'http://menelgame.pl/dev/api/user.' + id + '.xml',

        onload: function(responseDetails) {
        	var parser = new DOMParser();
        	var dom = parser.parseFromString(responseDetails.responseText, "application/xml");
			try {
        	 var cash = dom.getElementsByTagName('cash')[0].textContent;
			} catch(err) {
				var cash = -1;
			}
			var name = dom.getElementsByTagName('name')[0].textContent;
			var reg = dom.getElementsByTagName('reg_since')[0].textContent;
			var attref = 'http://menelgame.pl/fight/?to='+name;
			var newtd = document.createElement('td');
			var newtd1 =document.createElement('td');
			
			newtd1.style.width = "20px";
			var newtd5 = document.createElement('td');

			GM_xmlhttpRequest({
  	method: 'GET',
   	url: 'http://menelgame.pl/profil/id:'+id+'/',
        onload: function(responseDetails,id) {
        	var content = responseDetails.responseText;
			try {
			var online1 = content.split('Ist gerade')[1];
			var online2 = online1.split('</')[0];
			
			} catch(err) {
				var online2 ='Offline';
			}
			
			var location1 = content.split('Stadtteil</strong></td>')[1];
			var location2 = location1.split('<td bgcolor="#232323">')[1];
			var location3 = location2.split('</td>')[0];
						
			
			
			
			
			try {
				var hausi1 = content.split('<div style="float:left; margin-top:12px;"><img src="')[1];
				var hausi2 = hausi1.split('"')[0];
				
				
				
				
				
				if(hausi2 == 'http://media.menelgame.pl/img/tiere/94826.jpg')
			{
				var petname = 'Elefant';
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/25834.jpg')
			{
				var petname = 'Nashorn';
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/14896.jpg')
			{
				var petname = 'Eisb&auml;r';
			}
			else if(hausi2 =='http://media.menelgame.pl/img/tiere/12536.jpg')
			{
				var petname = '&Auml;ffchen';
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/43703.jpg')
			{
				var petname = 'Tiger';
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/73953.jpg')
			{
				var petname = 'Krokodil';
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/98962.jpg')
			{
				var petname  = "Giraffe";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/64220.jpg')
			{
				var petname  = "Nilpferd";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/90385.jpg')
			{
				var petname  = "Pferd";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/32563.jpg')
			{
				var petname  = "Chihuahua";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/62456.jpg')
			{
				var petname  = "Cockerspaniel";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/15240.jpg')
			{
				var petname  = "Pitbull";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/09051.jpg')
			{
				var petname  = "Sch&auml;ferhund";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/48263.jpg')
			{
				var petname  = "Adler";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/12758.jpg')
			{
				var petname  = "Pudel";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/62474.jpg')
			{
				var petname  = "Hausziege";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/61402.jpg')
			{
				var petname  = "Schlange";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/89386.jpg')
			{
				var petname  = "Falke";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/47838.jpg')
			{
				var petname  = "Hausschwein";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/11743.jpg')
			{
				var petname  = "Igel";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/11634.jpg')
			{
				var petname  = "Streifenhörnchen";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/66294.jpg')
			{
				var petname  = "Opossum";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/11542.jpg')
			{
				var petname  = "Möwe";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/02634.jpg')
			{
				var petname  = "Erdmännchen";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/02634.jpg')
			{
				var petname  = "Clownfisch";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/92653.jpg')
			{
				var petname  = "Rotkelchen";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/75284.jpg')
			{
				var petname  = "Grasfrosch";
			}
			else if(hausi2 == 'http://media.menelgame.pl/img/tiere/48264.jpg')
			{
				var petname  = "Silberfisch";
			} else {
				var petname = '<em>Premium</em>'
			}				
				newtd5.style.color = "#DF3918";
						
				
				
			} catch (err) {
				var petname = '<em>Deaktiviert</em>';
							}
					newtd5.innerHTML = '<div align="middle">'+petname+'</div>';
			
				if (online2 == 'Offline') {
					newtd1.innerHTML = '<div align="middle"><img src="http://kuestenpenner.ku.ohost.de/of.png></img></div>';						
					} else { 					
					newtd1.innerHTML='<div align ="middle"><img src="http://media.menelgame.pl/img/on.png></img></div>';
					}
		
			}
			});				  
			
			
			var newtd2 = document.createElement('td');
			newtd3 = document.createElement('td');
			newtd3.innerHTML='<div align="middle">';
			newtd3.innerHTML +='<a href="'+attref+'">&oplus;</a></div>';
			newtd2.innerHTML= '<div align="middle">'+reg+'</div>';
		
			
			var newtd4 = document.createElement('td');
			var pskript = '<div align="right"><div style="overflow: hidden; width: 40px; height: 15px;"><img style="position: relative; top: -40px; left: -120px;" src="' 	+ siglink + id + '.jpg"></div></div>'
			if (cash == -1) {
				var pskript = '<div align = "right" >---</div>';
			}
			newtd4.innerHTML = pskript;
			if (cash >= 15000*100){
			  newtd.style.color = "#efab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= 30000*100){
  	    newtd.style.color = "#25ab22";
				newtd.style.fontWeight = "bold";
			}
			if (cash >= 50000*100){
  	    newtd.style.color = "#ef3422";
				newtd.style.fontWeight = "bold";
			}
			if(cash.length >= 9)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-8) + "." + cash.substring(cash.length-8,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) +""+"</div>";
			}
			else if (cash.length>=6)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-5) + "." + cash.substring(cash.length-5, cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + ""+ "</div>";
			}
			else if(cash.length>2)
			{
			newtd.innerHTML = '<div align="right">&euro;' + cash.substring(0,cash.length-2) + "," + cash.substring(cash.length-2, cash.length) + "</div>";
			}
			else if(cash.length==2)
			{
			newtd.innerHTML = '<div align="right">&euro;0,' + cash + ""+ "</div>";
			}
			else if(cash== -1)
			{
			newtd.innerHTML = '<div align="right">&euro;n/a</div>';
			}
			else 
			{
			newtd.innerHTML = '<div align="right">&euro;0,0' + cash + ""+ "</div>";
			}
			
				
			tr[x].insertBefore(newtd, tr[x].getElementsByTagName('td')[4]);
			tr[x].insertBefore(newtd1, tr[x].getElementsByTagName('td')[5]);
			tr[x].insertBefore(newtd5, tr[x].getElementsByTagName('td')[6]);
			tr[x].insertBefore(newtd2, tr[x].getElementsByTagName('td')[7]);
			tr[x].insertBefore(newtd3, tr[x].getElementsByTagName('td')[8]);
			tr[x].insertBefore(newtd4, tr[x].getElementsByTagName('td')[9]);


			
		
			
		}
	});
}


//Fixed