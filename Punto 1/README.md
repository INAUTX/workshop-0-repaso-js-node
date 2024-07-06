```javascript
class Task {
    constructor(id, description, completed = false) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.loadTasks();
    }

    addTask(description) {
        const id = this.tasks.length ? this.tasks[this.tasks.length - 1].id + 1 : 1;
        const task = new Task(id, description);
        this.tasks.push(task);
        this.saveTasks();
        this.renderTasks();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.renderTasks();
    }

    toggleTaskComplete(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.toggleComplete();
            this.saveTasks();
            this.renderTasks();
        }
    }

    // ----------------------------------------------------- EDIT BUTTON
    
    editTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            const newDescription = prompt('Editar descripción; ', task.description);
            if (newDescription !== null && newDescription.trim() !== '') {
                task.description = newDescription.trim();
                this.saveTasks();
                this.renderTasks();
            }
        }
    }

    // ----------------------------------------------------- EDIT BUTTON
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    loadTasks() {
        this.renderTasks();
    }

    renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        this.tasks.forEach(task => {
            const item = document.createElement('li');
            item.textContent = task.description;
            item.className = task.completed ? 'completed' : '';
            item.addEventListener('click', () => this.toggleTaskComplete(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Evitar que el evento se propague al elemento padre, ¿Por qué? Porque el evento click en el botón también se propaga al elemento li.
                this.deleteTask(task.id);
            });

            // ----------------------------------------------------- EDIT BUTTON

            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                this.editTask(task.id);
            });

            item.appendChild(editButton);
            // ----------------------------------------------------- EDIT BUTTON

            item.appendChild(deleteButton);
            taskList.appendChild(item);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const taskManager = new TaskManager();

    const addTask = () => {
        const task = document.getElementById('new-task').value;
        if (task) {
            taskManager.addTask(task);
            document.getElementById('new-task').value = '';
    };
    };

    document.getElementById('add-task').addEventListener('click', addTask);

    document.getElementById('new-task').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // document.getElementById('add-task').addEventListener('click', () => {
    //     const newTask = document.getElementById('new-task').value;
    //     if (newTask) {
    //         taskManager.addTask(newTask);
    //         document.getElementById('new-task').value = '';
    //     }
    //     console.log("Hola " + newTask);
    // });
});
```