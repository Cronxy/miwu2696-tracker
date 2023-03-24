const form = document.getElementById("taskform");
const tasklistElem = document.querySelector("#tasklist");


var taskList = [];

function displayTask(task){
  let item = document.createElement('li');
  item.setAttribute('data-id', task.id);
  item.innerHTML = `<p> ${task.name} </p>`;
  tasklistElem.appendChild(item);
  form.reset();

  let delButton = document.createElement('button');
  let delButtonText = document.createTextNode('Delete');
  delButton.appendChild(delButtonText);
  item.appendChild(delButton);

  delButton.addEventListener('click', function(event){
    item.remove();
    taskList.forEach(function(taskArrayElement, taskArrayIndex){
    if (taskArrayElement.id == item.getAttribute('data-id')) {
        taskList.splice(taskArrayIndex, 1)
      }
    })
    console.log(taskList);

  })
}

// Call the function with test values for the input paramaters
function addTask(name, type, rate, time, client){
  let task = {
  name:name,
  type:type,
  id: Date.now(),
  date:new Date().toISOString(),
  rate: rate,
  time: time,
  client: client
  }
taskList.push(task);
displayTask(task);
}

// Log the array to the console.
addTask("Store page design", "Wireframe", 120, 12, "Google");
console.log(taskList)

// Week 4 eventListener 
form.addEventListener("submit", function(event) {
  event.preventDefault();
  // handle the event here
  
  console.log(form.elements.taskName.value);
  addTask(
    form.elements.taskName.value,
    form.elements.taskType.value,
    form.elements.taskRate.value,
    form.elements.taskTime.value,
    form.elements.taskClient.value,
  )
  console.log(taskList);
})