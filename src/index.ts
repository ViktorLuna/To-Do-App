import { v4 as uuidv4 } from 'uuid';

type Task = {
	id: string 
	title: string 
	completed: boolean 
	createdAt: Date
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.getElementById('new-task-form') as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>('#new-task-title');

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit", e => {
	e.preventDefault();

	if(input?.value == "" || input?.value == null) return //input?.value makes sure we have a value

	const newTask: Task = {
		id: uuidv4(),
		title: input.value,
		completed: false,
		createdAt: new Date()
	}

	tasks.push(newTask)


	addListItem(newTask)
	input.value = "";
})

function addListItem(task: Task){
	console.log('ehhhh')
	const item = document.createElement('li');
	const label = document.createElement('label');
	const checkbox = document.createElement('input');

	checkbox.addEventListener("change", () => {
		task.completed = checkbox.checked;

		if(task.completed == false){
			removeTasks();
		}
		// console.log(tasks)
		saveTasks();
	})
	
	checkbox.type = 'checkbox';
	checkbox.checked = task.completed;
	label.append(checkbox, task.title);
	item.append(label);
	list?.append(item);
}

function saveTasks() {
	localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function removeTasks() {
	const taskIndex = tasks.findIndex(task => task.id); // Find index of task to remove
	
	if (taskIndex !== -1) {
		tasks.splice(taskIndex, 1); // Remove the task at the found index
		localStorage.removeItem("TASKS"); // Clear the entire TASKS key
		saveTasks(); // Save the updated tasks list
	}
}

function loadTasks(): Task[] {
	const taskJSON = localStorage.getItem("TASKS");

	if(taskJSON == null) return []
	return JSON.parse(taskJSON)
}