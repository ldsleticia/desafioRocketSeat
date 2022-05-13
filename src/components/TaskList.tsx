import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    const tarefa: Task = {
      id: Math.random(),
      title: newTaskTitle, //texto do título digitado em tela
      isComplete: false,
    };

    if (tarefa.title !== "") {
      tasks.push(tarefa);
    }

    setTasks(tasks);
    setNewTaskTitle("");

    // setNewTaskTitle pega o valor digitado no newTaskTitle e mostra na tela
  }

  function handleToggleTaskCompletion(id: number) {
    let tasksArray: Array<Task> = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        if (tasks[i].isComplete === true) {
          tasks[i].isComplete = false;
        } else {
          tasks[i].isComplete = true;
        }
      }
      tasksArray.push(tasks[i]);
    }
    setTasks(tasksArray);
  }

  function handleRemoveTask(id: number) {
    let tasksArray: Array<Task> = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id !== id) {
        tasksArray.push(tasks[i])
      }
    }
    setTasks(tasksArray)
  }

  // Nessa parte do código estamos "subindo" somente tarefas que têm um id
  // diferente do que estamos querendo remover
  // quando a lista atualiza no setTasks
  // estamos subindo somente os ids que são diferentes do id que seria removido
  // assim ele "desaparece" da lista porque ele tinha id igual

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
