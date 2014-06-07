    // ==UserScript==
    // @name           Javascript Xat Bot
    // @namespace      DarkMonitaBot
    // @author         accfxion
    // @include        http://m.xat.com:10049/*
    // ==/UserScript==
    //DO NOT FOR ANY REASON WHAT SO EVER THINK TO COME FIND ME FOR HELP
     
    /* Script is free to use edit and modify, heck that is the point
    of this release, I have no intention to maintain the code just put
    it out so you guys can use it and modify it to fit your needs. Do
    not ask me to add stuff, DO NOT ask me HOW to do stuff, read the
    code all the basics you need are here, if you need more do it your
    self.
     
    Runs on m.xat.com not normal Xat pages.*/
     
    //////////////////
    //---SETTINGS---//
    //////////////////
    var cmdChar = "!"; //Character that starts all commands
    var BUFFER_TIME = 3;//How long to wait before parsing messages(so we don't parse old ones)
    onload=autoWelcome;
    onunload=delete FMLstories;
     
     
    AddMessB = unsafeWindow.AddMess;//don't change this is needed for overload
    var startTime = time(); //Used so we don't parse old messages
    var lastTab = 0;
     
    //Function stolen from somewhere I don't remember
    String.prototype.between = function(prefix, suffix) {
      s = this;
      var i = s.indexOf(prefix);
      if (i >= 0) {
        s = s.substring(i + prefix.length);
      }
      else {
        return '';
      }
      if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
          s = s.substring(0, i);
        }
        else {
          return '';
        }
      }
      return s;
    }
    //grabs the unix timestamp
    function time() {
        return Math.round((new Date()).getTime() / 1000);    
    }
    //Big switch for all cmd handling
    function handleCommand(cmd,argu,id) {
        words = argu.split(" ");
        switch(cmd.toLowerCase()) {
        case "say": respond(argu); break;
        case "commands": respond ("(i)Commands: !date,!info,!say [text here], and !insult [name here]"); break;
        case "info": respond ("I am a javascript bot go here http://userscripts.org/scripts/show/159798 for information! ;)"); break;
        case "date": datetime(); break;
        case "insult": insult( argu ); break;
        }
    } 
    //Overloads display function
    unsafeWindow.AddMess = function AddMess(tab, s)
    {
        curTime = time();
        last = s.between("(",")");
        if(curTime >= startTime+BUFFER_TIME) { //Don't start parsing until BUFFER_TIME s has passed
            var id = tab;
            if(tab==0) id = s.between("(",")");
            lastTab = tab;
            if(s.indexOf("<B>")>=0) {
                var msg = s.between("<B>","</B>")+" ";
                if(msg.charAt(0) == cmdChar) {
                    var cmd = msg.substring(1,msg.indexOf(" "));
                    handleCommand(cmd,msg.substring(msg.indexOf(" ")+1),id);
                }
            }
        }
        AddMessB(tab,s);
    }
function replaceBadLetters( message ) //may cause problems
{
        message = message.replace( /'/g, "" ); // remove '
        message = encodeURIComponent( message ); // fix tons of special characters
        message = message.replace( /%22/g , "" ); // remove "
        message = message.replace( /%0A/g , " " ); // remove line breaks
        message = message.replace( /%CB%83/g , "" ); // remove >
        message = message.replace( /%3C/g, "" ); // remove <
        message = message.replace( /%C2%A1/g, "" ); // replace upside-down !
        message = message.replace( /%C2%BF/g, "" ); // replace upside-down ?
        message = message.replace( /%C3%86/g, "AE" ); // replace Æ
        message = message.replace( /%C3%A6/g, "ae" ); // replace æ
        message = message.replace( /%C3%80/g, "A" ); // replace accented A
        message = message.replace( /%C3%81/g, "A" ); // replace accented A
        message = message.replace( /%C3%82/g, "A" ); // replace accented A
        message = message.replace( /%C3%83/g, "A" ); // replace accented A
        message = message.replace( /%C3%84/g, "A" ); // replace accented A
        message = message.replace( /%C3%A0/g, "a" ); // replace accented a
        message = message.replace( /%C3%A1/g, "a" ); // replace accented a
        message = message.replace( /%C3%A2/g, "a" ); // replace accented a
        message = message.replace( /%C3%A3/g, "a" ); // replace accented a
        message = message.replace( /%C3%A4/g, "a" ); // replace accented a
        message = message.replace( /%C4%87/g, "c" ); // replace accented c
        message = message.replace( /%C3%A7/g, "c" ); // replace accented c
        message = message.replace( /%C3%88/g, "E" ); // replace accented E
        message = message.replace( /%C3%89/g, "E" ); // replace accented E
        message = message.replace( /%C3%8A/g, "E" ); // replace accented E
        message = message.replace( /%C3%8B/g, "E" ); // replace accented E
        message = message.replace( /%C3%A8/g, "e" ); // replace accented e
        message = message.replace( /%C3%A9/g, "e" ); // replace accented e
        message = message.replace( /%C3%AA/g, "e" ); // replace accented e
        message = message.replace( /%C3%AB/g, "e" ); // replace accented e
        message = message.replace( /%C3%8C/g, "I" ); // replace accented I
        message = message.replace( /%C3%8D/g, "I" ); // replace accented I
        message = message.replace( /%C3%8E/g, "I" ); // replace accented I
        message = message.replace( /%C3%8F/g, "I" ); // replace accented I
        message = message.replace( /%C3%AC/g, "i" ); // replace accented i
        message = message.replace( /%C3%AD/g, "i" ); // replace accented i
        message = message.replace( /%C3%AE/g, "i" ); // replace accented i
        message = message.replace( /%C3%AF/g, "i" ); // replace accented i
        message = message.replace( /%C3%91/g, "N" ); // replace accented N
        message = message.replace( /%C3%B1/g, "n" ); // replace accented n
        message = message.replace( /%C3%91/g, "O" ); // replace accented O
        message = message.replace( /%C3%92/g, "O" ); // replace accented O
        message = message.replace( /%C3%93/g, "O" ); // replace accented O
        message = message.replace( /%C3%94/g, "O" ); // replace accented O
        message = message.replace( /%C3%95/g, "O" ); // replace accented O
        message = message.replace( /%C3%B2/g, "o" ); // replace accented o
        message = message.replace( /%C3%B3/g, "o" ); // replace accented o
        message = message.replace( /%C3%B4/g, "o" ); // replace accented o
        message = message.replace( /%C3%B5/g, "o" ); // replace accented o
        message = message.replace( /%C3%B6/g, "o" ); // replace accented o
        message = message.replace( /%C3%98/g, "OE" ); // replace Ø
        message = message.replace( /%C3%B8/g, "oe" ); // replace ø
        message = message.replace( /%C5%9B/g, "s" ); // replace accented s
        message = message.replace( /%C3%98/g, "U" ); // replace accented U
        message = message.replace( /%C3%99/g, "U" ); // replace accented U
        message = message.replace( /%C3%9A/g, "U" ); // replace accented U
        message = message.replace( /%C3%9B/g, "U" ); // replace accented U
        message = message.replace( /%C3%B9/g, "u" ); // replace accented u
        message = message.replace( /%C3%BA/g, "u" ); // replace accented u
        message = message.replace( /%C3%BB/g, "u" ); // replace accented u
        message = message.replace( /%C3%BC/g, "u" ); // replace accented u
        message = message.replace( /%C3%9C/g, "Y" ); // replace accented Y
        message = message.replace( /%C5%B8/g, "Y" ); // replace accented Y
        message = message.replace( /%C3%BD/g, "y" ); // replace accented y
        message = message.replace( /%C3%BF/g, "y" ); // replace accented y
        message = message.replace( /%C5%BE/g, "z" ); // replace accented z
        return message;
}
 
    //Simply sends a message to main chat
    function sendMessage(message) {
        message = replaceBadLetters(message);   //may cause problems
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?m='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);  
    }
    
    //////////////////////
    //RESPONSE FUCNTIONS//
    //////////////////////
     
    //Responds to whereever the message came from
    //in PC/PM(mobile doesn't differentiate) responds via PC
    //from main respond to main
    function respond(message) {
        if(lastTab==0) {
            sendMessage(message);    
        } else {
            sendPC(message,lastTab);
        }
    }
       
    //Simply sends a message to main chat
    function sendMessage(message) {
        xmlHttp2 = unsafeWindow.getHTTPObject();
        xmlHttp2.open('GET','/Post?m='+message,true);
        xmlHttp2.setRequestHeader("Content-Type", "text/plain");
        xmlHttp2.setRequestHeader("Connection", "close");
        xmlHttp2.send(null);        
    }
function datetime()         //date & time
{
    var currentDate = new Date()            //reset date
    var day = currentDate.getDate()         //dd
    var month = currentDate.getMonth() + 1  //mm
    var year = currentDate.getFullYear()    //yyyy
    var hr = currentDate.getHours()         //hh
    var min = currentDate.getMinutes()      //mm
    var sec = currentDate.getSeconds()      //ss
    sendMessage( "Date: " + month + "/" + day + "/" + year + " Time: " + hr + "h:" + min + "m:" + sec + "s" );
}
function insult( argu ) //I should of used var insult= [...] but I'm too lazy, by Twin, for some annoying people.
        {
                var randomNumber = Math.floor( Math.random() * 32 ) + 1;
                if( randomNumber == 1 ) sendMessage( argu + ", get the fuck out of this chatroom, faggot." );
                else if( randomNumber == 2 ) sendMessage( argu + ", would you please shut the fucking fuck up?" );
                else if( randomNumber == 3 ) sendMessage( argu + ", you are a retard." );
                else if( randomNumber == 4 ) sendMessage( argu + ", you are the worst skid I have ever seen." );
                else if( randomNumber == 5 ) sendMessage( argu + ", you are pathetic" );
                else if( randomNumber == 6 ) sendMessage( argu + ", since you have joined this room, our IQ have lowered by 3, I hope you are proud, and may God have mercy on you." );
                else if( randomNumber == 7 ) sendMessage( argu + ", even if you were twice as smart, you would still be stupid." );
                else if( randomNumber == 8 ) sendMessage( argu + ", fuck off." );
                else if( randomNumber == 9 ) sendMessage( argu + ", you are unwanted in this chat, please leave by clicking sign out." );
                else if( randomNumber == 11 ) sendMessage( argu + ", I would slap you, but that would be animal abuse." );
                else if( randomNumber == 12 ) sendMessage( argu + ", shock me, say something intelligent. " );
                else if( randomNumber == 13 ) sendMessage( argu + ", you are so fat that you download cheats for Wii Fit." );
                else if( randomNumber == 14 ) sendMessage( argu + ", you are the reason God created the middle finger." );
                else if( randomNumber == 15 ) sendMessage( argu + ", you are a cunt" );
                else if( randomNumber == 16 ) sendMessage( argu + ", yo momma is so poor, I saw her chasing the garbage truck with a shopping list." );
                else if( randomNumber == 17 ) sendMessage( argu + ", you are like a light switch, even a little kid can turn you on." );
                else if( randomNumber == 18 ) sendMessage( argu + ", you are a noob" );
                else if( randomNumber == 19 ) sendMessage( argu + ", insert insult here (redface)" );
                else if( randomNumber == 20 ) sendMessage( argu + ", nobody loves you" );
                else if( randomNumber == 21 ) sendMessage( argu + ", I could compare you to shit, but that would be an insult for the word shit." );
                else if( randomNumber == 22 ) sendMessage( argu + ", you are as smart as a plank" );
                else if( randomNumber == 23 ) sendMessage( argu + ", I hope a airplane crashes on you while you sleep." );
                else if( randomNumber == 24 ) sendMessage( argu + ", error is the only word I can use to define how nowhere you are." );
                else if( randomNumber == 25 ) sendMessage( argu + ", gtfo (d)" );
                else if( randomNumber == 26 ) sendMessage( argu + ", you are not cool :( " );
                else if( randomNumber == 27 ) sendMessage( argu + ", you are not smart." );
                else if( randomNumber == 28 ) sendMessage( argu + ", stfu please" );
                else if( randomNumber == 29 ) sendMessage( argu + ", you are a fool" );
                else if( randomNumber == 30 ) sendMessage( argu + ", I wish cancer on you and all your family." );
                else if( randomNumber == 31 ) sendMessage( argu + ", out of over 1,000,000 sperm, you were the fastest?" );
                else if( randomNumber == 32 ) sendMessage( argu + ", I would ask how old you are, but I know you cant count that high." ); 
                else if( randomNumber == 33 ) sendMessage( argu + ", your too stupid you don't even know how to use a Xat chat! ._." );
        }
function autoWelcome() {
sendMessage("Hey I am Dark Monita the chat bot here for your amusement you can type !commands for 4 of my commands that you can use for fun. Please be gentle!(redface)");
}