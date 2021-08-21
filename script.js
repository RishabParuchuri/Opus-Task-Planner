// alert("Script working")
var assignmentText = document.getElementById('assignmentText');
var dateInput = document.querySelector('input[type="date"]');
var submitButton = document.querySelector('#submitButton');
var assigmentList = document.querySelector(".assignmentList");

submitButton.addEventListener('click', addAssignment)
assigmentList.addEventListener('click', deleteFinish)

class Homework {
    constructor(title, date) {
        this.title = title;
        this.date = date;
        this.completionStatus = false;
    }
}

function addAssignment(event) {
    event.preventDefault();
    // Stop page from refreshing an create div that contains the assignment
    var {
        assigmentDiv,
        checkButton,
        deleteButton,
        assigmentTitle,
        assigmentDate
    } = createElements();
    // append all the elements to their respective containers

    addElements(assigmentDiv, checkButton, deleteButton, assigmentTitle, assigmentDate);
    // assignmentText.value = "";
    // dateInput.value = false;
}

function deleteFinish(e) {
    var item = e.target;

    if (item.classList[0] === "trash-button") {
        item = deleteAnimation(item);
    }

    if (item.classList[0] === "done-button") {
        item = doneAnimation(item);
    }
}

function deleteAnimation(item) {
    item = item.parentElement;
    playDeleteAudio();
    item.classList.add('fall');
    item.addEventListener("transitionend", function () {
        item.remove();
    })
    return item;
}

function playDeleteAudio() {
    var audio = new Audio('swoosh.mp3');
    audio.play();
    delete audio;
}

function doneAnimation(item) {
    item = item.parentElement;
    item.setAttribute("id", 'completed');
    item.children[2].style.textDecoration = "line-through";
    item.children[3].innerText = "COMPLETED";
    playAudio();
    item.classList.add('fallDone');
    item.addEventListener("transitionend", function () {
        item.classList.remove('fallDone');
    })
    return item;
}

function playAudio() {
    var audio = new Audio('finish-sound.mp3');
    audio.play();
    delete audio;
}

function createElements() {
    var assigmentDiv = document.createElement("div");
    assigmentDiv.classList.add("assignment");
    // Create a list element with the assigment name
    var assigmentTitle = document.createElement("li");
    assigmentTitle.innerText = assignmentText.value;
    // Create a list element with the date 
    var assigmentDate = document.createElement("li");
    assigmentDate.classList.add("date");
    assigmentDate.innerText = "Due: " + dateInput.value;
    // create both the finish and delete buttons
    var checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("done-button");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("trash-button");
    return {
        assigmentDiv,
        checkButton,
        deleteButton,
        assigmentTitle,
        assigmentDate
    };
}

function addElements(assigmentDiv, checkButton, deleteButton, assigmentTitle, assigmentDate) {
    assigmentDiv.appendChild(checkButton);
    assigmentDiv.appendChild(deleteButton);
    assigmentDiv.appendChild(assigmentTitle);
    assigmentDiv.appendChild(assigmentDate);
    assigmentList.appendChild(assigmentDiv);
}

function saveLocal(assigment){
    let assigments;
    if (localStorage.getItem("assignments") === null) {
        assigments = [];
    } else{
        assigments = JSON.parse(localStorage.getItem("assigments"))
    }
    assigments.push(assigment);
    localStorage.setItem("assigments", JSON.stringify(assigments))
}