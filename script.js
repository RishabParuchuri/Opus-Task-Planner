// alert("Script working")
var assignmentText = document.getElementById('assignmentText');
var dateInput = document.querySelector('input[type="date"]');
var submitButton = document.querySelector('#submitButton');
var assigmentList = document.querySelector(".assignmentList");

submitButton.addEventListener('click', addAssignment)

function addAssignment(event) {
    event.preventDefault();
// Stop page from refreshing an create div that contains the assignment
    var assigmentDiv = document.createElement("div");
    assigmentDiv.classList.add("assignment");
// Create a list element with the assigment name
    var assigmentTitle = document.createElement("li");
    assigmentTitle.innerText = "hey";
// Create a list element with the date 
    var assigmentDate = document.createElement("li");
    assigmentDate.classList.add("date");
    assigmentDate.innerText = "20th August";
// create both the finish and delete buttons
    var checkButton = document.createElement("button");
    checkButton.innerHTML = "<i class='fas fa-check'></i>";
    checkButton.classList.add("done-button");

    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-times'></i>";
    deleteButton.classList.add("trash-button");
// append all the elements to their respective containers
    assigmentDiv.appendChild(checkButton);
    assigmentDiv.appendChild(deleteButton);
    assigmentDiv.appendChild(assigmentTitle);
    assigmentDiv.appendChild(assigmentDate);
    assigmentList.appendChild(assigmentDiv);

}

