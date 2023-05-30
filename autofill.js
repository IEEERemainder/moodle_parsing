// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        Specify URL pattern here
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @require      file:///E:/resultGIA.js
// ==/UserScript==

(function() {
    'use strict';
	
function matchFn(el, data) {
	for (var row of el.querySelector(".answer").children[0].children) {
        for (var d of data["data"]) { 
                if (row.children[0].innerText == d[0]) {
					Array.from(row.children[1].children[1].children).find(x => x.innerText == d[1]).selected=true;
				}
        }
    }
}
function multichoiceFn(el, data) {
    for (var row of el.querySelector(".answer").children) {
        for (var d of data["data"]) { 
            if (processText(row.querySelector("div").innerText) == processText(d["option"])) {
                row.querySelector("input[type='checkbox'], input[type='radio']").checked = d["checed"];
            }
        }
    }
}
function shortanswerFn(el, data) {
	el.querySelector("input[type='text']").value = data["data"];
}
function truefalseFn(el, data) {
	el.querySelector(`input[id*='answer${data['data']}']`).checked = true;
}
    
function processText(x) {
    if (/^(\d|\w)\./.exec(x))
        return x.substr(2);
    return x;
}

var byTypes = {"multichoice" : multichoiceFn, "match" : matchFn, "shortanswer" : shortanswerFn, "truefalse" : truefalseFn, "ddmatch" : matchFn};

var data = getData();
var questions = document.querySelectorAll(".que");
var dc = ["deferredfeedback", "notyetanswered"];

for (var question of questions) {
    if (question.childElementCount == 0) continue;
    var text = question.querySelector(".qtext").innerText;
    var classes = Array.from(question.classList);
    var type = classes.find(x => x != "que" && !dc.includes(x));
    var fromDb = data.find(x => text == x['text'] && x['status'] == 'correct');
    if (fromDb != undefined) {
		console.log("found " + text);
		byTypes[type](question, fromDb);
    }
    console.log([text, type]);
}

})();