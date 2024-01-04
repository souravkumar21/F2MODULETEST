const inputbox = document.getElementById("inputbox");
const listContainer = document.getElementById("list-container");
const img = document.querySelector(".list>img");
let count = 1;
let listCount = document.querySelector("#listcount");
let priority = document.getElementById("priority");
let completedCount = document.getElementById("comlited");
let date = document.getElementById("dueDate");
let highPriority = document.getElementById("highpriotity");
let countHigh = 1;
let highPriorityCompleted = document.getElementById("highpriotitycomplited");
let countHighCompleted = 1;

let currentFilterStatus = "all";
let currentFilterPriority = "all";

function addTask() {
    if (inputbox.value === "") {
        alert("You must write something!");
    } else {
        img.style.display = "none";
        listCount.innerText = `${count++}`;
        let li = document.createElement("li");
        li.innerHTML = `${inputbox.value} <span class="Date">Due Date ${date.value}</span>`;
        let statusSelect = document.createElement("select");
        statusSelect.innerHTML = `<option value="todo">To-do</option>
                                  <option value="inprogress">In Progress</option>
                                  <option value="done">Done</option>`;
        statusSelect.addEventListener("change", function () {
            updateStatus(this);
        });
        li.appendChild(statusSelect);

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", function () {
            editTask(li);
        });
        li.appendChild(editButton);

        let removeBtn = document.createElement("span");
        removeBtn.innerHTML = `<i class="fa-solid fa-x" onclick="removeTask(this)"></i>`;
        li.appendChild(removeBtn);

        const selectedPriority = priority.value;
        li.classList.add(selectedPriority);

        listContainer.appendChild(li);

        if (selectedPriority === "high") {
            highPriority.innerText = `${countHigh++} of ${count - 1}`;
        }
    }
    inputbox.value = "";
    updateCounts();
    filterTasks();
    saveData();
}

function updateStatus(selectElement) {
    const selectedStatus = selectElement.value;
    const listItem = selectElement.parentElement;
    listItem.className = selectedStatus;
    updateCounts();
    filterTasks();
    saveData();
}

function editTask(editButton) {
    const listItem = editButton.parentElement.parentElement;
    const taskContent = listItem.querySelector(".task-content");
    const newText = prompt("Edit task:", taskContent.querySelector(".text").textContent);

    if (newText !== null && newText !== "") {
        taskContent.querySelector(".text").textContent = newText;
        saveData();
    }
}
function removeTask(iconElement) {
    const listItem = iconElement.parentElement.parentElement;
    listItem.remove();
    updateCounts();
    filterTasks();
    saveData();
}

function updateCounts() {
    completedCount.innerText = document.querySelectorAll(".done").length;
    highPriorityCompleted.innerText = document.querySelectorAll(".done.high").length;
}

function filterTasks() {
    currentFilterStatus = document.getElementById("filterStatus").value;
    currentFilterPriority = document.getElementById("filterPriority").value;

    const allTasks = document.querySelectorAll("#list-container li");

    allTasks.forEach(task => {
        const status = task.classList.contains(currentFilterStatus) || currentFilterStatus === "all";
        const priority = task.classList.contains(currentFilterPriority) || currentFilterPriority === "all";

        if (status && priority) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

function searchTasks() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const allTasks = document.querySelectorAll("#list-container li");

    allTasks.forEach(task => {
        const taskText = task.textContent.toLowerCase();
        if (taskText.includes(searchInput)) {
            task.style.display = "list-item";
        } else {
            task.style.display = "none";
        }
    });
}

document.getElementById("filterStatus").addEventListener("change", filterTasks);
document.getElementById("filterPriority").addEventListener("change", filterTasks);
document.getElementById("searchInput").addEventListener("input", searchTasks);

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "I" && e.target.classList.contains("fa-x")) {
        removeTask(e.target);
    }
});

window.onload = function () {
    updateCounts();
};

