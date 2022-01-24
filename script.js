// alert("Script working")
var taskText = document.getElementById('taskText');
var dateInput = document.querySelector('input[type="date"]');
var submitButton = document.querySelector('#submitButton');
var taskList = document.querySelector(".taskList");

submitButton.addEventListener('click', addAssignment);
taskList.addEventListener('click', deleteFinish);
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
    let tasks;
    tasks = checkLocal(tasks);
    tasks.forEach(function (task) {
        if (task.title === taskText.value && dateInput.value === task.date) {
            alert("You have entered a duplicate task. Please change the name or date of the task.")
            taskText.value = "";
            dateInput.value = null;
        }
    });
    if (taskText.value != "" && dateInput.value != false) {
        // Stop page from refreshing an create div that contains the task
        var {
            taskDiv,
            checkButton,
            deleteButton,
            taskTitle,
            taskDate
        } = createElements();
        // append all the elements to their respective containers

        addElements(taskDiv, checkButton, deleteButton, taskTitle, taskDate);
        sortByDate();
        taskText.value = "";
        dateInput.value = null;
    } else {
        alert("Please fill in both the task name and task date fields.")
    }
}

function deleteFinish(e) {
    var item = e.target;

    if (item.classList[0] === "trash-button") {
        item = deleteAnimation(item);
    }

    if (item.classList[0] === "done-button") {
        item = doneAnimation(item);
    }

    if (item.classList[0] === "redo-button") {
        checkButton.removeAttribute("id")
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
    let tasks;
    tasks = checkLocal(tasks);
    if (item.hasAttribute("id")) {
        item.removeAttribute("id");
        item.children[2].style.textDecoration = "none";
        var taskIndex = item.children[2].innerText;
        item.addEventListener("transitionend", function () {
            item.children[0].innerHTML = "<i class='fas fa-check'></i>"
            item.children[0].setAttribute("id", "done-button")

        })

        // item.children[0].removeAttributeNode(item.children[0].getAttribute("id"));

        tasks.forEach(function (task) {
            if (task.title === taskIndex) {
                task.completionStatus = false;
                item.children[3].innerText = "Due: " + dateFormat(task.date);
            }
        });

    } else {
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
        item.addEventListener("transitionend", function () {
            item.children[0].innerHTML = "<i class='fas fa-arrow-left'></i>"
            item.children[0].setAttribute("id", "redo-button")
        })
        var taskIndex = item.children[2].innerText;
        tasks.forEach(function (task) {
            if (task.title === taskIndex) {
                task.completionStatus = true;
            }
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    return item;
}

function createElements() {
    var taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    // Create a list element with the task name
    var taskTitle = document.createElement("li");
    taskTitle.innerText = taskText.value;

    // Create a list element with the date 
    var taskDate = document.createElement("li");
    taskDate.classList.add("date");
    taskDate.innerText = "Due: " + dateFormat(dateInput.value);

    // Add items to localStorage
    let temp = new Homework(taskText.value, dateInput.value);
    saveLocal(temp);

    // create both the finish and delete buttons
    var checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("done-button");
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("trash-button");
    return {
        taskDiv,
        checkButton,
        deleteButton,
        taskTitle,
        taskDate
    };
}

function addElements(taskDiv, checkButton, deleteButton, taskTitle, taskDate) {
    taskDiv.appendChild(checkButton);
    taskDiv.appendChild(deleteButton);
    taskDiv.appendChild(taskTitle);
    taskDiv.appendChild(taskDate);
    taskList.appendChild(taskDiv);
}

function saveLocal(task) {
    let tasks;
    tasks = checkLocal(tasks);
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeAssignment(task) {
    let tasks;
    tasks = checkLocal(tasks);
    var taskIndex = task.children[2].innerText;
    tasks.forEach(function (task, index) {
        if (task.title === taskIndex) {
            taskIndex = index;
        }
    });
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getAssignments() {
    var divClear = document.getElementsByClassName("taskList")[0];
    divClear.innerHTML = "";
    let tasks;
    tasks = checkLocal(tasks);
    tasks.forEach(function (task) {
        var taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        // Create a list element with the task name
        var taskTitle = document.createElement("li");
        taskTitle.innerText = task.title;

        // Create a list element with the date 
        var taskDate = document.createElement("li");
        taskDate.classList.add("date");
        taskDate.innerText = "Due: " + dateFormat(task.date);

        // create both the finish and delete buttons
        var checkButton = document.createElement("button");
        if (task.completionStatus === true) {
            checkButton.innerHTML = "<i class='fas fa-arrow-left'></i>"
            checkButton.classList.add("redo-button");
            checkButton.setAttribute("id", "redo-button")
        } else {
            checkButton.innerHTML = "<i class='fas fa-check'></i>";
            checkButton.classList.add("done-button");
        }
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "<i class='fas fa-times'></i>";
        deleteButton.classList.add("trash-button");

        addElements(taskDiv, checkButton, deleteButton, taskTitle, taskDate);
        if (task.completionStatus === true) {
            taskDiv.setAttribute("id", 'completed');
            taskDiv.children[2].style.textDecoration = "line-through";
            taskDiv.children[3].innerText = "COMPLETED";
        }
    });
}

function checkLocal(tasks) {
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    return tasks;
}

function sortByDate() {
    let tasks;
    tasks = checkLocal(tasks);
    tasks.sort(function (x, y) {
        if (x.date < y.date) {
            return -1;
        }
        if (x.date > y.date) {
            return 1;
        }
        return 0;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
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