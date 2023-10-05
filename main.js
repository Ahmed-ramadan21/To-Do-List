
let tasks = [

  // {
  //   "title" : "مراجعه",
  //   "date" : "10/10/2020",
  //   "time" : "10:20",
  //   "isDone": false
  
  
  // }
  // ,
  // {
  //   "title" : "تمارين",
  //   "date" : "10/10/2020",
  //   "time" : "10:20",
  //   "isDone": false
  
  
  // }
  // ,
  // {
  //   "title" : "درووس",
  //   "date" : "10/10/2020",
  //   "time" : "10:20",
  //   "isDone": false
  
  
  // }
  
  
  ]
  
  
  
  // tasks = JSON.parse(localStorage.getItem("tasks")) 
  
  
  
  
  function fillTasksOnThePage(){
  
  
  document.getElementById("tasks").innerHTML = "";
  
  let index = 0
  for( task of tasks){
  let content = `
  <div class="task ${task.isDone ? 'done' : ''}">
      <div class="info">
          <div class="name">
            <h2 class="${task.isDone ? 'done2' : ''}">${task.title}</h2>
          </div>
          <div class="time">
            <i class="fa-regular fa-clock"></i>
            <p>${task.time}</p><p id="amp"></p>
          </div>
          <div class="date">   
            <i class="fa-regular fa-calendar-days"></i>
            <p>${task.date}</p>
          </div>
      
      </div>
      <div class="buttons">
        <button onclick="deleteTask(${index})" class="btn-cer" style="background-color: brown;"><i class="fa-solid fa-trash"></i></button>
        ${task.isDone ? `
        <button onclick="notCompleteTask(${index})" class="btn-cer" style="background-color: brown;"><i class="fa-solid fa-xmark"></i></button>
        `
      :
    `
    <button onclick="completeTask(${index})" class="btn-cer" style="background-color: green;"><i class="fa-solid fa-check"></i></button>
    `}
        <button onclick="editTask(${index})" class="btn-cer" style="background-color: rgb(0, 65, 130);"><i class="fa-solid fa-pen"></i></button>
      </div>
  </div>
  `
  document.getElementById("tasks").innerHTML += content;
  index++
  
  }
  }
  fillTasksOnThePage()
  document.getElementById("add-btn").addEventListener("click", function(){
      let taskName = prompt("الرجاء ادخال عنوان المهمه" , "لعب التمارين")
      let now = new Date()
      let date = now.getDate() + "/" + (now.getMonth()+1) + "/" + now.getUTCFullYear()
      let hours =now.getHours()
      let minutes =  now.getMinutes()
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      if (hours > 12) {
        hours = hours - 12;
      }
      let time = hours + ":" + minutes;
      
      let taskObj = {
        "title": taskName,
        "date" : date,
        "time" : time,
        "isDone": false
      }
      tasks.push(taskObj)
  
      
  
  
      // storeTasks()
  
      fillTasksOnThePage()
  })
  
  
  function deleteTask(index){
    let task = tasks[index]
  let isConfirmed =  confirm(" هل انت متاكد من حذف المهمه :  " + task.title  )
  
      if (isConfirmed){
      tasks.splice(index, 1)
      // storeTasks()
      fillTasksOnThePage()
      }
  
  }
  
  
  
  function editTask(index){
    let task = tasks[index]
      let newToggle = prompt("الرجاء ادخال عنوان المهمه الجديده", task.title)
      
      task.title = newToggle
      // storeTasks()
      fillTasksOnThePage()
  
  }
  
  
  function completeTask(index){
    let task = tasks[index]
    task.isDone =true
    // storeTasks()
    fillTasksOnThePage()
  }
  function notCompleteTask(index){
    let task = tasks[index]
    task.isDone =false
    // storeTasks()
    fillTasksOnThePage()
  }
  
  
  
  
  
  // =========
  
  
  // function storeTasks(){
  
  //   let tasksString = JSON.stringify(tasks)
  //   localStorage.setItem("tasks",tasksString)
  // }