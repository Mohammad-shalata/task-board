var today = new Date();
//the date of current day manipulate to enter to date input on html
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
if (String((today.getMonth() + 1)).length == 1) {
    date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
    if ((String(today.getDate())).length == 1) {
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
    }
}
if ((String(today.getDate())).length == 1) {
    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-0' + today.getDate();
    if (String((today.getMonth() + 1)).length == 1) {
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-0' + today.getDate();
    }
}

if (String(today.getMinutes()).length == 1) {
    var time = today.getHours() + ":0" + today.getMinutes();
} else {
    var time = today.getHours() + ":" + today.getMinutes();
}

codeOfNote = "";
allnotes = "";
noteNumber = 0;
id = null;
opacityin = 0;
opacityout = 1;
pickedNote = null;
NoteArrey = [];
check = false;
dateEnterded = "";
timeEnterded = "";
esc = false;
dateEnterdedToCompare = 0;


note = {
    InputOfNote: "",
    dateOfNote: "",
    timeOfNote: "",
    secondsComp: "",
    noteNum: 0,
}

//check if input enterded by user is correct
function checkIfInputIsCorrect() {
    currentDate = Date.now();
    check = true;
    dateEnterded = dateIn.value ;
    timeEnterded = timeIn.value;
    dateEnterdedToCompare = Date.parse(dateEnterded);
       if (txtArea.value == "") {
        document.getElementById("alert").innerHTML = `<div  class="col-3 alert-box failure">You didn't enter any text!</div>`
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
        check = false;
    } else if (dateIn.value == "") {
        document.getElementById("alert").innerHTML = `<div  class="col-3 alert-box failure">Enter date and time!</div>`
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
        check = false;
    } else if (dateEnterdedToCompare < currentDate) {
        document.getElementById("alert").innerHTML = `<div  class="col-3 alert-box failure">Your date is not correct!</div>`
        $("div.failure").fadeIn(300).delay(1500).fadeOut(400);
        check = false;
    }
    return check;
}
//enters new note into HTML
function enterNote() {
    note = {}
    if (checkIfInputIsCorrect()) {
        // create note
        note.InputOfNote = txtArea.value;
        note.dateOfNote = dateEnterded;
        note.timeOfNote = timeEnterded;
        note.noteNum = noteNumber;
        note.secondsComp = dateEnterdedToCompare;
        noteNumber++;
        NoteArrey.push(note);
        addToLocalStorage();
        printNotes(false);
    }
}

function addToLocalStorage() {
    localStorage.Notes = JSON.stringify(NoteArrey);
}

//enters current date to html inputs
function enterCurrentDateToHTML() {
    currentDate = Date.now();
    dateIn.value = date;
}

function ifLocalStorageExistPrint() {
    resetAllNotesString()
    enterCurrentDateToHTML()
    if (typeof (Storage) != "undefined") {
        NoteArrey = JSON.parse(localStorage.Notes)
        for (i = 0; i < NoteArrey.length; i++) {
            NoteArrey[i].noteNum = i
            if (NoteArrey[i].secondsComp < currentDate) {
                alert("Youre note of date: " + NoteArrey[i].dateOfNote + " " + NoteArrey[i].InputOfNote + "  Has Expired")
                NoteArrey.splice(i, 1)
                addToLocalStorage()
                ifLocalStorageExistPrint()
            } else {
                NoteArrey[i].dateOfNote.replace("", " ")
                createNote(NoteArrey[i])
                allnotes += codeOfNote
                codeOfNote = ""
            }
        }
        notes.innerHTML = allnotes
        id = document.getElementById(`notes`)
        id.style.opacity = opacityin
        inteval(true)
    }
}

function resetAllNotesString() {
    codeOfNote = ""
    allnotes = ""
}


//enters the HTML into the note for print
function createNote(note) {
    //the note
    codeOfNote = ` <div id="${note.noteNum}note" class="ml-xl-5 mr-xl-5 mt-xl-4 mb-xl-4 col-xl-2 m-lg-4 col-lg-3  m-md-5 col-md-4 m-sm-5 col-sm-6 ml-5 col-5 note">`
    //row of icons 
    codeOfNote += `<div class="mt-4 row">`
    // number of note
    codeOfNote += `<div class="mb-2 ml-2 col-10 number">${note.noteNum + 1}</div>`
    // col of icons
    codeOfNote += `<div class="p-3 m-1 col-xl-12 col-md-12">`
    // close icon 
    codeOfNote += `<span type="button" id="icon"  class="glyphicon glyphicon-remove" onclick="deleteNote(${note.noteNum})"></span>`
    // close divs for row and col of icons
    codeOfNote += `</div> </div>`
    //row of notes text area
    codeOfNote += ` <div class="p-0 m-0 md-form row">`
    // col of notes text area
    codeOfNote += ` <div class="p-0 m-0 col-xl-11 col-xl-10 col-md-11 col-sm-10 col-11">`
    //the text area (i used text area inside the note and not p)
    codeOfNote += `<textarea type="text" id="${note.noteNum}Notetextarea" class="Notetextarea" rows="5" readonly>${note.InputOfNote}</textarea>`
    //scroll bar
    codeOfNote += `<div class="scrollbar" id="style-9"> <div class="force-overflow"></div> </div>`
    // date and time
    codeOfNote += `<small id="dateAndTimeHelp" class="form-text text-muted">${note.dateOfNote}</small>`
    codeOfNote += `<small id="dateAndTimeHelp" class="form-text text-muted">${note.timeOfNote}</small>`
    //closing divs
    codeOfNote += `</div> </div> </div> </div> </div>`

}

function deleteNote(num) {
    if (confirm(`Are you sure you want do delete note number ${num + 1}?`)) {
        NoteArrey.splice(num, 1)
        addToLocalStorage()
        printNotes(true, num)
    }
}

function clearTextArea() {
    
    let txtArea = document.getElementById('txtArea');
    if (!txtArea.value || txtArea.value != txtArea.defaultValue && confirm('Are you sure?')) {
        txtArea.value = "";
    }
}

function printNotes(deleted, noteNum) {
    resetAllNotesString()
    for (i = 0; i < NoteArrey.length; i++) {
        NoteArrey[i].noteNum = i
        createNote(NoteArrey[i])
        allnotes += codeOfNote
        codeOfNote = ""
    }
    if (!deleted) {
        notes.innerHTML = allnotes
        id = document.getElementById(`${NoteArrey.length - 1}note`)
        id.style.opacity = opacityin
        inteval(true)
    } else {
        id = document.getElementById(`${noteNum}note`)
        id.style.opacity = opacityout
        inteval(false)
    }

}

function inteval(fade) {
    check = false
    if (fade == true)
        int = setInterval(fadeIn, 50);
    else
        int = setInterval(fadeOut, 50);
}

function fadeIn() {
    opacityin += 0.1
    id.style.opacity = opacityin
    if (opacityin > 1) {
        if (check == false) {
            opacityin = 0
            clearInterval(int)
            check = true
        } else {
            let killId = setTimeout(function () {
                for (let i = killId; i > 0; i--) clearInterval(i)
            }, 100);
        }

    }
}

function fadeOut() {
    opacityout -= 0.1
    id.style.opacity = opacityout
    if (opacityout < 0) {
        notes.innerHTML = allnotes
        opacityout = 1
        clearInterval(int)
    }
}