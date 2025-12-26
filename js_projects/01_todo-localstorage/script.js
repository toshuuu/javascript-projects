document.addEventListener('DOMContentLoaded',()=>{
  const todoInput = document.getElementById('todo-input')
  const addTask = document.getElementById('add-task-btn')
  const todoList = document.getElementById('todo-list')

let tasks=  JSON.parse(localStorage.getItem('tasks')) ||[]  //we have to store tasks somwehre

tasks.forEach((task) => renderTask(task))

addTask.addEventListener('click',()=>{
  const taskText = todoInput.value;
  if (taskText==="") return;
  
  const newTask = {
    id:Date.now(),
    text: taskText,
    completed: false
  }


  tasks.push(newTask);
  renderTask(newTask);
  todoInput.value="";  //clear the input
  saveTask();
  
  })

  function renderTask(task){
    const li = document.createElement("li");
    li.setAttribute('data-id',task.id)
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    todoList.appendChild(li);
  
  
    li.addEventListener('click',(e)=>{
      if(e.target.tagName==="BUTTON") return;
      task.completed=!task.completed
      li.classList.toggle('completed')
      saveTask()
    })

    li.querySelector('button').addEventListener('click',(e)=>{
      e.stopPropagation() //this is imp to stop propogation
      tasks=tasks.filter((t)=> t.id!==task.id);
      li.remove();
      saveTask();

    })
  }

  function saveTask(){
    localStorage.setItem("tasks",JSON.    stringify(tasks))
  }


})