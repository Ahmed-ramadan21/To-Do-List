let tasks = [];

// Load tasks from local storage
tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function fillTasksOnThePage() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        if (task.isDone) {
            taskElement.classList.add("done");
        }

        const taskContent = `
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
            ` : `
            <button onclick="completeTask(${index})" class="btn-cer" style="background-color: green;"><i class="fa-solid fa-check"></i></button>
            `}
            <button onclick="editTask(${index})" class="btn-cer" style="background-color: rgb(0, 65, 130);"><i class="fa-solid fa-pen"></i></button>
          </div>
        `;

        taskElement.innerHTML = taskContent;
        tasksContainer.appendChild(taskElement);
    });
}

fillTasksOnThePage();

document.getElementById("add-btn").addEventListener("click", function () {
    let taskName = prompt("الرجاء إدخال عنوان المهمة", "لعب التمارين");
    if (!taskName) return; // Do nothing if the user cancels

    let now = new Date();
    let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getUTCFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    if (hours > 12) {
        hours = hours - 12;
    }
    let time = hours + ":" + minutes;

    let taskObj = {
        "title": taskName,
        "date": date,
        "time": time,
        "isDone": false
    };
    tasks.push(taskObj);

    // Save tasks in local storage
    storeTasks();

    fillTasksOnThePage();
});

function deleteTask(index) {
    let task = tasks[index];
    let isConfirmed = confirm("هل أنت متأكد من حذف المهمة: " + task.title);

    if (isConfirmed) {
        tasks.splice(index, 1);

        // Save tasks in local storage
        storeTasks();

        fillTasksOnThePage();
    }
}

function editTask(index) {
    let task = tasks[index];
    let newTitle = prompt("الرجاء إدخال عنوان المهمة الجديد", task.title);
    if (newTitle !== null) {
        task.title = newTitle;

        // Save tasks in local storage
        storeTasks();

        fillTasksOnThePage();
    }
}

function completeTask(index) {
    let task = tasks[index];
    task.isDone = true;

    // Save tasks in local storage
    storeTasks();

    fillTasksOnThePage();
}

function notCompleteTask(index) {
    let task = tasks[index];
    task.isDone = false;

    // Save tasks in local storage
    storeTasks();

    fillTasksOnThePage();
}

function storeTasks() {
    let tasksString = JSON.stringify(tasks);
    localStorage.setItem("tasks", tasksString);
}
