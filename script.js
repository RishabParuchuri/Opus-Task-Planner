// alert("Script working")
var assignmentText = document.getElementById('assignmentText');
var dateInput = document.querySelector('input[type="date"]');
var submitButton = document.querySelector('#submitButton');
var assignmentList = document.querySelector(".assignmentList");

submitButton.addEventListener('click', addAssignment);
assignmentList.addEventListener('click', deleteFinish);
document.addEventListener("DOMContentLoaded", getAssignments);

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
        assignmentDiv,
        checkButton,
        deleteButton,
        assignmentTitle,
        assignmentDate
    } = createElements();
    // append all the elements to their respective containers

    addElements(assignmentDiv, checkButton, deleteButton, assignmentTitle, assignmentDate);
    sortByDate();
    assignmentText.value = "";
    dateInput.value = false;
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
    var audio = new Audio('swoosh.mp3');
    audio.play();
    delete audio
    item.classList.add('fall');
    removeAssignment(item);
    item.addEventListener("transitionend", function () {
        item.remove();
    })
    return item;
}

function doneAnimation(item) {
    item = item.parentElement;
    if (item.hasAttribute("id")){
        item.removeAttribute("id");
        item.children[2].style.textDecoration = "none";

    } else{
        item.setAttribute("id", 'completed');
        item.children[2].style.textDecoration = "line-through";
        item.children[3].innerText = "COMPLETED";
        var audio = new Audio('finish-sound.mp3');
        audio.play();
        delete audio
        item.classList.add('fallDone');
        item.addEventListener("transitionend", function () {
            item.classList.remove('fallDone');
        })
    }
    return item;
}

function createElements() {
    var assignmentDiv = document.createElement("div");
    assignmentDiv.classList.add("assignment");
    // Create a list element with the assignment name
    var assignmentTitle = document.createElement("li");
    assignmentTitle.innerText = assignmentText.value;

    // Create a list element with the date 
    var assignmentDate = document.createElement("li");
    assignmentDate.classList.add("date");
    assignmentDate.innerText = "Due: " + dateFormat(dateInput.value);

    // Add items to localStorage
    let temp = new Homework(assignmentText.value, dateInput.value);
    saveLocal(temp);

    // create both the finish and delete buttons
    var checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("done-button");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("trash-button");
    return {
        assignmentDiv,
        checkButton,
        deleteButton,
        assignmentTitle,
        assignmentDate
    };
}

function addElements(assignmentDiv, checkButton, deleteButton, assignmentTitle, assignmentDate) {
    assignmentDiv.appendChild(checkButton);
    assignmentDiv.appendChild(deleteButton);
    assignmentDiv.appendChild(assignmentTitle);
    assignmentDiv.appendChild(assignmentDate);
    assignmentList.appendChild(assignmentDiv);
}

function saveLocal(assignment) {
    let assignments;
    assignments = checkLocal(assignments);
    assignments.push(assignment);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function removeAssignment(assignment) {
    let assignments;
    assignments = checkLocal(assignments);
    var assignmentIndex = assignment.children[2].innerText;
    // TODO refactor this function
    assignments.forEach(function (assignment, index) {
        if (assignment.title === assignmentIndex) {
            assignmentIndex = index;
        }
    });
    assignments.splice(assignmentIndex, 1);
    localStorage.setItem("assignments", JSON.stringify(assignments));
}

function getAssignments() {
    var divClear = document.getElementsByClassName("assignmentList")[0];
    divClear.innerHTML = "";
    let assignments;
    assignments = checkLocal(assignments);
    assignments.forEach(function (assignment) {
        var assignmentDiv = document.createElement("div");
        assignmentDiv.classList.add("assignment");
        // Create a list element with the assignment name
        var assignmentTitle = document.createElement("li");
        assignmentTitle.innerText = assignment.title;

        // Create a list element with the date 
        var assignmentDate = document.createElement("li");
        assignmentDate.classList.add("date");
        assignmentDate.innerText = "Due: " + dateFormat(assignment.date);

        // create both the finish and delete buttons
        var checkButton = document.createElement("button");
        checkButton.innerHTML = "<i class='fas fa-check'></i>";
        checkButton.classList.add("done-button");
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-times'></i>";
        deleteButton.classList.add("trash-button");
        addElements(assignmentDiv, checkButton, deleteButton, assignmentTitle, assignmentDate);
    });
}

function checkLocal(assignments) {
    if (localStorage.getItem("assignments") === null) {
        assignments = [];
    } else {
        assignments = JSON.parse(localStorage.getItem("assignments"));
    }
    return assignments;
}

function sortByDate() {
    let assignments;
    assignments = checkLocal(assignments);
    assignments.sort(function (x, y) {
        if (x.date < y.date) {
            return -1;
        }
        if (x.date > y.date) {
            return 1;
        }
        return 0;
    });
    localStorage.setItem("assignments", JSON.stringify(assignments));
    getAssignments();
}

function dateFormat(date) {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var output = "";
    if (date.slice(8) === "01" || date.slice(8) === "21" || date.slice(8) === "31") {
        if (date.slice(8, 9) === "0") {
            output = output.concat(date.slice(9))
        } else {
            output = output.concat(date.slice(8))
        }
        output = output.concat("st ")
    } else if (date.slice(8) === "02" || date.slice(8) === "22") {
        if (date.slice(8, 9) === "0") {
            output = output.concat(date.slice(9))
        } else {
            output = output.concat(date.slice(8))
        }
        output = output.concat("nd ")
    } else if (date.slice(8) === "03" || date.slice(8) === "23") {
        if (date.slice(8, 9) === "0") {
            output = output.concat(date.slice(9))
        } else {
            output = output.concat(date.slice(8))
        }
        output = output.concat("rd ")
    } else {
        if (date.slice(8, 9) === "0") {
            output = output.concat(date.slice(9))
        } else {
            output = output.concat(date.slice(8))
        }
        output = output.concat("th ")
    }
    output = output.concat(months[parseInt(date.slice(5, 7)) - 1]);
    output = output.concat(", ")
    output = output.concat(date.slice(0, 4));
    return output;
}