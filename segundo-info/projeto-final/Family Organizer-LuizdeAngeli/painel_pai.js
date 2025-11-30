document.addEventListener('DOMContentLoaded', () => {
    // Função para carregar todas as tarefas do localStorage
    function loadTasks() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    }
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    // Função para renderizar as tarefas na tela
    function renderTasks() {
        const tasks = loadTasks();
        const taskListDiv = document.getElementById('task-list');
        taskListDiv.innerHTML = ''; // Limpa a lista existente

        if (tasks.length === 0) {
            taskListDiv.innerHTML = '<p>Nenhuma tarefa cadastrada ainda.</p>';
            return;
        }

        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.style.border = '1px solid #ccc';
            taskElement.style.padding = '10px';
            taskElement.style.margin = '10px 0';
            
            taskElement.innerHTML = `
                <h3>${task.nome} (ID: ${task.id})</h3>
                <p><strong>Descrição:</strong> ${task.descricao}</p>
                <p><strong>Prazo:</strong> ${task.dataEntrega}</p>
                <p><strong>Atribuído a:</strong> ${task.atribuidoA}</p>
                <p><strong>Status:</strong> ${task.status}</p>
            `;
            taskListDiv.appendChild(taskElement);
        });
    }

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const tasks = loadTasks();

        const newId = new Date().getTime().toString(); 
        
        const newTask = {
            id: newId,
            nome: document.getElementById('task-nome').value,
            descricao: document.getElementById('task-descricao').value,
            dataEntrega: document.getElementById('task-data').value,
            atribuidoA: document.getElementById('task-atribuido').value,
            status: 'Pendente', 
            criadoPor: 'Pai (Simulado)' 
        };

        tasks.push(newTask);
        saveTasks(tasks);

        renderTasks();

        // Limpa o formulário
        event.target.reset();
        alert('Tarefa salva com sucesso!');
    });

    // Renderiza as tarefas existentes ao carregar a página
    renderTasks();
});