// ==UserScript==
// @name           World Wide Wabbit
// @namespace      http://loucypher.wordpress.com/
// @description    All The Web is a Wabbit
// @include        *
// ==/UserScript==

var head = document.getElementsByTagName("head")[0];
if (!head) return;

var link = document.createElement("link");
link.setAttribute("rel", "shortcut icon");
link.setAttribute("href", "data:application/ico;base64,\
AAABAAEAICAAAAAAAACoCAAAFgAAACgAAAAgAAAAQAAAAAEACAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAACAAACAAAAAgIAAgAAAAIAAgACAgAAAwMDAAICAgAAAAP8A\
AP8AAAD//wD/AAAA/wD/AP//AAD///8AEBAQABEREQASEhIAExMTABQUFAAVFRUAFhYW\
ABcXFwAYGBgAGRkZABoaGgAbGxsAHBwcAB0dHQAeHh4AHx8fACAgIAAhISEAIiIiACMj\
IwAkJCQAJSUlACYmJgAnJycAKCgoACkpKQAqKioAKysrACwsLAAtLS0ALi4uAC8vLwAw\
MDAAMTExADIyMgAzMzMANDQ0ADU1NQA2NjYANzc3ADg4OAA5OTkAOjo6ADs7OwA8PDwA\
PT09AD4+PgA/Pz8AQEBAAEFBQQBCQkIAQ0NDAERERABFRUUARkZGAEdHRwBISEgASUlJ\
AEpKSgBLS0sATExMAE1NTQBOTk4AT09PAFBQUABRUVEAUlJSAFNTUwBUVFQAVVVVAFZW\
VgBXV1cAWFhYAFlZWQBaWloAW1tbAFxcXABdXV0AXl5eAF9fXwBgYGAAYWFhAGJiYgBj\
Y2MAZGRkAGVlZQBmZmYAZ2dnAGhoaABpaWkAampqAGtrawBsbGwAbW1tAG5ubgBvb28A\
cHBwAHFxcQBycnIAc3NzAHR0dAB1dXUAdnZ2AHd3dwB4eHgAeXl5AHp6egB7e3sAfHx8\
AH19fQB+fn4Af39/AICAgACBgYEAgoKCAIODgwCEhIQAhYWFAIaGhgCHh4cAiIiIAImJ\
iQCKiooAi4uLAIyMjACNjY0Ajo6OAI+PjwCQkJAAkZGRAJKSkgCTk5MAlJSUAJWVlQCW\
lpYAl5eXAJiYmACZmZkAmpqaAJubmwCcnJwAnZ2dAJ6engCfn58AoKCgAKGhoQCioqIA\
o6OjAKSkpAClpaUApqamAKenpwCoqKgAqampAKqqqgCrq6sArKysAK2trQCurq4Ar6+v\
ALCwsACxsbEAsrKyALOzswC0tLQAtbW1ALa2tgC3t7cAuLi4ALm5uQC6uroAu7u7ALy8\
vAC9vb0Avr6+AL+/vwDAwMAAwcHBAMLCwgDDw8MAxMTEAMXFxQDGxsYAx8fHAMjIyADJ\
yckAysrKAMvLywDMzMwAzc3NAM7OzgDPz88A0NDQANHR0QDS0tIA09PTANTU1ADV1dUA\
1tbWANfX1wDY2NgA2dnZANra2gDb29sA3NzcAN3d3QDe3t4A39/fAODg4ADh4eEA4uLi\
AOPj4wDk5OQA5eXlAObm5gDn5+cA6OjoAOnp6QDq6uoA6+vrAOzs7ADt7e0A7u7uAO/v\
7wDw8PAA8fHxAPLy8gDz8/MA9PT0APX19QD29vYA9/f3APj4+AD5+fkA+vr6APv7+wD8\
/PwA/f39AP7+/gD///8AAAAAAAAAAAAAAAAQEBAQclIQEBAQAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAGKtSmr3WikxEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAhQ/Wzg9aaqWNckIQ\
AAAAAAAAAAAAAAAAAAAAAAAAAAB6clJ6nTE5WmKltUIAAAAAAAAAAAAAAAAAAAAAAAAA\
ABAAjeeNIb3WjUIxGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAByDw/W7w8P760xAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAOZ0PDw8PDw8PD8YhAAAAAAAAAAAAAAAAAAAAAAAAUs7vDw8P\
Dw8PDw8PD1IAAAAAAAAAAAAAAAAAAAAAAGLvDw8PDw8PDw8PDw8PcgAAAAAAAAAAAAAA\
AAAAAAA55w8PDw8PDw8PDw8PDw+NAAAAAAAAAAAAAAAAAAAAAHoPDw8PDw8PDw8PDw8P\
D40AAAAAAAAAAAAAAAAAAAAAhQ8PDw8PDw8PDw8PDw8PjQAAAAAAAAAAAAAAAAAAAABa\
Dw/3jZUPDw8PDw8PDw96AAAAAAAAAAAAAAAAAAAAABC9D8YAAL0PDw8PDw8PD1IAAAAA\
AAAAAAAAAAAAAAAAACnW91Ja7w8PDw8PDw/GEAAAAAAAAAAAAAAAAAAAAAAAADHO9w8P\
Dw8PDw8P71IAAAAAAAAAAAAAAAAAAAAAAAAAABBy1u/v9w8PDw+1AAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAMXrWDw/3D+9aAAAAAAAAAAAAAAAAAAAAAAAAAAAAADFyzg8Pnb0P\
D94xAAAAAAAAAAAAAAAAAAAAAAAAADGN5w8PD8YQtQ8PD5UAAAAAAAAAAAAAAAAAAAAA\
AABi3g8PDw/eKQC9Dw8P7zEAAAAAAAAAAAAAAAAAAAAAevcPDw8PD1oAAK0PDw8PhQAA\
AAAAAAAAAAAAAAAAAHIPDw8PDw+VAAAAhQ8PDw+9GAAAAAAAAAAAAAAAAABK9w8PDw8P\
vRAAAABiDw8PD/chAAAAAAAAAAAAAAAAGMYPDw8PD9YxAAAAACkPDw8PDykAAAAAAAAA\
AAAAAACFDw8PDw/eMQAAAAAAELUPDw8PWgAAAAAAAAAAAAAAIecPDw8PxjkAAAAAAAAA\
Wg8PDw9aAAAAAAAAAAAAAABaDw8PD7UQAAAAAAAAAAAQvQ8PD2IAAAAAAAAAAAAAAJ0P\
D+96EAAAAAAAAAAAAAA57w8PegAAAAAAAAAAAAAAvQ+VMQAAAAAAAAAAAAAAAABqDw+F\
AAAAAAAAAAAAAACtQgAAAAAAAAAAAAAAAAAAAAB6D40AAAAAAAAAAAAAACEQAAAAAAAA\
AAAAAAAAAAAAAAByegAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
head.appendChild(link);

var wabbit = "\u0050\u006C\u0061\u0079\u0062\u006F\u0079" +
             "\u002E\u0063\u006F\u006D\u003a\u0020";
if (document.title.indexOf(wabbit) > -1) wabbit = "";
var docTitle = document.title == "" ? location.href : document.title;
document.title = wabbit + docTitle;

