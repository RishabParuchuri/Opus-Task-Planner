// alert("Script working")
var assignmentText = document.getElementById('assignmentText');
var dateInput = document.querySelector('input[type="date"]');
var submitButton = document.querySelector('#submitButton');
var assigmentList = document.querySelector(".assignmentList");

submitButton.addEventListener('click', addAssignment)
assigmentList.addEventListener('click', deleteFinish)

function addAssignment(event) {
    event.preventDefault();
// Stop page from refreshing an create div that contains the assignment
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
// append all the elements to their respective containers
    assigmentDiv.appendChild(checkButton);
    assigmentDiv.appendChild(deleteButton);
    assigmentDiv.appendChild(assigmentTitle);
    assigmentDiv.appendChild(assigmentDate);
    assigmentList.appendChild(assigmentDiv);
    // assignmentText.value = "";
    // dateInput.value = false;
}

function deleteFinish(e){
    var item = e.target;

    if(item.classList[0] === "trash-button"){
        item = item.parentElement;
        item.remove();
    }

    if(item.classList[0] === "done-button"){
        item = item.parentElement;
        item.setAttribute("id", 'completed');
        item.children[2].style.textDecoration = "line-through"
        item.children[3].innerText = "COMPLETED";
    }
}