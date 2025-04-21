$(document).ready(function () {
    let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    }
  
    function renderTasks() {
      $("#taskList").empty();
      taskList.forEach((task, index) => {
        $("#taskList").append(`
          <li class="list-group-item">
            <span class="task-text" data-index="${index}">${task}</span>
            <div class="task-buttons">
              <button class="btn btn-sm btn-warning edit-btn" data-index="${index}">Edit</button>
              <button class="btn btn-sm btn-danger delete-btn" data-index="${index}">Delete</button>
            </div>
          </li>
        `);
      });
    }
  
    // Add task
    $("#addTaskBtn").click(function () {
      let task = $("#taskInput").val().trim();
      if (task) {
        taskList.push(task);
        saveTasks();
        renderTasks();
        $("#taskInput").val('');
      }
    });
  
    // Delete task
    $("#taskList").on("click", ".delete-btn", function () {
      let index = $(this).data("index");
      taskList.splice(index, 1);
      saveTasks();
      renderTasks();
    });
  
    // Edit task
    $("#taskList").on("click", ".edit-btn", function () {
      let index = $(this).data("index");
      let currentTask = taskList[index];
      let newTask = prompt("Edit task:", currentTask);
      if (newTask !== null && newTask.trim() !== "") {
        taskList[index] = newTask.trim();
        saveTasks();
        renderTasks();
      }
    });
  
    // Initial render
    renderTasks();
  });
  