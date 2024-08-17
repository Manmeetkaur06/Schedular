const taskInput = document.getElementById("task");
const priorityInput = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");
const addTaskButton = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

function addTaskToDOM({ task, priority, deadline }) {
	const taskItem = document.createElement("div");
	taskItem.classList.add("task");
	taskItem.innerHTML = `
		<p class="task-name">${task}</p>
		<p class="task-priority">Priority: ${priority}</p>
		<p class="task-deadline">Deadline: ${deadline}</p>
		<button class="mark-done">Mark Done</button>
		<button class="edit-task">Edit</button>
		<button class="delete-task">Delete</button>
	`;
	taskList.appendChild(taskItem);
}

addTaskButton.addEventListener("click", () => {
	const task = taskInput.value;
	const priority = priorityInput.value;
	const deadline = deadlineInput.value;
	if (task.trim() === "" || deadline === "") {
		alert("Both task and deadline are required.");
		return;
	}

	const selectedDate = new Date(deadline);
	const currentDate = new Date();
	if (selectedDate <= currentDate) {
		alert("The deadline must be in the future.");
		return;
	}

	addTaskToDOM({ task, priority, deadline });
	taskInput.value = "";
	priorityInput.value = "top";
	deadlineInput.value = "";
});

taskList.addEventListener("click", (event) => {
	if (event.target.classList.contains("mark-done")) {
		const taskItem = event.target.parentElement;
		taskItem.style.textDecoration = "line-through";
		event.target.nextSibling.remove(); // Remove edit button
		event.target.nextSibling.remove(); // Remove delete button
		event.target.remove(); // Remove mark done button
	} else if (event.target.classList.contains("edit-task")) {
		const taskItem = event.target.parentElement;
		taskInput.value = taskItem.querySelector('.task-name').textContent;
		priorityInput.value = taskItem.querySelector('.task-priority').textContent.split(": ")[1];
		deadlineInput.value = taskItem.querySelector('.task-deadline').textContent;
		taskItem.remove();
	} else if (event.target.classList.contains("delete-task")) {
		if (confirm("Are you sure you want to delete this task?")) {
			event.target.parentElement.remove();
		}
	}
});
