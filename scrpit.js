let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// ENTER key support
document.getElementById("taskInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
});

// Add Task (with deadline)
function addTask() {
    let input = document.getElementById("taskInput");
    let deadlineInput = document.getElementById("deadlineInput");

    let text = input.value.trim();
    let deadline = deadlineInput.value;

    if (text === "") return;

    tasks.push({ text: text, done: false, deadline: deadline });
    saveData();
    renderTasks();

    input.value = "";
    deadlineInput.value = "";
}

// Render Tasks
function renderTasks() {
    let list = document.getElementById("taskList");
    let search = document.getElementById("searchInput").value.toLowerCase();

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        if (filter === "completed" && !task.done) return;
        if (filter === "pending" && task.done) return;
        if (!task.text.toLowerCase().includes(search)) return;

        let li = document.createElement("li");

        // Deadline logic
        let today = new Date().toISOString().split("T")[0];
        let isOverdue = task.deadline && task.deadline < today && !task.done;

        li.style.background = isOverdue ? "rgba(255,0,0,0.4)" : "";

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.done ? "✅" : "⬜"} ${task.text}
                <br>
                <small>${task.deadline ? "Due: " + task.deadline : ""}</small>
            </span>

            <div>
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateProgress();
}

// बाकी functions same (toggle, delete, etc.)

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveData();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveData();
    renderTasks();
}

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateProgress() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.done).length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("progress").style.width = percent + "%";
    document.getElementById("progressText").textContent = percent + "% completed";
}

renderTasks();
