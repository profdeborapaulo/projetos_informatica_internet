document.addEventListener('DOMContentLoaded', () => {
    const loggedInChildName = "Filho João"; 

    function loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }

    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function toggleTaskStatus(taskId) {
        const tasks = loadTasks();
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        if (taskIndex !== -1) {
            if (tasks[taskIndex].status !== 'Concluído') {
                tasks[taskIndex].status = 'Concluído';
                alert(`Tarefa "${tasks[taskIndex].nome}" marcada como CONCLUÍDA!`);
            } else {
                tasks[taskIndex].status = 'Pendente';
                alert(`Tarefa "${tasks[taskIndex].nome}" retornada para PENDENTE.`);
            }
            saveTasks(tasks);
            renderTasks(); 
        }
    }

    function renderTasks() {
        const tasks = loadTasks();
        
        const myTasks = tasks.filter(task => task.atribuidoA === loggedInChildName);

        const pendingListDiv = document.getElementById('task-list');
        const completedListDiv = document.getElementById('completed-task-list');
        
        pendingListDiv.innerHTML = '';
        completedListDiv.innerHTML = '';

        if (myTasks.length === 0) {
            pendingListDiv.innerHTML = '<p>Você não tem tarefas atribuídas ainda. Aproveite!</p>';
            return;
        }

        myTasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.id = `task-${task.id}`;
            taskElement.style.border = '1px solid #ccc';
            taskElement.style.padding = '10px';
            taskElement.style.margin = '10px 0';
            
            taskElement.innerHTML = `
                <h3>${task.nome}</h3>
                <p><strong>Descrição:</strong> ${task.descricao}</p>
                <p><strong>Prazo:</strong> ${task.dataEntrega}</p>
                <p><strong>Status Atual:</strong> ${task.status}</p>
            `;

            if (task.status !== 'Concluído') {
                const completeButton = document.createElement('button');
                completeButton.textContent = 'Marcar como Concluída';
                completeButton.addEventListener('click', () => toggleTaskStatus(task.id));
                taskElement.appendChild(completeButton);
                
                pendingListDiv.appendChild(taskElement);
            } else {
                completedListDiv.appendChild(taskElement);
            }
        });
    }

    renderTasks();
});