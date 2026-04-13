let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// Add Task
function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, done: false });
    saveData();
    renderTasks();
    input.value = "";
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

        li.innerHTML = `
            <span onclick="toggleTask(${index})">
                ${task.done ? "✅" : "⬜"} ${task.text}
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

// Toggle Task
function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveData();
    renderTasks();
}

// Edit Task
function editTask(index) {
    let newText = prompt("Edit your task:", tasks[index].text);

    if (newText === null) return;

    newText = newText.trim();

    if (newText === "") {
        alert("Task cannot be empty!");
        return;
    }

    tasks[index].text = newText;
    saveData();
    renderTasks();
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveData();
    renderTasks();
}

// Clear All
function clearAll() {
    if (confirm("Delete all tasks?")) {
        tasks = [];
        saveData();
        renderTasks();
    }
}

// Filter
function setFilter(type) {
    filter = type;
    renderTasks();
}

// Save Data
function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Progress
function updateProgress() {
    let total = tasks.length;
    let completed = tasks.filter(t => t.done).length;

    let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    document.getElementById("progress").style.width = percent + "%";
    document.getElementById("progressText").textContent = percent + "% completed";
}

// Quotes
const quotes = [
    "Push yourself 🔥",
    "Stay consistent 💪",
    "Discipline beats motivation",
    "Small steps daily = big results",
    "You are building your future"
];

document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];

// Dark Mode
function toggleMode() {
    document.body.classList.toggle("dark");
}

// Load
renderTasks();
