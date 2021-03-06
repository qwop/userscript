// ==UserScript==
// @name			Facebook EMO Chat 1234
// @description		Send big Emoticons to your friends in facebook chat. And chat Like A Boss !
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			http://www.learnfacebookstepbystep.com/p/facebook-emo-chat.html
// @version			2.0
// @versionnumber	2.0
// ==/UserScript==
//


var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow, cemotsInfo, credit;

	version = 1.0;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	CImagesURL = HttpsOn?'https://fbcdn-sphotos-d-a.akamaihd.net/':'http://fbcdn-sphotos-d-a.akamaihd.net/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';


	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	function UpdateCheck() {
		if(parseInt(getValue('LastUpdate', '0')) + 86400000 <= (new Date().getTime())) {
			try {
				xmlhttpRequest( { method: 'GET',
								  url: 'http://mobotricks.info/fbapps/Addons/fbmemechat.meta.js?' + new Date().getTime(),
								  headers: {'Cache-Control': 'no-cache'} },
								  handleUpdateResponse);
			}
			catch (err) {
				alert('An error occurred while checking for updates:\n' + err);
			}
		}
	}
	
	function handleUpdateResponse(r) {
		setValue('LastUpdate', new Date().getTime() + '');
		if (r.responseText.match(/@version\s+(\d+\.\d+)/)[1] > version) {
			if(confirm(	"There's an update available for 'Facebook Chat Emoticons Bar'.\n" +
						"Your version: " + version + "\n" +
						"New version: " + r.responseText.match(/@version\s+(\d+\.\d+)/)[1] + "\n" + 
						"Do you wish to install it?")
			   ) openInTab('http://mobotricks.info/fbapps/Addons/fbmemechat.user.js');
		}
	}
	
// END

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
	
	UpdateCheck();

	cemotsInfo = [
'[[293955833972970]][[293955850639635]][[293955873972966]][[293955920639628]][[293956017306285]]\n'+
'[[293956043972949]][[293956060639614]][[293956087306278]][[293956100639610]][[293956107306276]]\n'+
'[[293956117306275]][[293956127306274]][[293956147306272]][[293956220639598]][[293956283972925]]\n'+
'[[293956303972923]][[293956327306254]][[293956350639585]][[293956370639583]][[293956450639575]]\n'+
'[[293956570639563]][[293956620639558]][[293956677306219]][[293956710639549]][[293956767306210]]', 'hphotos-ak-snc7/481121_344542732300595_656744310_n.jpg','Me Gusta',

'[[190350121060720]][[190350151060717]][[190350224394043]][[190350264394039]][[190350274394038]][[190350321060700]][[190350337727365]]\n'+
'[[190350524394013]][[190350544394011]][[190350651060667]][[190350811060651]][[190350824393983]][[190350837727315]][[190350851060647]]\n'+
'[[190351834393882]][[190351844393881]][[190354824393583]][[190354847726914]][[190354857726913]][[190356574393408]]\n'+
'[[190357747726624]][[190357764393289]][[190357774393288]][[190359411059791]][[190359441059788]][[190359467726452]]\n'+
'[[190365544392511]][[190368041058928]][[190368054392260]][[190368067725592]][[190370207725378]][[190370234392042]]\n'+
'[[190370834391982]][[190370844391981]][[190373951058337]][[190373964391669]][[190373981058334]][[190373987725000]]\n'+
'[[190374151058317]][[190374177724981]][[190374184391647]][[190374207724978]][[190374234391642]][[190374251058307]]\n'+
'[[190374704391595]][[190374731058259]][[190374761058256]][[190374781058254]][[190374787724920]][[190374814391584]]', 'hphotos-ak-ash4/488141_344542475633954_1530168575_n.jpg','Yaoming',

'[[204315512992982]][[204315529659647]][[204315549659645]][[204315562992977]][[204315579659642]][[204315589659641]]\n'+
'[[204315602992973]][[204315632992970]][[204315656326301]][[204315679659632]][[204315692992964]][[204315706326296]]\n'+
'[[204315722992961]][[204315732992960]][[204315739659626]][[204315762992957]][[204315776326289]][[204315786326288]]\n'+
'[[204315796326287]][[204315806326286]][[204315829659617]][[204315842992949]][[204315852992948]][[204315869659613]]\n'+
'[[204315879659612]][[204315899659610]][[204315909659609]][[204315939659606]][[204315959659604]][[204315999659600]]\n'+
'[[204316009659599]][[204316022992931]][[204316039659596]][[204316046326262]][[204316069659593]][[204316076326259]]', 'hphotos-ak-snc6/223870_344542782300590_1097387138_n.jpg','Jetpack guy',

'[[247756668627548]][[247756691960879]][[247756705294211]][[247756735294208]][[247756755294206]][[247756768627538]][[247756788627536]]\n'+
'[[247756798627535]][[247756821960866]][[247756835294198]][[247756851960863]][[247756865294195]][[247756885294193]][[247756898627525]]\n'+
'[[247756921960856]][[247756931960855]][[247756951960853]][[247756968627518]][[247756981960850]][[247756991960849]][[247757005294181]]\n'+
'[[247757011960847]][[247757021960846]][[247757035294178]][[247757048627510]][[247757071960841]][[247757088627506]][[247757101960838]]\n'+
'[[247757121960836]][[247757138627501]][[247757145294167]][[247757161960832]][[247757178627497]][[247757205294161]][[247757218627493]]\n'+
'[[247757245294157]][[247757261960822]][[247757281960820]][[247757298627485]][[247757315294150]][[247757328627482]][[247757338627481]]\n'+
'[[247757355294146]][[247757381960810]][[247757395294142]][[247757405294141]][[247757411960807]][[247757421960806]][[247757448627470]]', 'hphotos-ak-prn1/552112_344542448967290_918158782_n.jpg','Fuck yeah',

'[[293997730635447]][[293997767302110]][[293997777302109]][[293997787302108]][[293997790635441]]\n'+
'[[293997800635440]][[293997810635439]][[293997820635438]][[293997837302103]][[293997863968767]]\n'+
'[[293997870635433]][[293997897302097]][[293997913968762]][[293997943968759]][[293997960635424]]\n'+
'[[293997973968756]][[293998003968753]][[293998027302084]][[293998043968749]][[293998113968742]]\n'+
'[[293998137302073]][[293998150635405]][[293998163968737]][[293998197302067]][[293998213968732]]', 'hphotos-ak-ash4/295113_344542615633940_925437210_n.jpg','Cerial Guy',

'[[272123946178094]][[272123966178092]][[272123979511424]][[272123996178089]][[272124009511421]][[272124022844753]]\n'+
'[[272124042844751]][[272124049511417]][[272124062844749]][[272124082844747]][[272124096178079]][[272124112844744]]\n'+
'[[272124126178076]][[272124136178075]][[272124152844740]][[272124162844739]][[272124182844737]][[272124199511402]]\n'+
'[[272124212844734]][[272124232844732]][[272124239511398]][[272124252844730]][[272124279511394]][[272124299511392]]\n'+
'[[272124326178056]][[272124339511388]][[272124369511385]][[272124379511384]][[272124396178049]][[272124416178047]]', 'hphotos-ak-ash3/561087_344542688967266_145503862_n.jpg','Dark Stare',

'[[144040165708723]][[144040179042055]][[144040199042053]][[144040215708718]][[144040229042050]][[144040239042049]][[144040255708714]]\n'+
'[[144040272375379]][[144040302375376]][[144040312375375]][[144040332375373]][[144040342375372]][[144040355708704]][[144040385708701]]\n'+
'[[144040399042033]][[144040409042032]][[144040435708696]][[144040459042027]][[144040475708692]][[144040485708691]][[144040512375355]]\n'+
'[[144040532375353]][[144040545708685]][[144040552375351]][[144040569042016]][[144040592375347]][[144040619042011]][[144040635708676]]\n'+
'[[144040652375341]][[144040672375339]][[144040715708668]][[144040722375334]][[144040745708665]][[144040755708664]][[144040785708661]]', 'hphotos-ak-ash3/551891_344542358967299_1597161017_n.jpg','OMG whats that!!!',

'[[272154016175087]][[272154026175086]][[272154039508418]][[272154062841749]][[272154082841747]]\n'+
'[[272154092841746]][[272154102841745]][[272154122841743]][[272154132841742]][[272154149508407]]\n'+
'[[272154162841739]][[272154176175071]][[272154196175069]][[272154222841733]][[272154242841731]]\n'+
'[[272154252841730]][[272154272841728]][[272154286175060]][[272154296175059]][[272154306175058]]\n'+
'[[272154312841724]][[272154329508389]][[272154346175054]][[272154372841718]][[272154386175050]]', 'hphotos-ak-snc7/377249_344542378967297_1366399490_n.jpg','I lied!!!',

'[[272162976174191]][[272162996174189]][[272163009507521]][[272163029507519]][[272163039507518]]\n'+
'[[272163052840850]][[272163069507515]][[272163096174179]][[272163116174177]][[272163149507507]]\n'+
'[[272163162840839]][[272163169507505]][[272163189507503]][[272163199507502]][[272163209507501]]\n'+
'[[272163222840833]][[272163236174165]][[272163259507496]][[272163279507494]][[272163299507492]]\n'+
'[[272163309507491]][[272163332840822]][[272163359507486]][[272163372840818]][[272163382840817]]', 'hphotos-ak-ash3/574530_344542462300622_1526967247_n.jpg','Flip the table',

'[[272107609513061]][[272107626179726]][[272107646179724]][[272107652846390]]\n'+
'[[272107682846387]][[272107706179718]][[272107716179717]][[272107726179716]]\n'+
'[[272107736179715]][[272107752846380]][[272107769513045]][[272107782846377]]\n'+
'[[272107796179709]][[272107809513041]][[272107826179706]][[272107832846372]]\n'+
'[[272107852846370]][[272107866179702]][[272107882846367]][[272107892846366]]', 'hphotos-ak-ash3/574471_344542765633925_1746900217_n.jpg','NO',

'[[291245247589152]][[291245257589151]][[291245274255816]][[291245314255812]]\n'+
'[[291245350922475]][[291245370922473]][[291245404255803]][[291245440922466]]\n'+
'[[291245480922462]][[291245500922460]][[291245537589123]][[291245550922455]]\n'+
'[[291245580922452]][[291245587589118]][[291245597589117]][[291245607589116]][[291245620922448]]\n'+
'[[291245644255779]][[291245660922444]][[291245670922443]][[291245697589107]][[291245720922438]]', 'hphotos-ak-ash3/526160_344542682300600_1210161562_n.jpg','Fuck you!!!',

'[[221104937969051]][[221104957969049]][[221104991302379]][[221104997969045]][[221105011302377]]\n'+
'[[221105024635709]][[221105037969041]][[221105047969040]][[221105074635704]][[221105084635703]]\n'+
'[[221105101302368]][[221105117969033]][[221105147969030]][[221105157969029]][[221105177969027]]\n'+
'[[221105197969025]][[221105211302357]][[221105221302356]][[221105227969022]][[221105237969021]]\n'+
'[[221105244635687]][[221105264635685]][[221105287969016]][[221105297969015]][[221105317969013]]', 'hphotos-ak-ash3/579857_344542642300604_1393541121_n.jpg','Domo',

'[[328591050543080]][[328591137209738]][[328591290543056]][[328591367209715]]\n'+
'[[328591063876412]][[328591227209729]][[328591307209721]][[328591403876378]]\n'+
'[[328591077209744]][[328591237209728]][[328591320543053]][[328591417209710]]\n'+
'[[328591113876407]][[328591257209726]][[328591343876384]][[328591423876376]]', 'hphotos-ak-ash4/396084_345160168905518_2104256013_n.jpg','Shut Up!',

'[[292660377469481]][[292660464136139]][[292660604136125]][[292660680802784]]\n'+
'[[292660404136145]][[292660497469469]][[292660624136123]][[292660700802782]]\n'+
'[[292660427469476]][[292660570802795]][[292660647469454]][[292660730802779]]\n'+
'[[292660447469474]][[292660587469460]][[292660660802786]][[292660767469442]]', 'hphotos-ak-ash4/315053_345160142238854_113780596_n.jpg','I Love You!',


'[[328587083876810]][[328587153876803]][[328587210543464]]\n'+
'[[328587097210142]][[328587163876802]][[328587220543463]]\n'+
'[[328587107210141]][[328587177210134]][[328587230543462]]\n'+
'[[328587120543473]][[328587197210132]][[328587237210128]]', 'hphotos-ak-ash4/488153_345160155572186_754864101_n.jpg','?',

'[[291409227594596]][[291409284261257]][[291409437594575]][[291409510927901]][[291409627594556]][[291409774261208]]\n'+
'[[291409240927928]][[291409344261251]][[291409450927907]][[291409517594567]][[291409657594553]][[291409784261207]]\n'+
'[[291409264261259]][[291409364261249]][[291409460927906]][[291409540927898]][[291409684261217]][[291409817594537]]\n'+
'[[291409274261258]][[291409394261246]][[291409474261238]][[291409557594563]][[291409717594547]][[291409830927869]]\n'+
'[[291409284261257]][[291409407594578]][[291409487594570]][[291409580927894]][[291409727594546]][[291409854261200]]\n'+
'[[291409297594589]][[291409424261243]][[291409497594569]][[291409617594557]][[291409757594543]][[291409877594531]]', 'hphotos-ak-ash4/386806_344542795633922_204481604_n.jpg','Rose',

'[[100404906748312]][[100404916748311]][[100404926748310]]\n'+
'[[100404893414980]][[100408010081335]][[100408090081327]][[100408100081326]][[100408116747991]]\n'+
'[[100408126747990]][[100408133414656]][[100408083414661]][[100411426747660]][[100412290080907]][[100412476747555]]\n'+
'[[100412466747556]][[100415500080586]][[100415510080585]][[100415536747249]][[100415556747247]][[100415450080591]]\n'+
'[[100416326747170]][[100416336747169]][[100418530080283]][[100418536746949]][[100418546746948]][[100418563413613]]\n'+
'[[100419033413566]][[100419043413565]][[100419053413564]][[100419063413563]][[100419073413562]][[100419020080234]]\n'+
'[[100420313413438]][[100420326746770]][[100420343413435]][[100420356746767]]', 'hphotos-ak-snc6/251583_344542592300609_30398549_n.jpg','Happy Forever Alone',

'[[204343736323493]][[204343749656825]][[204343762990157]][[204343772990156]][[204343802990153]][[204343809656819]][[204343826323484]]\n'+
'[[204343836323483]][[204343846323482]][[204343862990147]][[204343869656813]][[204343882990145]][[204343892990144]][[204343906323476]]\n'+
'[[204343919656808]][[204343929656807]][[204343939656806]][[204343949656805]][[204343956323471]][[204343976323469]][[204343982990135]]\n'+
'[[204343996323467]][[204344009656799]][[204344022990131]][[204344032990130]][[204344042990129]][[204344049656795]][[204344059656794]]\n'+
'[[204344069656793]][[204344079656792]][[204344089656791]][[204344096323457]][[204344102990123]][[204344109656789]][[204344129656787]]', 'hphotos-ak-ash3/561052_344542702300598_103507051_n.jpg','Jackie',

];
	
credit = [
'like this page on facebook...https://www.facebook.com/Maghrebi.ourasi.marfou3/', 'hphotos-ak-snc7/304949_345160115572190_1507031876_n.jpg','send',
];
	
	
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	

		for(i=0;i<cemotsInfo.length;i+=3) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',cemotsInfo[i]);
		fEmotsDom.setAttribute('title',cemotsInfo[i+2]);
		fEmotsDom.setAttribute('src',CImagesURL + cemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}

			for(i=0;i<credit.length;i+=3) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',credit[i]);
		fEmotsDom.setAttribute('title',credit[i+2]);
		fEmotsDom.setAttribute('src',CImagesURL + credit[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}


	
	
	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);
	
	

	

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}
	
	function fixHeightAndScroll(bar) {
		fChatContainer = bar.parentNode.parentNode.parentNode;
		var oldheight = parseInt(fChatContainer.children[2].style.height.replace("px",""));
		var newheight = 285 - (fChatContainer.children[0].clientHeight + fChatContainer.children[1].clientHeight + fChatContainer.children[3].clientHeight + 1);
		fChatContainer.children[2].style.height = newheight + "px";
		fChatContainer.children[2].scrollTop += oldheight - newheight;
	}
