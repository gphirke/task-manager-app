
var addButton = document.getElementById("addButton");//first-button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks");//complete-tasks

(function(){
var todosList = JSON.parse(localStorage.getItem("todoTaskObject"));
  if(todosList){
    for (var i = 0; i < todosList.length; i++) {
      var listItem = createNewTaskElement(todosList[i]);
      incompleteTasksHolder.appendChild(listItem);
    }
  }
}())

function getRandomArbitrary(min = 1, max = 1000) {
    return Math.floor(Math.random() * (max - min) + min);
}

 //Add an item to a localStorage() array
function addToLocalStorageArray(name, value) {

  var existing = localStorage.getItem(name);
  existing = existing ? existing.split(',') : [];
  existing.push(value);
  localStorage.setItem(name, existing.toString());
};

function saveToLocalStorage(taskObj){
  let taskArray = Array(taskObj);
  if(!localStorage.getItem("todoTaskObject")){
    localStorage.setItem("todoTaskObject", JSON.stringify(taskArray));
  }else{
    var todosList = JSON.parse(localStorage.getItem("todoTaskObject"));
    todosList.push(taskObj);
    localStorage.setItem("todoTaskObject", JSON.stringify(todosList));
  }
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");
  //select taskListItem's children
  var checkbox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

    //bind editTask to edit button
  editButton.onclick = editTask;
    
    //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;

    //bind checkBoxEventHandler to checkbox
  checkbox.onchange = checkBoxEventHandler;
}


//New Task List Item
function createNewTaskElement(taskObj) {
 
  //Create List Item
  var listItem = document.createElement("li");

    //input (checkbox)
    var checkBox = document.createElement("input");
    // task text label
    var txtLabel = document.createElement("label");
    //status lable
    var statusLabel = document.createElement("label");

    //priority lable
    var priorityLabel = document.createElement("label");
    
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    
   
    checkBox.type = "checkbox";
    
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    txtLabel.innerText = taskObj.text;
    statusLabel.innerText = taskObj.status
    priorityLabel.innerText = taskObj.priority

    //Each elements, needs appending
    listItem.appendChild(checkBox);
    listItem.appendChild(txtLabel);
    listItem.appendChild(statusLabel);
    listItem.appendChild(priorityLabel);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

//Add a new task
function addTask() {
  console.log("Add task...");

  var taskInput = document.getElementById("new-task"); //new-task
  var status = document.getElementById("status"); //status
  var priority = document.getElementById("priority"); //priority
  var dueDate = document.getElementById("due-date"); //due-date
  var createdAt = new Date().toLocaleDateString();
  
  var taskObj = {
    id: getRandomArbitrary(), 
    priority: getRandomArbitrary(0, 3), 
    text: taskInput.value,
    status: status.value, 
    dueDate: dueDate.value, 
    createdAt: createdAt 
  };
  
  if(!taskInput.value){
    alert("Please enter task name....");
    return;
  }

  if(!status.value){
    alert("Please enter status....");
    return;
  }

  if(!dueDate.value){
    alert("Please select due date....");
    return;
  }
  
  saveToLocalStorage(taskObj);

  //Create a new list item with the text from #new-task:
  var listItem = createNewTaskElement(taskObj);
  //Append listItem to incompleteTasksHolder
  if(!taskInput.value.trim() == "") { //Reject to traverse the value from input(new task) to incompleteTasksHolder if it's empty or even white space
    incompleteTasksHolder.appendChild(listItem);
    taskInput.value = "";
  }
  else {
    taskInput.placeholder = "Type task name...";
  }

  bindTaskEvents(listItem, taskCompleted);
}

//Edit an existing task
var editTask = function() {
  

}

//Delete an existing task
var deleteTask = function() {
  console.log("Delete task...");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;

  //Remove the parent list item from the <ul>
  ul.removeChild(listItem);

  //Need to remove from localStorage
}


 //Mark a task as incomplete
var taskIncomplete = function() {
  console.log("Task incomplete...");
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}

//cycle over incompleteTasksHolder ul list items
for(var i = 0; i < incompleteTasksHolder.children.length; i++) {
  //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
}

//Mark a task as complete
var taskCompleted = function() {
  console.log("Task complete...");
  var listItem = this.parentNode; 
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}