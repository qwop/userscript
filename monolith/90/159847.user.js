// ==UserScript==
// @name           DO RC Info
// @namespace      http://grimpow.lescigales.org/
// @author         Grimpow Corriger par Budman fev 2013
// @description    Ajoute une petite fenêtre comportant des informations relatives au combat : dépenses, ratio...
// @include        http://static.*.desert-operations.com/world*/kb/*
// @version        1.04 Bud
//	
// ==/UserScript==
var Add = document.getElementsByTagName('body')[0].firstChild.nextSibling.firstChild.nextSibling;
var Unites_Attaquant_Nom = new Array();
var Unites_Attaquant_Debut = new Array();
var Unites_Attaquant_Fin = new Array();
var Unites_Attaquant_Detruit = new Array();
var Unites_Defenseur_Nom = new Array();
var Unites_Defenseur_Debut = new Array();
var Unites_Defenseur_Fin = new Array();
var Unites_Defenseur_Detruit = new Array();
var Unites_Stats = new Array();
var Temporaire = document.getElementsByTagName('tr');
var IndiceJavaScript1 = 0;
var IndiceJavaScript2 = 0;
var Perte_Argent_Unites_Attaquant = 0;
var Perte_Argent_Unites_Defenseur = 0;
var Perte_Munition_Attaquant = 0;
var Perte_Diesel_Attaquant = 0;
var Perte_Kerosene_Attaquant = 0;
var Ratio = '';
var Ratio2 = '';

Unites_Stats['Fantassin'] = new Array(120,0, 'Kérosène', 	1, 	1); 
Unites_Stats['Antichar'] = new Array(1150,0, 'Kérosène', 	12, 	9);
Unites_Stats['Paras'] = new Array(400,0, 'Kérosène', 	8, 	5); 
Unites_Stats['Commando de marine'] = new Array(2200,1, 'Diesel', 	18, 	17);
Unites_Stats['AMX-13 DCA'] = new Array(18000,4, 'Diesel', 	50, 	20);
Unites_Stats['AMX-30'] = new Array(35000,5, 'Diesel', 	55, 	30);
Unites_Stats['Lance-missile mobile'] = new Array(65000,8, 'Diesel', 	80, 	40);
Unites_Stats['Artillerie automotrice PzH2000'] = new Array(55000,			6, 'Diesel', 	60, 	35);
Unites_Stats['Leclerc 2'] = new Array(100000,		12, 'Diesel', 	100, 	75);
Unites_Stats['M1 Abrams'] = new Array(70.000,		8, 'Diesel', 	80, 	55);
Unites_Stats['T-90'] = new Array(85000,			10, 'Diesel', 	85, 	60);
Unites_Stats['Mil MI-24 Hind'] = new Array(75000,			8, 'Kérosène', 	50, 	22);
Unites_Stats['AH-64 Apache'] = new Array(60000,			6, 'Kérosène', 	45, 	18);
Unites_Stats['A-10 Thunderbolt'] = new Array(110000,		13, 'Kérosène', 	80, 	45);
Unites_Stats['Eurofighter Typhoon'] = new Array(85000,			11, 'Kérosène', 	60, 	35);
Unites_Stats['F22 Raptor'] = new Array(90000,			11, 'Kérosène', 	70, 	35);
Unites_Stats['F117A Nighthawk'] = new Array(120000,		14, 'Kérosène', 	100, 	50);
Unites_Stats['Rockwell B1'] = new Array(250000,		20, 'Kérosène', 	200, 	60);
Unites_Stats['Northrop B2 Spirit'] = new Array(2000000,		30, 'Kérosène', 	255, 	80);
Unites_Stats['Destroyer'] = new Array(70000,			9, 'Diesel', 	100, 	30);
Unites_Stats['Frégate de 2nd rang'] = new Array(500000,		18, 'Diesel', 	150, 	60);
Unites_Stats['Corvette'] = new Array(350000,		12, 'Diesel', 	140, 	50);
Unites_Stats['Porte-avions nucléaire'] = new Array(1500000,		25, 'Kérosène', 	220, 	90);
Unites_Stats['Sous-marin d attaque'] = new Array(800000,		20, 'Diesel', 	180, 	80);
Unites_Stats['Sous-marin lanceur d engins'] = new Array(1000000,		20, 'Diesel', 	200, 	80);
Unites_Stats['Champs de barbelés'] = new Array(20000,			0, 'Kérosène', 	0, 	0); 
Unites_Stats['Bunker'] = new Array(40000,			0, 'Kérosène', 	0, 	0); 
Unites_Stats['Champs de mines'] = new Array(250000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batterie de Patriots'] = new Array(150000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Mines sous-marines'] = new Array(100000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batteries de DCA'] = new Array(100000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Batteries côtière'] = new Array(200000,		0, 'Kérosène', 	0, 	0); 
Unites_Stats['Eurocopter Tigre'] = new Array(80000,			8, 'Kérosène', 	50, 	30);
Unites_Stats['T-95 Black Eagle'] = new Array(170000,		10, 'Diesel', 	100, 	100);
Unites_Stats['B-52 Stratofortress'] = new Array(4000000,		50, 'Kérosène', 	255, 	140);
Unites_Stats['Frégate de 1er rang'] = new Array(1000000,		25, 'Diesel', 	200, 	120);
Unites_Stats['Destructeur de mines'] = new Array(45000,			6, 'Diesel', 	60, 	35);
Unites_Stats['Mil MI-28 Havoc'] = new Array(70000,			7, 'Kérosène', 	45, 	18);
Unites_Stats['Leopard 3'] = new Array(150000,		3, 'Diesel', 	100, 	40);
Unites_Stats['Grey Ghost'] = new Array(85000,		4, 'Kérosène', 70, 20);
Unites_Stats['Porte-avions Charles de Gaulle'] = new Array(2000000,		40, 'Kérosène', 250, 90);
Unites_Stats['Croiseur IOWA Classe B'] = new Array(1100000,		15, 'Diesel', 200, 100);


function DelPoint(Nombre) {
	var	End = Nombre.replace(/\./g,'');
	return End;
} function Arrondir(x, n) {
	var decalage = Math.pow(10, n);
	x *= decalage;
	x = Math.round(x);
	x /= decalage;
	return x;
} function Convert(Quantite, Type) {
	if (Quantite < Math.pow(10,3)) {
		if (Type == 'Argent') { 
			Quantite += ' $';
		} else if (Type == 'Petrole') {
			Quantite += ' Litres';
		} else {
			Quantite += ' Caisses';
		}
	} else if (Quantite < Math.pow(10,6)) {
		Quantite /= Math.pow(10,3);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' k';
	} else if (Quantite < Math.pow(10,9)) {
		Quantite /= Math.pow(10,6);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' m';
	} else if (Quantite < Math.pow(10,12)) {
		Quantite /= Math.pow(10,9);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' Md';
	} else if (Quantite < Math.pow(10,15)) {
		Quantite /= Math.pow(10,12);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' b';
	} else if (Quantite < Math.pow(10,18)) {
		Quantite /= Math.pow(10,15);
		Quantite = Arrondir(Quantite,1);
		Quantite += ' B';
	} else if (Quantite < Math.pow(10,21)) {
		Quantite /= Math.pow(10,18);
		Quantite = Arrondir(Quantite,1);
		Quantite += (Type == 'Argent') ? ' Crésus' : ' t';
	}
	return Quantite; 
} for (i = 0, c = Temporaire.length; i < c; i++) {
	if (Temporaire[i].className == 'unitsOfAttacker') {
		Unites_Attaquant_Nom[IndiceJavaScript1] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Attaquant_Debut[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Attaquant_Fin[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Attaquant_Detruit[IndiceJavaScript1] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript1++;
	} else if (Temporaire[i].className == 'unitsOfDefender') {
		Unites_Defenseur_Nom[IndiceJavaScript2] = Temporaire[i].firstChild.nextSibling.innerHTML;
		Unites_Defenseur_Debut[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Defenseur_Fin[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		Unites_Defenseur_Detruit[IndiceJavaScript2] = DelPoint(Temporaire[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML);
		IndiceJavaScript2++;
	}
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Attaquant += Unites_Attaquant_Detruit[i] * Unites_Stats[Unites_Attaquant_Nom[i]][0];	
} for (i = 0, c = Unites_Defenseur_Nom.length; i < c; i++) {
	Perte_Argent_Unites_Defenseur += Unites_Defenseur_Detruit[i] * Unites_Stats[Unites_Defenseur_Nom[i]][0];	
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	Perte_Munition_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][3];	
} for (i = 0, c = Unites_Attaquant_Nom.length; i < c; i++) {
	if (Unites_Stats[Unites_Attaquant_Nom[i]][2] == 'Diesel') {
		Perte_Diesel_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	} else {
		Perte_Kerosene_Attaquant += Unites_Attaquant_Debut[i] * Unites_Stats[Unites_Attaquant_Nom[i]][1];	
	}
}
var Ratio_Attaquant = Perte_Diesel_Attaquant * 600 + Perte_Kerosene_Attaquant * 600 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant;
var Ratio_Defenseur = Perte_Argent_Unites_Defenseur;
if ((Ratio_Attaquant > Ratio_Defenseur) && Ratio_Defenseur != 0) {
	Ratio = Arrondir(Ratio_Attaquant / Ratio_Defenseur, 1) + ':1';	
} else if (Ratio_Attaquant != 0 && Ratio_Defenseur != 0) {
	Ratio = '1:' +Arrondir(Ratio_Defenseur / Ratio_Attaquant, 1);	
} else {
	Ratio = '-';
} if ((Perte_Argent_Unites_Attaquant > Perte_Argent_Unites_Defenseur) && Perte_Argent_Unites_Defenseur != 0) {
	Ratio2 = Arrondir(Perte_Argent_Unites_Attaquant / Perte_Argent_Unites_Defenseur, 1) + ':1';	
} else if (Perte_Argent_Unites_Attaquant != 0 && Perte_Argent_Unites_Defenseur != 0) {
	Ratio2 = '1:' +Arrondir(Perte_Argent_Unites_Defenseur / Perte_Argent_Unites_Attaquant, 1);	
} else {
	Ratio2 = '-';
}
Add.innerHTML += '<tr><div align="center"><table><tr><th>Attaquant</th><th>Défenseur</th></tr><tr><th colspan="2">Pertes Unités en $</tr>'
	+ '<tr><td>' + Convert(Perte_Argent_Unites_Attaquant, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Munitions</th></tr>'
	+ '<tr><td>' + Convert(Perte_Munition_Attaquant, 'Munition') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Prix des Munitions en $</th></tr>'
	+ '<tr><td>' + Convert(Perte_Munition_Attaquant * 8.4, 'Argent') + '</td><td></td></tr>'
	+ '<tr><th colspan="2">Pétrole</th></tr>'
	+ '<tr><td>Diesel : ' + Convert(Perte_Diesel_Attaquant, 'Petrole') + '</td></tr>'
	+ '<tr><td>Kérosène : ' + Convert(Perte_Kerosene_Attaquant, 'Petrole') + '</td></tr>'
	+ '<tr><th colspan="2">Prix du Pétrole en $</th></tr>'
	+ '<tr><td>Diesel : ' + Convert(Perte_Diesel_Attaquant * 6002, 'Argent') + '</td></tr>'
	+ '<tr><td>Kérosène : ' + Convert(Perte_Kerosene_Attaquant * 12003, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Dépenses Totales :</th></tr>'
	+ '<tr><td>' + Convert(Perte_Diesel_Attaquant * 6002 + Perte_Kerosene_Attaquant * 12003 + Perte_Munition_Attaquant * 8.4 + Perte_Argent_Unites_Attaquant, 'Argent') + '</td><td>' + Convert(Perte_Argent_Unites_Defenseur, 'Argent') + '</td></tr>'
	+ '<tr><th colspan="2">Ratio</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio2 + '</td></tr>'
	+ '<tr><th colspan="2">Ratio (Pétrole & Munitions inclu)</th></tr>'
	+ '<tr><td colspan="2" style="text-align:center">' + Ratio + '</td></tr>'
	+ '</table></div></tr>';