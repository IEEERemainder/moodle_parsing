function save(filename, data) {
    const blob = new Blob([data], {type: 'text/csv'});
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
    }
}
function zip(a, b) { 
    return a.map(function(e, i) {
        return [e, b[i]];
    });
}

function matchFn(el) {
    var options = Array.from(el.querySelectorAll(".text"), x => x.innerText);
    var answers = Array.from(el.querySelectorAll(".answer option[selected]"), x => x.innerText);
    return zip(options, answers);
}

var byTypes = {"multichoice" : function (el) {
    return Array.from(el.querySelectorAll(".answer > div"), function (x) {
        return {
            "option" : x.querySelector(".d-flex").innerText,
            "checed" : x.querySelector("input").checked && x.classList.contains("correct")
        }; 
    });
}, "match" : matchFn, "shortanswer" : function (el) {
    return el.querySelector(".answer input").value;
}, "truefalse" : function (el) {
    return el.querySelector(".answer input[checked]").nextSibling.innerText;
}, "ddmatch" : matchFn};

var statuses = ["correct", "incorrect", "partiallycorrect"];
var dc = "deferredfeedback";
var questions = document.querySelectorAll(".que");
var result = [];

for (var question of questions) {
    if (question.childElementCount == 0) continue;
    var text = question.querySelector(".qtext").innerText;
    var classes = Array.from(question.classList);
    var type = classes.find(x => x != "que" && x != dc && !statuses.includes(x));
    var status = classes.find(x => statuses.includes(x));
    var data = byTypes[type](question);
    result.push({"text" : text, "status" : status, "data" : data});
}

save("moodle.json", JSON.stringify(result));