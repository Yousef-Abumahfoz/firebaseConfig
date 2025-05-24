const firebaseConfig = {
      databaseURL: "https://fir-config-210b0-default-rtdb.firebaseio.com/",
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    const tasksRef = db.ref("tasks");

    const tasksList = document.getElementById("tasksList");

    function addTask() {
      const taskInput = document.getElementById("taskInput");
      const taskContent = taskInput.value.trim();

      if (taskContent === "") {
        alert("Please enter a task.");
        return;
      }

      const newTaskRef = tasksRef.push(); 
      newTaskRef.set({ content: taskContent });
      taskInput.value = "";
    }

    tasksRef.on("value", snapshot => {
      const tasks = snapshot.val();
      tasksList.innerHTML = "";

      if (tasks) {
        Object.entries(tasks).forEach(([key, task]) => {
          const li = document.createElement("li");
          li.textContent = task.content + " ";

          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "Delete";
          deleteBtn.onclick = () => deleteTask(key);

          li.appendChild(deleteBtn);
          tasksList.appendChild(li);
        });
      } else {
        tasksList.innerHTML = "<li>No tasks available.</li>";
      }
    });

    // ✅ Delete Task
    function deleteTask(taskId) {
      tasksRef.child(taskId).remove();
    }